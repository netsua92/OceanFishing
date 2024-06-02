/*
If you can see this, consider funding Donut Steel's chocolate addiction, they made this crap. I can't be assed to do this.
BTC:  1DonutSAQzU7uAyDQBfp3yfpjRxH8btMtf
LTC:  LdSTEELqdiwcqU6oG9YNSPUcbgNmbGF15v
DOGE: DPastrybfBtdHzvw2YPHjHyy8cbN2ZECjN
*/

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

//generate drop down list
var temptext = '<label for="routeNumber" class="form-label">Route:</label>  ';
temptext += '<select id="routeNumber"  class="form-select">';
for (var i = 0; i < routeNamesIndigo.length; i++) {
	temptext +=
		"<option value=" + (i + 1) + ">" + routeNamesIndigo[i] + "</option>";
}
temptext += "</select><br>";
document.getElementById("droplistIndigo").innerHTML = temptext;

var temptext = '<label for="routeNumber" class="form-label">Route: </label>';
temptext += '<select id="routeNumber"  class="form-select">';
for (var i = 0; i < routeNamesRuby.length; i++) {
	temptext +=
		"<option value=" + (i + 1) + ">" + routeNamesRuby[i] + "</option>";
}
temptext += "</select><br>";
document.getElementById("droplistRuby").innerHTML = temptext;

//Force myDate box to start at today's date
//thank you stackoverflow
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;
document.getElementById("myDateIndigo").value = today;
document.getElementById("myDateRuby").value = today;

function convertTimeIndigo() {
	var x = document.getElementById("myDateIndigo").value;
	var selectedTime = new Date(x);

	var selectedTwoHourChunk = Math.floor(
		selectedTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//align the number that is assigned to the next two hour block to the pattern array
	var offset = 88;
	var tempTime = (selectedTwoHourChunk + offset) % patternIndigo.length;

	var temptext = "";

	//add tables for formatting
	temptext +=
		"<p>Here are the 12 patterns that day:</p><table class='table table-striped table-hover'><tr><th>Time</th><th>Comment</th></tr>";

	for (var i = 0; i < 12; i++) {
		var temp =
			tempTime + i >= patternIndigo.length
				? tempTime + i - patternIndigo.length
				: tempTime + i;
		temptext += "<tr><td>";
		temptext += new Date(
			(selectedTwoHourChunk + i + 4) * (1000 * 60 * 60 * 2)
		).toLocaleString(timeRegion, timeFormat);
		temptext += "</td><td>";
		temptext += routeNamesIndigo[patternIndigo[temp] - 1];
		temptext += "</td></tr>";
	}

	temptext += "</table>";

	document.getElementById("indigoByTime").innerHTML = temptext;
}

function convertTimeRuby() {
	var x = document.getElementById("myDateRuby").value;
	var selectedTime = new Date(x);

	var selectedTwoHourChunk = Math.floor(
		selectedTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//align the number that is assigned to the next two hour block to the pattern array
	var offset = 44;
	var tempTime = (selectedTwoHourChunk + offset) % patternRuby.length;

	var temptext = "";

	//add tables for formatting
	temptext +=
		"<p>Here are the 12 patterns that day:</p><table class='table table-striped table-hover'><tr><th>Time</th><th>Comment</th></tr>";

	for (var i = 0; i < 12; i++) {
		var temp =
			tempTime + i >= patternRuby.length
				? tempTime + i - patternRuby.length
				: tempTime + i;
		temptext += "<tr><td>";
		temptext += new Date(
			(selectedTwoHourChunk + i + 4) * (1000 * 60 * 60 * 2)
		).toLocaleString(timeRegion, timeFormat);
		temptext += "</td><td>";
		temptext += routeNamesRuby[patternRuby[temp] - 1];
		temptext += "</td></tr>";
	}

	temptext += "</table>";

	document.getElementById("rubyByTime").innerHTML = temptext;
}

function printRoutesIndigo() {
	var rN = document.getElementById("routeNumber").value;
	var pQ = document.getElementById("printQuantityIndigo").value;

	var currentTime = new Date();
	var currentTwoHourChunks = Math.floor(
		currentTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//line up the patten array to the 2 hour segment count
	var offset = 85;
	var temptime = (currentTwoHourChunks + offset) % patternIndigo.length;

	var temptext = "";

	temptext +=
		"<table class='table table-striped table-hover'><tr><th>Times</th></tr>";

	var tries = 0;
	var matches = 0;
	var matchedTimes = [];

	while (matches < pQ && tries < pQ * 20) {
		//ADD offset to find pattern
		var temp = currentTwoHourChunks + tries + offset;
		if (patternIndigo[temp % patternIndigo.length] == rN) {
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

	document.getElementById("indigoSpecific").innerHTML = temptext;
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
		"<table class='table table-striped table-hover'><tr><th>Times</th></tr>";

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
