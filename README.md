# FDMCA

This repository contains two chrome extensions.
The Sender extension uses spotify APIs to get the currently playing track, and prints the
trackID in the twitch chat of the user.
The Receiver reads the messages from the chat of a selected streamer, and plays the trackID read.

## Installation

To install any of the two extensions, go to the Chrome Extension Page (chrome://extensions/)
and enable **developer mode** in the top right.

Now download the necessary files, in the releases section (right side of github page), extract the zip, 
click on **load unpacked extension** and select extracted files.

### Sender

If you are installing Sender, first of all you'll have to get an oauth key to be able to send automatic messages in the chat.
Opening the extension popup (right side of search bar), click the **Get key** button, a new tab will be opened and show the Twitch oauth key generator.

Click **connect** and copy-paste the key into the input field of the extension popup.
The oauth key is the text string starting with auth: and followed by 30 pseudo-random characters.

Fill also the username field with the same username used to stream on Twitch (it **cannot** be a different one).

Once done, open spotify, start a song and the extension will print in chat the spotify song id, for any receiver to pick up and play.

### Receiver

If you are installing Receiver, open the stream you want to listen to, click on the extension popup (right side of search bar), copy-paste the twitch url into the **twitch-url** field, and the username of the bot printing the songIds (the name of the streamer).

If in the last 10 messages there is a songId, the song will start playing, otherwise it will the next time a sondId is printed.

## Important

The extension works uses your own spotify client, you have to be logged in and have it open. 

Also, I haven't tested the extension with the free subscription, but I'm guessing you need spotify premium. 

## FAQ
