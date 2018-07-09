"use strict";

const $ = require("jquery");
const utils = require("./utils");
const JoinChannel = require("./join-channel");
const {vueApp} = require("./vue");

module.exports = {
	renderNetworks,
	trimMessageInChannel,
};

/*
function appendMessage(container, chanId, chanType, msg) {
	if (utils.lastMessageId < msg.id) {
		utils.lastMessageId = msg.id;
	}

	return;

	let lastChild = container.children(".msg, .date-marker-container").last();
	const renderedMessage = buildChatMessage(msg);

	// Check if date changed
	const msgTime = new Date(msg.time);
	const prevMsgTime = new Date(lastChild.data("time"));

	// Insert date marker if date changed compared to previous message
	if (prevMsgTime.toDateString() !== msgTime.toDateString()) {
		lastChild = $(templates.date_marker({time: msg.time}));
		container.append(lastChild);
	}

	// If current window is not a channel or this message is not condensable,
	// then just append the message to container and be done with it
	if (msg.self || msg.highlight || constants.condensedTypes.indexOf(msg.type) === -1 || chanType !== "channel") {
		container.append(renderedMessage);
		return;
	}

	const obj = {};
	obj[msg.type] = 1;

	// If the previous message is already condensed,
	// we just append to it and update text
	if (lastChild.hasClass("condensed")) {
		lastChild.append(renderedMessage);
		condensed.updateText(lastChild, obj);
		return;
	}

	// Always create a condensed container
	const newCondensed = $(templates.msg_condensed({time: msg.time}));

	condensed.updateText(newCondensed, obj);
	newCondensed.append(renderedMessage);
	container.append(newCondensed);
}

function buildChatMessage(msg) {
	const type = msg.type;
	let template = "msg";

	// See if any of the custom highlight regexes match
	if (!msg.highlight && !msg.self
		&& options.highlightsRE
		&& (type === "message" || type === "notice")
		&& options.highlightsRE.exec(msg.text)) {
		msg.highlight = true;
	}

	if (typeof templates.actions[type] !== "undefined") {
		template = "msg_action";
	} else if (type === "unhandled") {
		template = "msg_unhandled";
	}

	const renderedMessage = $(templates[template](msg));
	const content = renderedMessage.find(".content");

	if (template === "msg_action") {
		content.html(templates.actions[type](msg));
	}

	msg.previews.forEach((preview) => {
		renderPreview(preview, renderedMessage);
	});

	return renderedMessage;
}
*/

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

				if (channel.messages.length > 0) {
					const container = chan.find(".messages");

					if (container.find(".msg").length >= 100) {
						container.find(".show-more").addClass("show");
					}

					container.parent().trigger("keepToBottom");
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

function trimMessageInChannel(channel, messageLimit) {
	const messages = channel.find(".messages .msg").slice(0, -messageLimit);

	if (messages.length === 0) {
		return;
	}

	messages.remove();

	channel.find(".show-more").addClass("show");

	// Remove date-separators that would otherwise be "stuck" at the top of the channel
	channel.find(".date-marker-container").each(function() {
		if ($(this).next().hasClass("date-marker-container")) {
			$(this).remove();
		}
	});
}
