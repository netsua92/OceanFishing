var activeRowIDpers = "";

var pattern = [1,2,1,3,4,5,4,6,7,8,7,9,
2,1,3,4,5,4,6,7,8,7,9,1,
1,3,4,5,4,6,7,8,7,9,1,2,
3,4,5,4,6,7,8,7,9,1,2,1,
4,5,4,6,7,8,7,9,1,2,1,3,
5,4,6,7,8,7,9,1,2,1,3,4,
4,6,7,8,7,9,1,2,1,3,4,5,
6,7,8,7,9,1,2,1,3,4,5,4,
7,8,7,9,1,2,1,3,4,5,4,6,
8,7,9,1,2,1,3,4,5,4,6,7,
7,9,1,2,1,3,4,5,4,6,7,8,
9,1,2,1,3,4,5,4,6,7,8,7];

var routeNameKeys = [
	"routes.prehistoricakupara",
	"routes.glassdragonjewel",
	"routes.squidglassdragon",
	"routes.mantistaniwha",
	"routes.shellfishshrimp",
	"routes.shrimphellsclaw",
	"routes.mantismanasvin",
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
	"<img src='../img/opobj/Prehistoric.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Akupara.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Glass Dragon.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Jewel of Plum Spring.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Squids.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Glass Dragon.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Mantis.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Taniwha.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Shellfish.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Shrimp.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Shrimp.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Hells Claw.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Mantis.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Manasvin.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Shellfish.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Taniwha.png' class='iconSmall routetableOpObj'>",
	"<img src='../img/opobj/Squids.png' class='iconSmall routetableOpObj'><img src='../img/opobj/Taniwha.png' class='iconSmall routetableOpObj'>",
];

var schedules = ["Unnamed Island at Sunset, Sirensong Sea at Night, Thavnair at Day",
"Sirensong Sea at Sunset, Kugane at Night, The One River at Day",
"Sirensong Sea at Sunset, Kugane at Night, The Ruby Sea at Day",
"Unnamed Island at Night, Sirensong Sea at Day, Thavnair at Sunset",
"Sirensong Sea at Night, Kugane at Day, The One River at Sunset",
"Sirensong Sea at Night, Kugane at Day, The Ruby Sea at Sunset",
"Unnamed Island at Day, Sirensong Sea at Sunset, Thavnair at Night",
"Sirensong Sea at Day, Kugane at Sunset, The One River at Night",
"Sirensong Sea at Day, Kugane at Sunset, The Ruby Sea at Night"];

var scheduleStopKeys = [
	[
		{ destinationKey: "destination.unnamed", timeKey: "table.sunset" },
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.night" },
		{ destinationKey: "destination.thavnair", timeKey: "table.day" },
	],
	[
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.sunset" },
		{ destinationKey: "destination.kugane", timeKey: "table.night" },
		{ destinationKey: "destination.theoneriver", timeKey: "table.day" },
	],
	[
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.sunset" },
		{ destinationKey: "destination.kugane", timeKey: "table.night" },
		{ destinationKey: "destination.therubysea", timeKey: "table.day" },
	],
	[
		{ destinationKey: "destination.unnamed", timeKey: "table.night" },
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.day" },
		{ destinationKey: "destination.thavnair", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.night" },
		{ destinationKey: "destination.kugane", timeKey: "table.day" },
		{ destinationKey: "destination.theoneriver", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.night" },
		{ destinationKey: "destination.kugane", timeKey: "table.day" },
		{ destinationKey: "destination.therubysea", timeKey: "table.sunset" },
	],
	[
		{ destinationKey: "destination.unnamed", timeKey: "table.day" },
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.sunset" },
		{ destinationKey: "destination.thavnair", timeKey: "table.night" },
	],
	[
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.day" },
		{ destinationKey: "destination.kugane", timeKey: "table.sunset" },
		{ destinationKey: "destination.theoneriver", timeKey: "table.night" },
	],
	[
		{ destinationKey: "destination.thesirensongsea", timeKey: "table.day" },
		{ destinationKey: "destination.kugane", timeKey: "table.sunset" },
		{ destinationKey: "destination.therubysea", timeKey: "table.night" },
	],
];

var finalStopKeys = [
	{ img: imgDay, key: "destination.thavnair" },
	{ img: imgDay, key: "destination.theoneriver" },
	{ img: imgDay, key: "destination.therubysea" },
	{ img: imgSunset, key: "destination.thavnair" },
	{ img: imgSunset, key: "destination.theoneriver" },
	{ img: imgSunset, key: "destination.therubysea" },
	{ img: imgNight, key: "destination.thavnair" },
	{ img: imgNight, key: "destination.theoneriver" },
	{ img: imgNight, key: "destination.therubysea" },
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
				/(Unnamed Island|Sirensong Sea|Kugane|The One River|The Ruby Sea|Thavnair) at Night/g,
				imgNight + " $1"
			);
		}
		if (typeof imgDay === "string") {
			fallbackTooltip = fallbackTooltip.replace(
				/(Unnamed Island|Sirensong Sea|Kugane|The One River|The Ruby Sea|Thavnair) at Day/g,
				imgDay + " $1"
			);
		}
		if (typeof imgSunset === "string") {
			fallbackTooltip = fallbackTooltip.replace(
				/(Unnamed Island|Sirensong Sea|Kugane|The One River|The Ruby Sea|Thavnair) at Sunset/g,
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
var finalTime = ["Day", "Day","Day", "Sunset", "Sunset","Sunset", "Night", "Night", "Night"];

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

function formatDayHourDepartureLabel(days, hours) {
	if (days === 1 && hours === 0) {
		return typeof translateWord === "function"
			? translateWord("schedule.in1day")
			: "in 1 day";
	}

	if (hours === 0) {
		var daysLabel =
			typeof translateWord === "function"
				? translateWord("schedule.indays")
				: "in {0} days";
		return daysLabel.replace("{0}", days);
	}

	if (days === 1 && hours === 1) {
		return typeof translateWord === "function"
			? translateWord("schedule.in1day1hour")
			: "in 1 day 1 hour";
	}

	if (days === 1) {
		var oneDayHoursLabel =
			typeof translateWord === "function"
				? translateWord("schedule.in1dayhours")
				: "in 1 day {0} hours";
		return oneDayHoursLabel.replace("{0}", hours);
	}

	if (hours === 1) {
		var daysOneHourLabel =
			typeof translateWord === "function"
				? translateWord("schedule.indays1hour")
				: "in {0} days 1 hour";
		return daysOneHourLabel.replace("{0}", days);
	}

	var daysHoursLabel =
		typeof translateWord === "function"
			? translateWord("schedule.indayshours")
			: "in {0} days {1} hours";
	return daysHoursLabel.replace("{0}", days).replace("{1}", hours);
}

function getTimeUntilDeparture(stopTime) {
	var now = Date.now();
	var diff = stopTime.getTime() - now;
	var minutes = Math.floor(diff / (1000 * 60));
	var totalHours = Math.floor(minutes / 60);
	var days = Math.floor(totalHours / 24);
	var hours = totalHours % 24;

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

	//align the number that is assigned to the next two hour block to the pattern array
	var offset = 92;
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
		var optObjectives = getRouteName(pattern[temp] - 1);
		var routeSummary = getRouteUncaughtSummary("Ruby", routeNumber, cleanedDataObjBK);
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
			$(row).addClass("stopsRow");
			$(row).attr("tabindex", "0");
			$(row).attr(
				"id",
				"stop" + data[5] + "_" + data[0].replace(/\s/g, "").replace(":", "")
			);
			$(row).on("click", function () {
				hideFinalStopTooltips();
				$(".stopsRow").each(function (i) {
					$(this).removeClass("activeRow");
				});
				$(this).addClass("activeRow");
				activeRowIDpers =
					"stop" + data[5] + "_" + data[0].replace(/\s/g, "").replace(":", "");
				displayStops("Ruby", data[5], cleanedDataObj);
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
