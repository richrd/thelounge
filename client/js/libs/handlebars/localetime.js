"use strict";

module.exports = function(time) {
	const dateStr = (new Date(time)).toLocaleDateString("en-GB", {month: "long", year: "numeric", day: "numeric"});
	const timeStr = (new Date(time)).toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit", second: "2-digit"});

	return dateStr + ", " + timeStr; // D MMMM YYYY, HH:mm:ss
};
