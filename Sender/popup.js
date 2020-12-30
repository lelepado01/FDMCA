chrome.runtime.getBackgroundPage(function (bgWindow) {
	if (bgWindow.isConnected()) {
		document.getElementById("oauth_button").remove();

		var h4 = document.createElement("h4");
		h4.className = "ui_text";
		h4.appendChild(document.createTextNode("Extension Running"));
		document.body.appendChild(h4);
	}
});

document.getElementById("initial_form").onsubmit = function (e) {
	chrome.runtime.getBackgroundPage(function (bgWindow) {
		let oauth = document.getElementById("oauth_key").value;
		let name = document.getElementById("username").value;
		bgWindow.setAppData(name, oauth);
	});
};

document.getElementById("oauth_button").onclick = function (e) {
	chrome.runtime.getBackgroundPage(function (bgWindow) {
		bgWindow.openOauthPage();
	});
};
