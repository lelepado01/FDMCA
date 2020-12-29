chrome.runtime.getBackgroundPage(function (bgWindow) {
	if (bgWindow.isConnected()) {
		document.getElementById("initial_form").remove();
		document.getElementById("oauth_button").remove();

		var p = document.createElement("p");
		p.appendChild(document.createTextNode("Extension Running"));
		document.body.appendChild(p);
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
