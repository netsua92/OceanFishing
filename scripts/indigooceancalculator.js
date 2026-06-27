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

var scheduleStopKeys = [
	[
		{ destinationKey: "destination.thesouthernstraitofmerlthor", timeKey: "table.night" },
		{ destinationKey: "destination.galadionbay", timeKey: "table.day" },
		{ destinationKey: "destination.thenorthernstraitofmerlthor", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.thesouthernstraitofmerlthor", timeKey: "table.day" },
		{ destinationKey: "destination.galadionbay", timeKey: "table.sunset" },
		{ destinationKey: "destination.thenorthernstraitofmerlthor", timeKey: "table.night" },
	],
	[
		{ destinationKey: "destination.thesouthernstraitofmerlthor", timeKey: "table.sunset" },
		{ destinationKey: "destination.galadionbay", timeKey: "table.night" },
		{ destinationKey: "destination.thenorthernstraitofmerlthor", timeKey: "table.day" },
	],
	[
		{ destinationKey: "destination.galadionbay", timeKey: "table.night" },
		{ destinationKey: "destination.thesouthernstraitofmerlthor", timeKey: "table.day" },
		{ destinationKey: "destination.rhotanosea", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.galadionbay", timeKey: "table.day" },
		{ destinationKey: "destination.thesouthernstraitofmerlthor", timeKey: "table.sunset" },
		{ destinationKey: "destination.rhotanosea", timeKey: "table.night" },
	],
	[
		{ destinationKey: "destination.galadionbay", timeKey: "table.sunset" },
		{ destinationKey: "destination.thesouthernstraitofmerlthor", timeKey: "table.night" },
		{ destinationKey: "destination.rhotanosea", timeKey: "table.day" },
	],
	[
		{ destinationKey: "destination.thecieldalaes", timeKey: "table.night" },
		{ destinationKey: "destination.thenorthernstraitofmerlthor", timeKey: "table.day" },
		{ destinationKey: "destination.thebloodbrinesea", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.thecieldalaes", timeKey: "table.day" },
		{ destinationKey: "destination.thenorthernstraitofmerlthor", timeKey: "table.sunset" },
		{ destinationKey: "destination.thebloodbrinesea", timeKey: "table.night" },
	],
	[
		{ destinationKey: "destination.thecieldalaes", timeKey: "table.sunset" },
		{ destinationKey: "destination.thenorthernstraitofmerlthor", timeKey: "table.night" },
		{ destinationKey: "destination.thebloodbrinesea", timeKey: "table.day" },
	],
	[
		{ destinationKey: "destination.thecieldalaes", timeKey: "table.night" },
		{ destinationKey: "destination.rhotanosea", timeKey: "table.day" },
		{ destinationKey: "destination.therothlytsound", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.thecieldalaes", timeKey: "table.day" },
		{ destinationKey: "destination.rhotanosea", timeKey: "table.sunset" },
		{ destinationKey: "destination.therothlytsound", timeKey: "table.night" },
	],
	[
		{ destinationKey: "destination.thecieldalaes", timeKey: "table.sunset" },
		{ destinationKey: "destination.rhotanosea", timeKey: "table.night" },
		{ destinationKey: "destination.therothlytsound", timeKey: "table.day" },
	],
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
	return (
		"<span class='final-stop-tooltip' data-schedule-index='" +
		index +
		"' tabindex='0'>" +
		stop.img +
		'<span class="desttextrt">' +
		label +
		"</span></span>"
	);
}

function getScheduleTooltip(index) {
	if (!scheduleStopKeys[index]) {
		if (!schedules[index]) return "";
		var fallbackTooltip = schedules[index];
		if (typeof imgNight === "string") {
			fallbackTooltip = fallbackTooltip.replace(
				/(South|Galadion|North|Rhotano|Ciel|Blood|Sound) at Night/g,
				imgNight + " $1"
			);
		}
		if (typeof imgDay === "string") {
			fallbackTooltip = fallbackTooltip.replace(
				/(South|Galadion|North|Rhotano|Ciel|Blood|Sound) at Day/g,
				imgDay + " $1"
			);
		}
		if (typeof imgSunset === "string") {
			fallbackTooltip = fallbackTooltip.replace(
				/(South|Galadion|North|Rhotano|Ciel|Blood|Sound) at Sunset/g,
				imgSunset + " $1"
			);
		}
		fallbackTooltip = fallbackTooltip.replace(/,\s*/g, "<br>");
		return fallbackTooltip.replace(
			/iconSmallest/g,
			"iconSmallest scheduleTooltipIcon"
		);
	}

	return scheduleStopKeys[index]
		.map(function (stop) {
			var destination =
				typeof translateWord === "function"
					? translateWord(stop.destinationKey)
					: stop.destinationKey;
			var badge = "";
			if (stop.timeKey === "table.night") {
				badge = imgNight;
			} else if (stop.timeKey === "table.day") {
				badge = imgDay;
			} else if (stop.timeKey === "table.sunset") {
				badge = imgSunset;
			}

			if (typeof badge === "string") {
				badge = badge.replace(/iconSmallest/g, "iconSmallest scheduleTooltipIcon");
			}

			return badge + " " + destination;
		})
		.join("<br>");
}

function initializeFinalStopTooltips() {
	if (typeof bootstrap === "undefined" || !bootstrap.Tooltip) {
		return;
	}

	var finalStopEls = document.querySelectorAll("#boatSchedule .final-stop-tooltip");
	finalStopEls.forEach(function (el) {
		var existingTooltip = bootstrap.Tooltip.getInstance(el);
		if (existingTooltip) {
			existingTooltip.dispose();
		}

		var scheduleIndex = Number(el.getAttribute("data-schedule-index"));
		var tooltip = getScheduleTooltip(scheduleIndex);
		if (!tooltip) {
			return;
		}

		el.setAttribute("data-bs-toggle", "tooltip");
		el.setAttribute("data-bs-html", "true");
		el.setAttribute("data-bs-custom-class", "schedule-tooltip");
		el.setAttribute("data-bs-trigger", "hover");
		el.setAttribute("data-bs-title", tooltip);
		bootstrap.Tooltip.getOrCreateInstance(el, { trigger: "hover" });
	});
}

function hideFinalStopTooltips() {
	if (typeof bootstrap === "undefined" || !bootstrap.Tooltip) {
		return;
	}

	var finalStopEls = document.querySelectorAll("#boatSchedule .final-stop-tooltip");
	finalStopEls.forEach(function (el) {
		var tooltip = bootstrap.Tooltip.getInstance(el);
		if (tooltip) {
			tooltip.hide();
		}
	});
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

function use12HourTimeFormat() {
	return typeof window.use12HourTime === "function" ? window.use12HourTime() : false;
}

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
		hour12: use12HourTimeFormat(),
	};
	return new Intl.DateTimeFormat(timeRegion, dateOptions).format(date);
}

function getTimeUntilDeparture(stopTime) {
	var now = Date.now();
	var diff = stopTime.getTime() - now;
	var minutes = Math.floor(diff / (1000 * 60));
	var totalHours = Math.floor(minutes / 60);
	var days = Math.floor(totalHours / 24);
	var hours = totalHours % 24;

	function formatDayHourDepartureLabel(daysCount, hoursCount) {
		if (daysCount === 1 && hoursCount === 0) {
			return typeof translateWord === "function"
				? translateWord("schedule.in1day")
				: "in 1 day";
		}

		if (hoursCount === 0) {
			var daysLabel =
				typeof translateWord === "function"
					? translateWord("schedule.indays")
					: "in {0} days";
			return daysLabel.replace("{0}", daysCount);
		}

		if (daysCount === 1 && hoursCount === 1) {
			return typeof translateWord === "function"
				? translateWord("schedule.in1day1hour")
				: "in 1 day 1 hour";
		}

		if (daysCount === 1) {
			var oneDayHoursLabel =
				typeof translateWord === "function"
					? translateWord("schedule.in1dayhours")
					: "in 1 day {0} hours";
			return oneDayHoursLabel.replace("{0}", hoursCount);
		}

		if (hoursCount === 1) {
			var daysOneHourLabel =
				typeof translateWord === "function"
					? translateWord("schedule.indays1hour")
					: "in {0} days 1 hour";
			return daysOneHourLabel.replace("{0}", daysCount);
		}

		var daysHoursLabel =
			typeof translateWord === "function"
				? translateWord("schedule.indayshours")
				: "in {0} days {1} hours";
		return daysHoursLabel.replace("{0}", daysCount).replace("{1}", hoursCount);
	}

	// Handle upcoming departures (positive time)
	if (days > 0) {
		return formatDayHourDepartureLabel(days, hours);
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
	var hideCompletedRoutes = getHideCompletedRoutesEnabled();
	var selectedTwoHourChunk = Math.floor(
		selectedTime.getTime() / 1000 / (60 * 60 * 2)
	);

	//align the number that is assigned to the next two hour block to the pattern array, thank you donut
	var offset = 88;
	var tempTime = (selectedTwoHourChunk + offset) % pattern.length;
	var maxSlots = hideCompletedRoutes ? pattern.length : 12;

	var dataSet = [];
	for (var i = 0; i < maxSlots; i++) {
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
		var routeSummary = getRouteUncaughtSummary("Indigo", routeNumber, cleanedDataObjBK);
		var images = routeImages[pattern[temp] - 1];

		var timeUntilDepature = getTimeUntilDeparture(stopTime);
		var cleanDate = formatCleanDate(stopTime);
		if (!hideCompletedRoutes || routeSummary.hasUncaught) {
			dataSet.push([
				cleanDate,
				timeUntilDepature,
				finalStopDisp,
				routeSummary.uncaughtCount,
				optObjectives,
				routeNumber,
				images,
			]);
			if (hideCompletedRoutes && dataSet.length === 12) {
				break;
			}
		}

		if (!hideCompletedRoutes && dataSet.length === 12) {
			break;
		}
	}
	var boatTable;
	var activeRowIds = [];

	if (!firstTime) {
		$("#boatSchedule>tbody>tr.activeRow").each(function () {
			if (this.id) {
				activeRowIds.push(this.id);
			}
		});
	}

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
						? translateWord("schedule.uncaught")
						: "Uncaught",
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
			$(row).attr("data-route", data[5]);
			$(row).attr(
				"id",
				"stop" + data[5] + "_" + data[0].replace(/\s/g, "").replace(":", "")
			);
			$(row).addClass("stopsRow");
			$(row).attr("tabindex", "0");
			$(row).on("click", function () {
				hideFinalStopTooltips();
				$(".stopsRow").each(function (i) {
					$(this).removeClass("activeRow");
				});
				$(this).addClass("activeRow");
				activeRowIDpers =
					"stop" + data[5] + "_" + data[0].replace(/\s/g, "").replace(":", "");
				displayStops("Indigo", data[5], cleanedDataObj);
			});
		},
		data: dataSet,
		paging: false,
		searching: false,
		ordering: false,
		info: false,
	});

	updateBoatScheduleEmptyState(hideCompletedRoutes && dataSet.length === 0);

	if (activeRowIds.length > 0) {
		activeRowIds.forEach(function (rowId) {
			var row = document.getElementById(rowId);
			if (row) {
				row.classList.add("activeRow");
			}
		});
	}

	initializeFinalStopTooltips();

	return dataSet.length > 0 ? dataSet[0][5] : null;
}

document.addEventListener("timeFormatChanged", function () {
	if (
		typeof $ !== "undefined" &&
		$.fn &&
		$.fn.dataTable &&
		$.fn.dataTable.isDataTable("#boatSchedule")
	) {
		convertTime(false);
	}
});
