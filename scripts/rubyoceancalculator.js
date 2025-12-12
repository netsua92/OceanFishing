var activeRowIDpers = "";

var pattern = [
	1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 3, 4,
	5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 5, 6, 1, 2,
	3, 4, 5, 6, 1, 2, 3, 4, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5,
];

var routeNameKeys = [
	"routes.glassdragonjewel",
	"routes.squidglassdragon",
	"routes.shellfishshrimp",
	"routes.shrimphellsclaw",
	"routes.shellfishtaniwha",
	"routes.squidtaniwha",
];

function getRouteName(index) {
	if (!routeNameKeys[index]) return "";
	var key = routeNameKeys[index];
	return typeof translateWord === "function" ? translateWord(key) : key;
}

var routeNames = routeNameKeys; // backward compatibility alias

var routeImages = [
	"<img src='../img/opobj/Glass Dragon.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Jewel of Plum Spring.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Squids.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Glass Dragon.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Shellfish.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Shrimp.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Shrimp.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Hells Claw.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Shellfish.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Taniwha.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Squids.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Taniwha.png' class='iconSmall routetableOpObj'>",
];

var schedules = [
	"Sirensong Sea at Sunset, Kugane at Night, One River at Day",
	"Sirensong Sea at Sunset, Kugane at Night, Ruby Sea at Day",
	"Sirensong Sea at Night, Kugane at Day, One River at Sunset",
	"Sirensong Sea at Night, Kugane at Day, Ruby Sea at Sunset",
	"Sirensong Sea at Day, Kugane at Sunset, One River at Night",
	"Sirensong Sea at Day, Kugane at Sunset, Ruby Sea at Night",
];

var finalStopKeys = [
	{ img: imgDay, key: "destination.theoneriver" },
	{ img: imgDay, key: "destination.therubysea" },
	{ img: imgSunset, key: "destination.theoneriver" },
	{ img: imgSunset, key: "destination.therubysea" },
	{ img: imgNight, key: "destination.theoneriver" },
	{ img: imgNight, key: "destination.therubysea" },
];

function getFinalStop(index) {
	if (!finalStopKeys[index]) return "";
	var stop = finalStopKeys[index];
	var label =
		typeof translateWord === "function" ? translateWord(stop.key) : stop.key;
	return stop.img + '<span class="desttextrt">' + label + "</span>";
}

var finalStop = [];
var finalTime = ["Day", "Day", "Sunset", "Sunset", "Night", "Night"];

var timeRegion = getUserLocale(); // Use centralized version instead
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

	// Handle upcoming departures (positive time)
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
					? translateWord("schedule.in1minute")
					: "in 1 minute";
			return label;
		} else {
			var minutesLabel =
				typeof translateWord === "function"
					? translateWord("schedule.inminutes")
					: "in {0} minutes";
			return minutesLabel.replace("{0}", minutes);
		}
	} else {
		// Handle departures that have started (negative time)
		var absMins = Math.abs(minutes);
		if (absMins === 1) {
			var label =
				typeof translateWord === "function"
					? translateWord("schedule.1minuteago")
					: "started 1 minute ago";
			return label;
		} else {
			var minutesLabel =
				typeof translateWord === "function"
					? translateWord("schedule.minutesago")
					: "started {0} minutes ago";
			return minutesLabel.replace("{0}", absMins);
		}
	}
}

function convertTime(firstTime = true) {
	var x = Date.now();
	var selectedTime = subtractTimeFromDate(new Date(x), 6.7);

	var selectedTwoHourChunk = Math.floor(
		selectedTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//align the number that is assigned to the next two hour block to the pattern array
	var offset = 44;
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
		var optObjectives = getRouteName(pattern[temp] - 1);
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
		/*getUncaughtRoutes("ruby");
		if (UncaughtRoutes["Route" + routeNumber]) {
			dataSet.push([
				cleanDate,
				timeUntilDepature,
				finalStopDisp,
				optObjectives,
				routeNumber,
				images,
			]);
		} else {
			i = i - 1;
		}*/
	}

	var boatTable;

	if (!firstTime) {
		boatTable = $("#boatSchedule").DataTable();
		boatTable.clear().destroy();
	}

	boatTable = new DataTable("#boatSchedule", {
		columns: [
			{
				title:
					typeof translateWord === "function"
						? translateWord("schedule.time")
						: "Time",
			},
			{
				title:
					typeof translateWord === "function"
						? translateWord("schedule.boardingstarts")
						: "Boarding Starts",
			},
			{
				title:
					typeof translateWord === "function"
						? translateWord("schedule.destination")
						: "Destination",
			},
			{
				title:
					typeof translateWord === "function"
						? translateWord("schedule.optionalobjectives")
						: "Optional Objectives",
			},
			{ title: "Route Number", visible: false },
			{ title: "" },
		],
		createdRow: function (row, data, dataIndex) {
			$(row).attr("data-route", data[4]);
			$(row).addClass("stopsRow");
			$(row).attr(
				"id",
				"stop" + data[4] + "_" + data[0].replace(/\s/g, "").replace(":", "")
			);
			$(row).on("click", function () {
				$(".stopsRow").each(function (i) {
					$(this).removeClass("activeRow");
				});
				$(this).addClass("activeRow");
				activeRowIDpers =
					"stop" + data[4] + "_" + data[0].replace(/\s/g, "").replace(":", "");
				console.log("Cleaned obj bk", cleanedDataObjBK);
				displayStops("Ruby", data[4], cleanedDataObjBK);
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
