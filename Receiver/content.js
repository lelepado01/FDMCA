chrome.extension.onRequest.addListener(function (
	request,
	sender,
	sendResponse
) {
	if (request.method == "getText") {
		var messages = document.getElementsByClassName("text-fragment");
		messages = [...messages];
		messages = messages.slice(messages.length - 10, messages.length);

		var users = document.getElementsByClassName("chat-author__display-name");
		users = [...users];
		users = users.slice(users.length - 10, users.length);

		let chat_mess = [];
		let chat_user = [];

		for (let i = 0; i < messages.length; i++) {
			chat_mess[i] = messages[i].textContent;
			chat_user[i] = users[i].textContent;
		}

		sendResponse({
			data: [chat_user, chat_mess],
			method: "getText",
		});
	}
});
