const WEB_PLAYER_URL = "https://open.spotify.com";
const END_POINT = "https://api.spotify.com";

let twitch_url = null;
let twitch_updater = null;

let songId = "";
let changed = false;

setInterval(loopBody, 3000);

async function loopBody() {
	if (twitch_url == null || twitch_updater == null) {
		return;
	}

	checkTwitchChat();

	if (changed && songId != "") {
		play(songId);
	}
	changed = false;
}

function setAppData(url, updater) {
	if (url != "") twitch_url = url;
	if (updater != "") twitch_updater = updater;
}

function checkTwitchChat() {
	chrome.tabs.query({}, (tabs) => {
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].url == twitch_url) {
				chrome.tabs.sendRequest(
					tabs[i].id,
					{ method: "getText" },
					function (response) {
						if (response.method == "getText") {
							let users = response.data[0];
							let message = response.data[1];

							for (let j = users.length; j >= 0; j--) {
								if (twitch_updater == users[j] && message[j] == songId) return;
								if (
									twitch_updater == users[j] &&
									message[j] != songId &&
									message[j].includes("spotify:")
								) {
									songId = message[j];
									changed = true;
									return;
								}
							}
						}
					}
				);
			}
		}
	});
}

async function getToken() {
	let token = {
		clientId: null,
		accessToken: null,
		accessTokenExpirationTimestampMs: null,
		isAnonymous: null,
	};

	try {
		const url = `${WEB_PLAYER_URL}/get_access_token`;
		const res = await fetch(url);
		token = await res.json();
	} catch {}

	return token;
}

async function getMainDevice(token) {
	url = `${END_POINT}/v1/me/player/devices`;
	const res = await fetch(url, {
		cache: "no-cache",
		headers: {
			Authorization: `Bearer ${token.accessToken}`,
		},
	});

	const data = await res.json();
	return data.devices[0];
}

async function play(songInfo) {
	let token = await getToken();
	let device = await getMainDevice(token);

	const url = `${END_POINT}/v1/me/player/play?device_id=${device.id}`;

	return await fetch(url, {
		method: "PUT",
		body: JSON.stringify({ uris: [songInfo] }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.accessToken}`,
		},
	});
}
