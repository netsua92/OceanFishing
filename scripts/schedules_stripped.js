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

var routeNameKeysIndigo = [
	"routes.seadragonscoralmanta",
	"routes.octopus",
	"routes.sothiselasmosaurus",
	"routes.sothisstonescale",
	"routes.jellyfish",
	"routes.sharkscoralmanta",
	"routes.hafgufaelasmosaurus",
	"routes.mantas",
	"routes.crabsseafaringtoad",
	"routes.hafgufaplacodus",
	"routes.fugustonescale",
	"routes.fugumantas",
];

var patternRuby = [
	1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 3, 4,
	5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 5, 6, 1, 2,
	3, 4, 5, 6, 1, 2, 3, 4, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5,
];

var routeNameKeysRuby = [
	"routes.glassdragonjewel",
	"routes.squidglassdragon",
	"routes.shellfishshrimp",
	"routes.shrimphellsclaw",
	"routes.shellfishtaniwha",
	"routes.squidtaniwha",
];

var timeRegion = getUserLocale();
var timeFormat = {
	weekday: "short",
	month: "short",
	day: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	timeZoneName: "short",
};

// Format date and time in user's locale
function formatDateTime(date) {
	return new Intl.DateTimeFormat(timeRegion, timeFormat).format(date);
}

// generate drop down lists (callable so we can re-render after translations load)
function updateRouteDroplists() {
	try {
		var temptext =
			'<label for="routeNumber" class="form-label">' +
			translateWord("schedule.route:") +
			"  </label>  ";
		temptext += '<select id="routeNumber"  class="form-select">';
		for (var i = 0; i < routeNameKeysIndigo.length; i++) {
			var label =
				typeof translateWord === "function"
					? translateWord(routeNameKeysIndigo[i])
					: routeNameKeysIndigo[i];
			temptext += "<option value=" + (i + 1) + ">" + label + "</option>";
		}
		temptext += "</select><br>";
		var elIndigo = document.getElementById("droplistIndigo");
		if (elIndigo) elIndigo.innerHTML = temptext;

		temptext =
			'<label for="routeNumber" class="form-label">' +
			translateWord("schedule.route:") +
			"  </label>  ";
		temptext += '<select id="routeNumber"  class="form-select">';
		for (var j = 0; j < routeNameKeysRuby.length; j++) {
			var labelR =
				typeof translateWord === "function"
					? translateWord(routeNameKeysRuby[j])
					: routeNameKeysRuby[j];
			temptext += "<option value=" + (j + 1) + ">" + labelR + "</option>";
		}
		temptext += "</select><br>";
		var elRuby = document.getElementById("droplistRuby");
		if (elRuby) elRuby.innerHTML = temptext;
	} catch (e) {
		// ignore if DOM not ready
	}
}

// initial render
updateRouteDroplists();

// re-render when translations are loaded
if (window.jQuery) {
	$(document).on("translationsLoaded", updateRouteDroplists);
} else {
	document.addEventListener("translationsLoaded", updateRouteDroplists);
}

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
		var dateObj = new Date(
			(selectedTwoHourChunk + i + 4) * (1000 * 60 * 60 * 2)
		);
		temptext += formatDateTime(dateObj);
		temptext += "</td><td>";
		temptext +=
			typeof translateWord === "function"
				? translateWord(routeNameKeysIndigo[patternIndigo[temp] - 1])
				: routeNameKeysIndigo[patternIndigo[temp] - 1];
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
		var dateObj = new Date(
			(selectedTwoHourChunk + i + 4) * (1000 * 60 * 60 * 2)
		);
		temptext += formatDateTime(dateObj);
		temptext += "</td><td>";
		temptext +=
			typeof translateWord === "function"
				? translateWord(routeNameKeysRuby[patternRuby[temp] - 1])
				: routeNameKeysRuby[patternRuby[temp] - 1];
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
		temptext += formatDateTime(tempoop);
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
		temptext += formatDateTime(tempoop);
		temptext += "</td></tr>";
	}

	temptext += "</table>";

	document.getElementById("rubySpecific").innerHTML = temptext;
}
