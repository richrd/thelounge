"use strict";

const $ = require("jquery");
const socket = require("../socket");
const {vueApp, findChannel} = require("../vue");

socket.on("more", function(data) {
	const {channel} = findChannel(data.chan);

	if (!channel) {
		return;
	}

	channel.historyLoading = false;

	if (!data.messages.length) {
		channel.moreHistoryAvailable = false;
		return false;
	}

	const chan = $("#chat #chan-" + data.chan + " .messages");

	// get the scrollable wrapper around messages
	const scrollable = chan.closest(".chat");
	const heightOld = chan.height() - scrollable.scrollTop();

	channel.messages.unshift(...data.messages);

	if (data.messages.length !== 100) {
		channel.moreHistoryAvailable = false;
	}

	vueApp.$nextTick(() => {
		// restore scroll position
		const position = chan.height() - heightOld;
		scrollable.finish().scrollTop(position);
	});
});
