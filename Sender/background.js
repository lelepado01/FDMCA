const WEB_PLAYER_URL = "https://open.spotify.com";
const END_POINT = "https://api.spotify.com";

let username = "";
let password = "";
let last_song = "";

if (password == "") {
	chrome.storage.local.get(["oauth_key"], function (result) {
		password = result.oauth_key;
	});
}

if (username == "") {
	chrome.storage.local.get(["username"], function (result) {
		username = result.username;
	});
}

var passCheck = setInterval(checkPassword, 1000);

function checkPassword() {
	if (password != "" && password != undefined) {
		clearInterval(passCheck);

		try {
			ComfyJS.Init(username, password);
		} catch (e) {
			console.log("Error Twitch API (ComfyJS.Init())");
			console.log(e);
		}
		setInterval(loopBody, 5000);
	}
}

async function loopBody() {
	let new_song = await getSongInPlayback();
	if (new_song != last_song) {
		try {
			ComfyJS.Say(new_song);
		} catch (e) {
			console.log("Error Twitch API (ComfyJS.Say())");
			console.log(e);
		}
		last_song = new_song;
	}
}

function openOauthPage() {
	const url = "https://twitchapps.com/tmi/";
	chrome.tabs.create({ url: url });
}

function setAppData(name, key) {
	if (name != "") {
		username = name;
		chrome.storage.local.set({ username: username }, function () {});
	}
	if (key != "") {
		password = key;
		chrome.storage.local.set({ oauth_key: key }, function () {});
	}
}

function isConnected() {
	return password != "" && username != "";
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

async function getSongInPlayback() {
	let token = await getToken();

	let url = `${END_POINT}/v1/me/player`;

	try {
		let res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token.accessToken}`,
			},
		});

		return (await res.json()).item.uri;
	} catch (e) {
		console.log("ERROR FETCH PLAYING");
		console.log(e);
		return;
	}
}
