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
	$(".achievementSelector").each(function () {
		var $this = $(this);
		$this.on("click", function () {
			$(".achievementSelector").removeClass("active");
			$(this).addClass("active");
			displayAchievementData($(this).data("type"));
		});
	});

	const tooltipTriggerList = document.querySelectorAll(
		'[data-bs-toggle="tooltip"]'
	);
	const tooltipList = [...tooltipTriggerList].map(
		(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
	);
});

function displayAchievementData(type) {
	var getRoutes;
	var achiName;
	if (type == "fugu") {
		getRoutes = printRoutesIndigo(11, 12);
		achiName = "balloon-catchers";
	} else if (type == "crab") {
		getRoutes = printRoutesIndigo(9, 0);
		achiName = "crab-boat-crew";
	} else if (type == "shark") {
		getRoutes = printRoutesIndigo(6, 0);
		achiName = "certifiable-shark-hunters";
	} else if (type == "manta") {
		getRoutes = printRoutesIndigo(8, 12);
		achiName = "sticking-it-to-the-manta";
	} else if (type == "dragon") {
		getRoutes = printRoutesIndigo(1, 0);
		achiName = "maritime-dragonslayers";
	} else if (type == "octo") {
		getRoutes = printRoutesIndigo(2, 0);
		achiName = "octopus-travelers";
	} else if (type == "jelly") {
		getRoutes = printRoutesIndigo(5, 0);
		achiName = "jelled-together";
	} else if (type == "squid") {
		getRoutes = printRoutesRuby(2, 6);
		achiName = "squid-squadron";
	} else if (type == "mussel") {
		getRoutes = printRoutesRuby(3, 5);
		achiName = "maximum-mussel";
	} else if (type == "shrimp") {
		getRoutes = printRoutesRuby(4, 3);
		achiName = "shrimp-smorgasbord";
	}

	document.getElementById("btnResult").innerHTML =
		'<div class="row"><div class="col-xl-9"><img class="fullWidth " src="../img/achievements/' +
		type +
		'.png" ></div><div class="col-xl-3">' +
		getRoutes +
		'<br><h2>Seeking more information?</h2><br><h5> <a href="https://guides.ffxivteamcraft.com/guide/ocean-fishing-bonus-achievements#' +
		achiName +
		'"  target="_blank" rel="noopener noreferrer">Read the indepth guide</a> by Tyo\'to Tayuun.</h5></div></div>';
}

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
	}

	temptext += "</table>";

	return temptext;
}

function printRoutesRuby(rn1, rn2) {
	var rN = rn1;
	var rN2 = rn2;
	var pQ = 10;

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
	var routeNumberArr = [];

	while (matches < pQ && tries < pQ * 20) {
		//ADD offset to find pattern
		var temp = currentTwoHourChunks + tries + offset;
		if (
			patternRuby[temp % patternRuby.length] == rN ||
			patternRuby[temp % patternRuby.length] == rN2
		) {
			matchedTimes.push(temp + 1);
			routeNumberArr.push(patternRuby[temp % patternRuby.length]);
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
		temptext += routeNamesRuby[routeNumberArr[i] - 1];
		temptext += "</td></tr>";
	}

	temptext += "</table>";

	return temptext;
}
