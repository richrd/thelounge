"use strict";

const colorCodeMap = [
	["00", "White"],
	["01", "Black"],
	["02", "Blue"],
	["03", "Green"],
	["04", "Red"],
	["05", "Brown"],
	["06", "Magenta"],
	["07", "Orange"],
	["08", "Yellow"],
	["09", "Light Green"],
	["10", "Cyan"],
	["11", "Light Cyan"],
	["12", "Light Blue"],
	["13", "Pink"],
	["14", "Grey"],
	["15", "Light Grey"],
];

const commands = [
	"/as",
	"/away",
	"/back",
	"/ban",
	"/banlist",
	"/bs",
	"/close",
	"/collapse",
	"/connect",
	"/cs",
	"/ctcp",
	"/cycle",
	"/dehop",
	"/deop",
	"/devoice",
	"/disconnect",
	"/expand",
	"/ho",
	"/hop",
	"/hs",
	"/ignore",
	"/ignorelist",
	"/invite",
	"/join",
	"/kick",
	"/leave",
	"/list",
	"/me",
	"/mode",
	"/ms",
	"/msg",
	"/nick",
	"/notice",
	"/ns",
	"/op",
	"/os",
	"/part",
	"/query",
	"/quote",
	"/quit",
	"/raw",
	"/rejoin",
	"/rs",
	"/say",
	"/send",
	"/server",
	"/slap",
	"/topic",
	"/unban",
	"/unignore",
	"/voice",
	"/whois",
];

const condensedTypes = [
	"away",
	"back",
	"chghost",
	"join",
	"part",
	"quit",
	"nick",
	"kick",
	"mode",
];
const condensedTypesQuery = "." + condensedTypes.join(", .");

module.exports = {
	colorCodeMap,
	commands,
	condensedTypes,
	condensedTypesQuery,
};
