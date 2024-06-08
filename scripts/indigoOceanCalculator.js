var pattern = [
	7, 10, 1, 4, 8, 11, 2, 5, 12, 3, 6, 7, 10, 1, 4, 8, 11, 2, 5, 9, 3, 6, 7, 10,
	1, 4, 8, 11, 2, 5, 9, 12, 6, 7, 10, 1, 4, 8, 11, 2, 5, 9, 12, 3, 7, 10, 1, 4,
	8, 11, 2, 5, 9, 12, 3, 6, 10, 1, 4, 8, 11, 2, 5, 9, 12, 3, 6, 7, 1, 4, 8, 11,
	2, 5, 9, 12, 3, 6, 7, 10, 4, 8, 11, 2, 5, 9, 12, 3, 6, 7, 10, 1, 8, 11, 2, 5,
	9, 12, 3, 6, 7, 10, 1, 4, 11, 2, 5, 9, 12, 3, 6, 7, 10, 1, 4, 8, 2, 5, 9, 12,
	3, 6, 7, 10, 1, 4, 8, 11, 5, 9, 12, 3, 6, 7, 10, 1, 4, 8, 11, 2, 9, 12, 3, 6,
];

var routeNames = [
	"Seadragons/Coral Manta",
	"Octopus",
	"Sothis & Elasmosaurus",
	"Sothis & Stonescale",
	"Jellyfish",
	"Sharks/Coral Manta",
	"Hafgufa & Elasmosaurus",
	"Mantas",
	"Crabs/Seafaring Toad",
	"Hafgufa & Placodus",
	"Fugu/Stonescale",
	"Fugu/Mantas",
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

var finalStop = [
	"Northern Strait of Merlthor" + imgSunset,
	"Northern Strait of Merlthor" + imgNight,
	"Northern Strait of Merlthor" + imgDay,
	"Rhotano Sea" + imgSunset,
	"Rhotano Sea" + imgNight,
	"Rhotano Sea" + imgDay,
	"Bloodbrine Sea" + imgSunset,
	"Bloodbrine Sea" + imgNight,
	"Bloodbrine Sea" + imgDay,
	"Rothlyt Sound" + imgSunset,
	"Rothlyt Sound" + imgNight,
	"Rothlyt Sound" + imgDay,
];

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

function convertTime() {
	var x = Date.now();
	var selectedTime = subtractTimeFromDate(new Date(x), 6.5);
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
		var finalStopDisp = finalStop[pattern[temp] - 1];
		var optObjectives = routeNames[pattern[temp] - 1];
		var images = routeImages[pattern[temp] - 1];

		var timeUntilDepature = moment(stopTime).fromNow();

		var cleanDate = moment(stopTime).format("llll");
		dataSet.push([
			cleanDate,
			timeUntilDepature,
			finalStopDisp,
			optObjectives,
			routeNumber,
			images,
		]);
	}

	new DataTable("#boatSchedule", {
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
			$(row).on("click", function () {
				$(".stopsRow").each(function (i) {
					$(this).removeClass("activeRow");
				});
				$(this).addClass("activeRow");
				console.log("Cleaned obj bk", cleanedDataObjBK);
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
