"use strict";

const constants = require("../../constants");

module.exports = function(time) {
	const dateStr = (new Date(time)).toLocaleDateString(constants.dateTimeLocale, {month: "long", year: "numeric", day: "numeric"});
	const timeStr = (new Date(time)).toLocaleTimeString(constants.dateTimeLocale, {hour: "2-digit", hour12: false, minute: "2-digit", second: "2-digit"});

	return dateStr + ", " + timeStr; // D MMMM YYYY, HH:mm:ss
};
