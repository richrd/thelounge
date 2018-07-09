"use strict";

const $ = require("jquery");
const utils = require("./utils");
const JoinChannel = require("./join-channel");
const {vueApp} = require("./vue");

module.exports = {
	renderNetworks,
};

function renderNetworks(data, singleNetwork) {
	// Add keyboard handlers to the "Join a channel…" form inputs/button
	JoinChannel.handleKeybinds(data.networks);

	let newChannels;
	const channels = $.map(data.networks, function(n) {
		return n.channels;
	});

	if (!singleNetwork && utils.lastMessageId > -1) {
		newChannels = [];

		channels.forEach((channel) => {
			const chan = $("#chan-" + channel.id);

			if (chan.length > 0) {
				if (channel.type === "channel") {
					channel.usersOutdated = true;
				}
			} else {
				newChannels.push(channel);
			}
		});
	} else {
		newChannels = channels;
	}

	if (newChannels.length > 0) {
		newChannels.forEach((channel) => {
			if (channel.type === "channel") {
				channel.usersOutdated = true;
			}
		});
	}

	utils.confirmExit();

	for (const network of vueApp.networks) {
		for (const channel of network.channels) {
			if (channel.highlight > 0) {
				utils.updateTitle();
				utils.toggleNotificationMarkers(true);
				return;
			}
		}
	}
}
