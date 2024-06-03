var patternIndigo = [
	7, 10, 1, 4, 8, 11, 2, 5, 12, 3, 6, 7, 10, 1, 4, 8, 11, 2, 5, 9, 3, 6, 7, 10,
	1, 4, 8, 11, 2, 5, 9, 12, 6, 7, 10, 1, 4, 8, 11, 2, 5, 9, 12, 3, 7, 10, 1, 4,
	8, 11, 2, 5, 9, 12, 3, 6, 10, 1, 4, 8, 11, 2, 5, 9, 12, 3, 6, 7, 1, 4, 8, 11,
	2, 5, 9, 12, 3, 6, 7, 10, 4, 8, 11, 2, 5, 9, 12, 3, 6, 7, 10, 1, 8, 11, 2, 5,
	9, 12, 3, 6, 7, 10, 1, 4, 11, 2, 5, 9, 12, 3, 6, 7, 10, 1, 4, 8, 2, 5, 9, 12,
	3, 6, 7, 10, 1, 4, 8, 11, 5, 9, 12, 3, 6, 7, 10, 1, 4, 8, 11, 2, 9, 12, 3, 6,
];

var routeNamesIndigo = [
	"Seadragons/Coral Manta",
	"Octopus",
	"Sothis & Elasmosaurus",
	"Sothis & Stonescale",
	"Jelly",
	"Shark/Coral Manta",
	"Hafgufa & Elasmosaurus",
	"Mantas",
	"Crabs/Seafaring Toad",
	"Hafgufa & Placodus",
	"Fugu/Stonescale",
	"Fugu/Mantas",
];

var patternRuby = [
	1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 3, 4,
	5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 5, 6, 1, 2,
	3, 4, 5, 6, 1, 2, 3, 4, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5,
];

var routeNamesRuby = [
	"Glass Dragon & Jewel",
	"Squid/Glass Dragon",
	"Shellfish/Shrimp",
	"Shrimp/Hells' Claw",
	"Shellfish/Taniwha",
	"Squid/Taniwha",
];

var timeRegion = "en-US";
var timeFormat = {
	weekday: "short",
	month: "short",
	day: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	timeZoneName: "short",
};

$(document).ready(function () {
	//
});

function printRoutesIndigo(rn1, rn2) {
	var rN = rn1;
	var rN2 = rn2;
	var pQ = 10;

	var currentTime = new Date();
	var currentTwoHourChunks = Math.floor(
		currentTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//line up the patten array to the 2 hour segment count
	var offset = 85;
	var temptime = (currentTwoHourChunks + offset) % patternIndigo.length;

	var temptext = "";

	temptext +=
		"<table class='table table-striped table-hover'><tr><th>Times</th><th>Objective</th></tr>";

	var tries = 0;
	var matches = 0;
	var matchedTimes = [];
	var routeNumberArr = [];

	while (matches < pQ && tries < pQ * 20) {
		//ADD offset to find pattern
		var temp = currentTwoHourChunks + tries + offset;
		if (
			patternIndigo[temp % patternIndigo.length] == rN ||
			patternIndigo[temp % patternIndigo.length] == rN2
		) {
			matchedTimes.push(temp + 1);
			routeNumberArr.push(patternIndigo[temp % patternIndigo.length]);
			matches++;
		}
		tries++;
	}

	for (var i = 0; i < matchedTimes.length; i++) {
		temptext += "<tr><td>";
		//convert from twoHourChunks to real time
		//SUBTRACT offset to get real time
		var tempoop = new Date((matchedTimes[i] - offset) * (1000 * 60 * 60 * 2));
		temptext += tempoop.toLocaleString(timeRegion, timeFormat);
		temptext += "</td><td>";
		temptext += routeNamesIndigo[routeNumberArr[i] - 1];
		temptext += "</td></tr>";
		console.log(matchedTimes[i]);
	}

	temptext += "</table>";

	document.getElementById("btnResult").innerHTML = temptext;
}

function printRoutesRuby() {
	var rN = document.getElementById("routeNumber").value;
	var pQ = document.getElementById("printQuantityRuby").value;

	var currentTime = new Date();
	var currentTwoHourChunks = Math.floor(
		currentTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//line up the patten array to the 2 hour segment count
	var offset = 41;
	var temptime = (currentTwoHourChunks + offset) % patternRuby.length;

	var temptext = "";

	temptext +=
		"<table class='table table-striped table-hover'><tr><th>Times</th><th>Objective</th></tr>";

	var tries = 0;
	var matches = 0;
	var matchedTimes = [];

	while (matches < pQ && tries < pQ * 20) {
		//ADD offset to find pattern
		var temp = currentTwoHourChunks + tries + offset;
		if (patternRuby[temp % patternRuby.length] == rN) {
			matchedTimes.push(temp + 1);
			matches++;
		}
		tries++;
	}

	for (var i = 0; i < matchedTimes.length; i++) {
		temptext += "<tr><td>";
		//convert from twoHourChunks to real time
		//SUBTRACT offset to get real time
		var tempoop = new Date((matchedTimes[i] - offset) * (1000 * 60 * 60 * 2));
		temptext += tempoop.toLocaleString(timeRegion, timeFormat);
		temptext += "</td></tr>";
	}

	temptext += "</table>";

	document.getElementById("rubySpecific").innerHTML = temptext;
}
