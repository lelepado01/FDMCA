document.getElementById("initial_form").onsubmit = function (e) {
	chrome.runtime.getBackgroundPage(function (bgWindow) {
		let url = document.getElementById("twitch_url").value;
		let updater = document.getElementById("twitch_updater").value;
		bgWindow.setAppData(url, updater);
	});
};
