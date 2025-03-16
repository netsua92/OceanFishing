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
	if (window.location.href.indexOf("#") > -1) {
		var type = window.location.hash.substring(1);
		$('*[data-type="' + type + '"]').addClass("active");
		displayAchievementData(type);
	}

	$(".achievementSelector").each(function () {
		var $this = $(this);
		$this.on("click", function () {
			$(".achievementSelector").removeClass("active");
			$(this).addClass("active");
			window.location.hash = $(this).data("type");
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
	var achiText;
	var achiHeader;
	var images =
		'<img class="fullWidth " src="../img/achievements/' + type + '.png?v=3">';
	if (type == "fugu") {
		getRoutes = printRoutesIndigo(11, 12);
		achiName = "balloon-catchers";
		achiHeader = "What Did Balloons Do To You?";
		achiText =
			"<p>There are two different routes for this objective but they are functionally identical. They make the same stops in the same order but at different times of day. Both routes have the same fugu available at the same stops.</p>" +
			"<p>Any configuration of spectral currents is viable for completing this objective. Getting all three is ideal.</p>" +
			"<p>Going on an early, 24-person boat is viable due to the flexibility of this objective. Doing this allows the party to rely more on the 16 other people on the boat to proc the currents, encouraging use of the bait for the non-current fish.</p>";
	} else if (type == "crab") {
		getRoutes = printRoutesIndigo(9, 0);
		achiName = "crab-boat-crew";
		achiHeader = "What Did Crabs Do To You?";
		achiText =
			"<p>Any configuration of spectral currents is viable for completing this objective. Getting all three is ideal.</p>" +
			"<p>Going on an early, 24-person boat is viable due to the flexibility of this objective. Doing this allows the party to rely more on the 16 other people on the boat to proc the currents, encouraging use of the bait for the non-current fish.</p>";
	} else if (type == "shark") {
		getRoutes = printRoutesIndigo(6, 0);
		achiName = "certifiable-shark-hunters";
		achiHeader = "What Did Sharks Do To You?";
		achiText =
			"<p>Understanding and being comfortable with blind Triple/Double Hooking Ghost Sharks in the Galadion Spectral Current makes a large impact on this objective. They are much more common than Funnel Sharks and can be reliably identified. It is realistic to exit the Galadion Spectral Current with at least 18 sharks.</p>" +
			"<p>Identical Cast is not advised in the Galadion Spectral Current as each use of it can be considered a loss of the most reliable Triple/Double Hook opportunity you have. It is possible that you will be unlucky and in a specific instance would have come out ahead if you used it but this is typically not the case.</p>";
	} else if (type == "manta") {
		getRoutes = printRoutesIndigo(8, 12);
		images =
			'<img class="fullWidth " src="../img/achievements/' +
			type +
			'1.png?v=2"><img class="fullWidth " src="../img/achievements/' +
			type +
			'2.png?v=2">';
		achiName = "sticking-it-to-the-manta";
		achiHeader = "What Did Mantas Do To You?";
		achiText =
			"<p>There are two different routes for this objective. They both have mantas in the first and third stops, but the third stops are different locations each with a different manta. The routes are nearly identical to each other for the purposes of completing this objective.</p>" +
			"<p>Though this is a solo objective, players do make parties for it, queueing late for spectral current control and in a group so that spectral current proccing isn't solely on the individual. This also incentivizes using Plump Worm in the Cieldalaes.</p>" +
			"<p>This objective can be approached in two ways:</p>" +
			"<ul><li>Catch as many mantas as possible in the Cieldalaes in order to nearly complete or complete this objective with the most common manta. This allows you to possibly only need one spectral current if you complete it in the Cieldalaes, or at least allows you to play it safe at the third stop.</li>" +
			"<li>Rely on getting two spectral currents but, through ability usage, only need to get one manta bite in each current.</li></ul>" +
			'<p>If you do not get a spectral current in the first stop, you should still attempt to finish the objective at the third. It is possible to complete this objective solely from mantas in either the first or third stops, though it is "easier" in the Cieldalaes.</p>' +
			"<p>To maximise odds of successfully completing this objective, skipping the spectral current in the second stop is important to extend the Bloodbrine/Rothlyt one to 3 minutes. This is not required, but an extended Bloodbrine/Rothlyt Spectral Current is extremely beneficial.</p>";
	} else if (type == "dragon") {
		getRoutes = printRoutesIndigo(1, 0);
		achiName = "maritime-dragonslayers";
		achiHeader = "What Did Seadragons Do To You?";
		achiText =
			"<p>It is possible to complete this objective in The Southern Strait of Merlthor. It is therefore possible to complete this objective on any route where that stop is available at any time. Attempting it on this specific route provides the Northern Merlthor Spectral Current as possible insurance, which may need to be relied upon especially as certain weather conditions can make this objective harder.</p>" +
			"<p>The advised target in The Southern Strait of Merlthor is Shaggy Seadragon because Aetheric Seadragons are significantly less reliable as they are a Mooch and share a bite type and time with a non-objective fish. As such, the Southern Merlthor Spectral Current should be avoided unless specific weather conditions make it necessary, outlined below.</p>";
	} else if (type == "octo") {
		getRoutes = printRoutesIndigo(2, 0);
		achiName = "octopus-travelers";
		achiHeader = "What Did Octopodes Do To You?";
		achiText =
			"<p>The goal of this objective is to have the party complete the bulk of it from catching the common octopus (Merman's Mane) in the Galadion Spectral Current in order to have to rely as little as possible on the two rare octopodes (Cyan Octopus, Mopbeard) elsewhere. As such, avoiding the Southern Merlthor Spectral Current is important to extend the Galadion one to 3 minutes. The objective is not impossible to complete if the Southern Merlthor one occurs, but an extended Galadion Spectral Current is extremely beneficial.</p>" +
			"<p>Skipping the Galadion Spectral Current to focus on Cyan Octopus is unequivocally a bad idea. Their long bite time and uncommonness compared to that of Merman’s Mane does not make them a viable alternative. Getting a 3 minute current in the Northern Strait does not make up for this either due to the rarity of Mopbeard.</p>" +
			"<p>When fishing properly, it is realistic to have all party members exit an extended Galadion Spectral Current with at least 18 - 21 Merman’s Manes. This requires blind Triple/Double Hooking them properly and not using Identical Cast on them, as they are the most common and reliable Triple/Double Hook opportunity you have.</p>";
	} else if (type == "jelly") {
		getRoutes = printRoutesIndigo(5, 0);
		achiName = "jelled-together";
		achiHeader = "What Did Jellyfish Do To You?";
		achiText =
			"<p>It is entirely possible to complete this objective in The Southern Strait of Merlthor. It is therefore possible to complete this objective on any route where just that stop is available at any time. Attempting it on this specific route provides the Rhotano Spectral Current as possible insurance.</p>" +
			"<p>The advised target in The Southern Strait of Merlthor is La Noscean Jellyfish because they are much more efficient to fish for than a spectral current and Sea Nettles. In addition, skipping the spectral current there allows for an extended one at Rhotano Sea. If fishing for La Noscean Jellyfish properly, as advised, there is no chance of proccing an undesired spectral current.</p>";
	} else if (type == "squid") {
		getRoutes = printRoutesRuby(2, 6);
		achiName = "squid-squadron";
		achiHeader = "What Did Squid Do To You?";
		achiText =
			"<p>There are two ideal routes for this objective, both ending at The Ruby Sea and avoiding The Sirensong Sea at Night. These will be what is advised below.</p>" +
			"<p>The two routes are not the only ones this achievement is viable on. All routes ending at The Ruby Sea are all viable. However, the one starting with The Sirensong Sea at Night does not have a squid in Sirensong's spectral current, meaning the current should be avoided if attempting this objective there at that time. </p>" +
			"<p>Going on an early, 24-person boat is viable due to the flexibility of this objective as it does not require or uniquely benefit from specific currents being extended. Doing this allows the party to rely more on the 16 other people on the boat to proc the currents, making it easier for the party to fish for the normal zone squids more efficiently. </p>";
	} else if (type == "mussel") {
		getRoutes = printRoutesRuby(3, 5);
		achiName = "maximum-mussel";
		achiHeader = "What Did Shellfish Do To You?";
		achiText =
			"<p>There are two ideal routes for this objective, both ending at The One River and avoiding Kugane at Night. These will be what is advised below.</p>" +
			"<p>If queueing late, an extension is advised at Kugane instead of The One River because of Sirensong Mussel and Whirlpool Turban's bite times.</p>" +
			"<p>Sirensong Mussel stops biting after 8 seconds, meanwhile Spectral Coelacanth bites until 25 seconds. Fishing for the spectral current involves keeping the rod out for a substantially large period of time for a small chance to catch the Spectral fish which may or may not proc the current.</p>" +
			"<p>Whirlpool Turban in Kugane can take up to 30 seconds to bite and frequently takes until at least 24. This means that while fishing for it you may encounter Spectral Wrasse, and getting the current gives you bites that are substantially faster.</p>" +
			"<p>If queueing early, it is still advised to only fish for Sirensong Mussel at the first stop, but you may be able to fish for Mermaid Scale during Sirensong Spectral Current if it happens.</p>" +
			"<p>Going on an early, 24-person boat is viable if wanting to take advantage of the Sirensong Spectral Current because Mermaid Scale is a good target when the current does occur. However, doing this will make it less likely for the party to get the One River Spectral Current.</p>" +
			"<p>This objective is possible to complete in Kugane but the One River Spectral Current is insurance that is slightly less reliable if going on an early boat.</p>";
	} else if (type == "shrimp") {
		getRoutes = printRoutesRuby(4, 3);
		images =
			'<img class="fullWidth " src="../img/achievements/' +
			type +
			'1.png?v=2"><img class="fullWidth " src="../img/achievements/' +
			type +
			'2.png?v=2">';
		achiName = "shrimp-smorgasbord";
		achiHeader = "What Did Shrimp Do To You?";
		achiText =
			"<p>This achievement can be completed on any route as shrimp are available at all four new stops. When picking a route, one ending at The Ruby Sea at Sunset/Night is advised because of what is available in its spectral current and the bite time of the shrimp outside of the current.</p>" +
			"<p>It is advised to skip Sirensong Spectral Current because Jade Mantis Shrimp is not a shrimp and Vivid Pink Shrimp is not a reliable target. It has a low bite rate, when compared to other objective fish, and may not be able to be fully isolated to blind Triple/Double Hook.</p>" +
			"<p>Pink Shrimp also stops biting much sooner than Spectral Coelacanth. Fishing for the spectral current involves keeping the rod out for a substantially large period of time for a small chance to catch the Spectral fish which may or may not proc the current.</p>";
	}

	document.getElementById("btnResult").innerHTML =
		"<h1 class='achievementTitle'>" +
		achiHeader +
		"</h1><div class='card achievementDesc'> <div class='card-body'>" +
		achiText +
		'</div></div><div class="row"><div class="col-xl-9">' +
		images +
		'</div><div class="col-xl-3">' +
		getRoutes +
		'<br><h2>Seeking more information?</h2><br><h5> <a href="https://guides.ffxivteamcraft.com/guide/ocean-fishing-bonus-achievements#' +
		achiName +
		'"  target="_blank" rel="noopener noreferrer">Read the in-depth guide</a>.</h5></div></div>';
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
