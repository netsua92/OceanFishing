var activeRowIDpers = "";

var pattern = [
	7, 10, 1, 4, 8, 11, 2, 5, 12, 3, 6, 7, 10, 1, 4, 8, 11, 2, 5, 9, 3, 6, 7, 10,
	1, 4, 8, 11, 2, 5, 9, 12, 6, 7, 10, 1, 4, 8, 11, 2, 5, 9, 12, 3, 7, 10, 1, 4,
	8, 11, 2, 5, 9, 12, 3, 6, 10, 1, 4, 8, 11, 2, 5, 9, 12, 3, 6, 7, 1, 4, 8, 11,
	2, 5, 9, 12, 3, 6, 7, 10, 4, 8, 11, 2, 5, 9, 12, 3, 6, 7, 10, 1, 8, 11, 2, 5,
	9, 12, 3, 6, 7, 10, 1, 4, 11, 2, 5, 9, 12, 3, 6, 7, 10, 1, 4, 8, 2, 5, 9, 12,
	3, 6, 7, 10, 1, 4, 8, 11, 5, 9, 12, 3, 6, 7, 10, 1, 4, 8, 11, 2, 9, 12, 3, 6,
];

var routeNameKeys = [
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

var routeImages = [
	"<img src='../img/opobj/Seadragons.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Coral Manta.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Octopus.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Sothis.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Elasmosaurus.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Sothis.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Stonescale.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Jellyfish.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Sharks.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Coral Manta.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Hafgufa.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Elasmosaurus.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Mantas.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Crabs.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Seafaring Toad.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Hafgufa.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Placodus.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Fugu.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Stonescale.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Fugu.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Mantas.png' class='iconSmall routetableOpObj'>",
];

var schedules = [
	"South at Night, Galadion at Day, North at Sunset",
	"South at Day, Galadion at Sunset, North at Night",
	"South at Sunset, Galadion at Night, North at Day",
	"Galadion at Night, South at Day, Rhotano at Sunset",
	"Galadion at Day, South at Sunset, Rhotano at Night",
	"Galadion at Sunset, South at Night, Rhotano at Day",
	"Ciel at Night, North at Day, Blood at Sunset",
	"Ciel at Day, North at Sunset, Blood at Night",
	"Ciel at Sunset, North at Night, Blood at Day",
	"Ciel at Night, Rhotano at Day, Sound at Sunset",
	"Ciel at Day, Rhotano at Sunset, Sound at Night",
	"Ciel at Sunset, Rhotano at Night, Sound at Day",
];

var finalStopKeys = [
	{ img: imgSunset, key: "destination.thenorthernstraitofmerlthor" },
	{ img: imgNight, key: "destination.thenorthernstraitofmerlthor" },
	{ img: imgDay, key: "destination.thenorthernstraitofmerlthor" },
	{ img: imgSunset, key: "destination.rhotanosea" },
	{ img: imgNight, key: "destination.rhotanosea" },
	{ img: imgDay, key: "destination.rhotanosea" },
	{ img: imgSunset, key: "destination.thebloodbrinesea" },
	{ img: imgNight, key: "destination.thebloodbrinesea" },
	{ img: imgDay, key: "destination.thebloodbrinesea" },
	{ img: imgSunset, key: "destination.therothlytsound" },
	{ img: imgNight, key: "destination.therothlytsound" },
	{ img: imgDay, key: "destination.therothlytsound" },
];

function getFinalStop(index) {
	if (!finalStopKeys[index]) return "";
	var stop = finalStopKeys[index];
	var label =
		typeof translateWord === "function" ? translateWord(stop.key) : stop.key;
	return stop.img + '<span class="desttextrt">' + label + "</span>";
}

var finalStop = [];

var finalTime = [
	"Sunset",
	"Night",
	"Day",
	"Sunset",
	"Night",
	"Day",
	"Sunset",
	"Night",
	"Day",
	"Sunset",
	"Night",
	"Day",
];

var timeImages = [
	imgSunset,
	imgNight,
	imgDay,
	imgSunset,
	imgNight,
	imgDay,
	imgSunset,
	imgNight,
	imgDay,
	imgSunset,
	imgNight,
	imgDay,
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

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;

function formatCleanDate(date) {
	var timeRegion = getUserLocale();
	var dateOptions = {
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};
	return new Intl.DateTimeFormat(timeRegion, dateOptions).format(date);
}

function getTimeUntilDeparture(stopTime) {
	var now = Date.now();
	var diff = stopTime.getTime() - now;
	var minutes = Math.floor(diff / (1000 * 60));
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);

	if (days > 0) {
		var label =
			typeof translateWord === "function"
				? translateWord("schedule.inaday")
				: "in a day";
		return label;
	} else if (hours > 0) {
		if (hours === 1) {
			var label =
				typeof translateWord === "function"
					? translateWord("schedule.in1hour")
					: "in 1 hour";
			return label;
		} else {
			var hoursLabel =
				typeof translateWord === "function"
					? translateWord("schedule.inhours")
					: "in {0} hours";
			return hoursLabel.replace("{0}", hours);
		}
	} else if (minutes > 0) {
		if (minutes === 1) {
			var label =
				typeof translateWord === "function"
					? translateWord("schedule.1minuteago")
					: "1 minute ago";
			return label;
		} else {
			var minutesLabel =
				typeof translateWord === "function"
					? translateWord("schedule.minutesago")
					: "{0} minutes ago";
			return minutesLabel.replace("{0}", minutes);
		}
	} else {
		return typeof translateWord === "function"
			? translateWord("schedule.boardingstarts")
			: "Boarding Starts";
	}
}

function convertTime(firstTime = true) {
	var x = Date.now();
	var selectedTime = subtractTimeFromDate(new Date(x), 6.7);
	var selectedTwoHourChunk = Math.floor(
		selectedTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//align the number that is assigned to the next two hour block to the pattern array, thank you donut
	var offset = 88;
	var tempTime = (selectedTwoHourChunk + offset) % pattern.length;

	var dataSet = [];
	for (var i = 0; i < 12; i++) {
		var temp =
			tempTime + i >= pattern.length
				? tempTime + i - pattern.length
				: tempTime + i;

		var stopTime = new Date(
			(selectedTwoHourChunk + i + 4) * (1000 * 60 * 60 * 2)
		);

		var routeNumber = pattern[temp];
		var finalStopDisp = getFinalStop(pattern[temp] - 1);
		var optObjectives =
			typeof translateWord === "function"
				? translateWord(routeNameKeys[pattern[temp] - 1])
				: routeNameKeys[pattern[temp] - 1];
		var images = routeImages[pattern[temp] - 1];

		var timeUntilDepature = getTimeUntilDeparture(stopTime);
		var cleanDate = formatCleanDate(stopTime);
		dataSet.push([
			cleanDate,
			timeUntilDepature,
			finalStopDisp,
			optObjectives,
			routeNumber,
			images,
		]);
	}
	var boatTable;

	if (!firstTime) {
		boatTable = $("#boatSchedule").DataTable();
		boatTable.clear().destroy();
	}

	boatTable = new DataTable("#boatSchedule", {
		columns: [
			{ title: translateWord("schedule.time") },
			{ title: translateWord("schedule.boardingstarts") },
			{ title: translateWord("schedule.destination") },
			{ title: translateWord("schedule.optionalobjectives") },
			{ title: "Route Number", visible: false },
			{ title: "" },
		],
		createdRow: function (row, data, dataIndex) {
			$(row).attr("data-route", data[4]);
			$(row).attr(
				"id",
				"stop" + data[4] + "_" + data[0].replace(/\s/g, "").replace(":", "")
			);
			$(row).addClass("stopsRow");
			$(row).on("click", function () {
				$(".stopsRow").each(function (i) {
					$(this).removeClass("activeRow");
				});
				$(this).addClass("activeRow");
				activeRowIDpers =
					"stop" + data[4] + "_" + data[0].replace(/\s/g, "").replace(":", "");
				displayStops("Indigo", data[4], cleanedDataObjBK);
			});
		},
		data: dataSet,
		paging: false,
		searching: false,
		ordering: false,
		info: false,
	});

	return dataSet[0][4];
}
