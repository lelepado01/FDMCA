# FDMCA

This repository contains two chrome extensions.
The Sender extension uses spotify APIs to get the currently playing track, and prints the
trackID in the twitch chat of the user.
The Receiver reads the messages from the chat of a selected streamer, and plays the trackID read.

### Installation

To install any of the two extensions, go to
chrome://extensions/
and enable **developer mode** in the top right.

Now download the necessary files, todo, click on **load unpacked extension** and select the downloaded files.

##### Sender

If you are installing Sender, first of all you'll have to get a oauth key for being able to send automatic messages in the chat.
Opening the extension popup (right side of search bar), click the **Get key** button, a new tab will be opened and show the Twitch oauth key generator.
Click **connect** and copy-paste the key into the input field of the extension popup.
The oauth key is the text string starting with auth: and followed by 30 pseudo-random characters.
Fill also the username field with the same username used to stream on Twitch (it **cannot** be a different one).

Once done, open spotify, start a song and the extension will print in chat the spotify song id, for any receiver to pick up and play.

##### Receiver

If you are installing Receiver, open the stream you want to listen to, click on the extension popup (right side of search bar), copy-paste the twitch url into the **twitch-url** field, and the username of the bot printing the songIds (the name of the streamer).
If in the last 10 messages there is a songId, the song will start playing, otherwise it will the next time a sondId is printed.

### FAQ
