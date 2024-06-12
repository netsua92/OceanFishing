var activeRowIDpers = "";

var pattern = [
	1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 3, 4,
	5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 5, 6, 1, 2,
	3, 4, 5, 6, 1, 2, 3, 4, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5,
];

var routeNames = [
	"Glass Dragon & Jewel",
	"Squid/Glass Dragon",
	"Shellfish/Shrimp",
	"Shrimp/Hells' Claw",
	"Shellfish/Taniwha",
	"Squid/Taniwha",
];

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

var finalStop = [
	imgDay + '<span class="desttextrt">One River</span>',
	imgDay + '<span class="desttextrt">Ruby Sea</span>',
	imgSunset + '<span class="desttextrt">One River</span>',
	imgSunset + '<span class="desttextrt">Ruby Sea</span>',
	imgNight + '<span class="desttextrt">One River</span>',
	imgNight + '<span class="desttextrt">Ruby Sea</span>',
];

var finalTime = ["Day", "Day", "Sunset", "Sunset", "Night", "Night"];

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

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;

function convertTime(firstTime = true) {
	var x = Date.now();
	var selectedTime = subtractTimeFromDate(new Date(x), 6.5);

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
		var finalStopDisp = finalStop[pattern[temp] - 1];
		var optObjectives = routeNames[pattern[temp] - 1];
		var images = routeImages[pattern[temp] - 1];

		var timeUntilDepature = moment(stopTime).fromNow();

		var cleanDate = moment(stopTime).format("MMM DD h:mm A");
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
			{ title: "Time" },
			{ title: "Boarding Starts" },
			{ title: "Destination" },
			{ title: "Optional Objectives" },
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
