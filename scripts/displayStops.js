var tempDataSet = "";
var tempDataSetRegular = "";
var tempDataSetSpectral = "";
var tempStopTime = "";

function displayStops(route, routeNumber, dataObj) {
	if (route == "Indigo") {
		var schedules = [
			{
				stop1: "Southern",
				stopTime1: "Night",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesouthernstraitofmerlthor")
						: "The Southern Strait of Merlthor",
				stop2: "Galadion",
				stopTime2: "Day",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.galadionbay")
						: "Galadion Bay",
				stop3: "Northern",
				stopTime3: "Sunset",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.thenorthernstraitofmerlthor")
						: "The Northern Strait of Merlthor",
			},
			{
				stop1: "Southern",
				stopTime1: "Day",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesouthernstraitofmerlthor")
						: "The Southern Strait of Merlthor",
				stop2: "Galadion",
				stopTime2: "Sunset",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.galadionbay")
						: "Galadion Bay",
				stop3: "Northern",
				stopTime3: "Night",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.thenorthernstraitofmerlthor")
						: "The Northern Strait of Merlthor",
			},
			{
				stop1: "Southern",
				stopTime1: "Sunset",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesouthernstraitofmerlthor")
						: "The Southern Strait of Merlthor",
				stop2: "Galadion",
				stopTime2: "Night",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.galadionbay")
						: "Galadion Bay",
				stop3: "Northern",
				stopTime3: "Day",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.thenorthernstraitofmerlthor")
						: "The Northern Strait of Merlthor",
			},
			{
				stop1: "Galadion",
				stopTime1: "Night",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.galadionbay")
						: "Galadion Bay",
				stop2: "Southern",
				stopTime2: "Day",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.thesouthernstraitofmerlthor")
						: "The Southern Strait of Merlthor",
				stop3: "Rhotano",
				stopTime3: "Sunset",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.rhotanosea")
						: "Rhotano Sea",
			},
			{
				stop1: "Galadion",
				stopTime1: "Day",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.galadionbay")
						: "Galadion Bay",
				stop2: "Southern",
				stopTime2: "Sunset",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.thesouthernstraitofmerlthor")
						: "The Southern Strait of Merlthor",
				stop3: "Rhotano",
				stopTime3: "Night",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.rhotanosea")
						: "Rhotano Sea",
			},
			{
				stop1: "Galadion",
				stopTime1: "Sunset",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.galadionbay")
						: "Galadion Bay",
				stop2: "Southern",
				stopTime2: "Night",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.thesouthernstraitofmerlthor")
						: "The Southern Strait of Merlthor",
				stop3: "Rhotano",
				stopTime3: "Day",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.rhotanosea")
						: "Rhotano Sea",
			},
			{
				stop1: "Cieldalaes",
				stopTime1: "Night",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thecieldalaes")
						: "The Cieldalaes",
				stop2: "Northern",
				stopTime2: "Day",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.thenorthernstraitofmerlthor")
						: "The Northern Strait of Merlthor",
				stop3: "Blood",
				stopTime3: "Sunset",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.thebloodbrinesea")
						: "The Bloodbrine Sea",
			},
			{
				stop1: "Cieldalaes",
				stopTime1: "Day",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thecieldalaes")
						: "The Cieldalaes",
				stop2: "Northern",
				stopTime2: "Sunset",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.thenorthernstraitofmerlthor")
						: "The Northern Strait of Merlthor",
				stop3: "Blood",
				stopTime3: "Night",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.thebloodbrinesea")
						: "The Bloodbrine Sea",
			},
			{
				stop1: "Cieldalaes",
				stopTime1: "Sunset",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thecieldalaes")
						: "The Cieldalaes",
				stop2: "Northern",
				stopTime2: "Night",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.thenorthernstraitofmerlthor")
						: "The Northern Strait of Merlthor",
				stop3: "Blood",
				stopTime3: "Day",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.thebloodbrinesea")
						: "The Bloodbrine Sea",
			},
			{
				stop1: "Cieldalaes",
				stopTime1: "Night",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thecieldalaes")
						: "The Cieldalaes",
				stop2: "Rhotano",
				stopTime2: "Day",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.rhotanosea")
						: "Rhotano Sea",
				stop3: "Rothlyt",
				stopTime3: "Sunset",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.therothlytsound")
						: "The Rothlyt Sound",
			},
			{
				stop1: "Cieldalaes",
				stopTime1: "Day",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thecieldalaes")
						: "The Cieldalaes",
				stop2: "Rhotano",
				stopTime2: "Sunset",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.rhotanosea")
						: "Rhotano Sea",
				stop3: "Rothlyt",
				stopTime3: "Night",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.therothlytsound")
						: "The Rothlyt Sound",
			},
			{
				stop1: "Cieldalaes",
				stopTime1: "Sunset",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thecieldalaes")
						: "The Cieldalaes",
				stop2: "Rhotano",
				stopTime2: "Night",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.rhotanosea")
						: "Rhotano Sea",
				stop3: "Rothlyt",
				stopTime3: "Day",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.therothlytsound")
						: "The Rothlyt Sound",
			},
		];
	} else if (route == "Ruby") {
		var schedules = [
			{
				stop1: "Sirensong",
				stopTime1: "Sunset",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesirensongsea")
						: "The Sirensong Sea",
				stop2: "Kugane",
				stopTime2: "Night",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.kugane")
						: "Kugane",
				stop3: "One River",
				stopTime3: "Day",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.theoneriver")
						: "The One River",
			},
			{
				stop1: "Sirensong",
				stopTime1: "Sunset",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesirensongsea")
						: "The Sirensong Sea",
				stop2: "Kugane",
				stopTime2: "Night",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.kugane")
						: "Kugane",
				stop3: "Ruby Sea",
				stopTime3: "Day",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.therubysea")
						: "The Ruby Sea",
			},
			{
				stop1: "Sirensong",
				stopTime1: "Night",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesirensongsea")
						: "The Sirensong Sea",
				stop2: "Kugane",
				stopTime2: "Day",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.kugane")
						: "Kugane",
				stop3: "One River",
				stopTime3: "Sunset",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.theoneriver")
						: "The One River",
			},
			{
				stop1: "Sirensong",
				stopTime1: "Night",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesirensongsea")
						: "The Sirensong Sea",
				stop2: "Kugane",
				stopTime2: "Day",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.kugane")
						: "Kugane",
				stop3: "Ruby Sea",
				stopTime3: "Sunset",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.therubysea")
						: "The Ruby Sea",
			},
			{
				stop1: "Sirensong",
				stopTime1: "Day",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesirensongsea")
						: "The Sirensong Sea",
				stop2: "Kugane",
				stopTime2: "Sunset",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.kugane")
						: "Kugane",
				stop3: "One River",
				stopTime3: "Night",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.theoneriver")
						: "The One River",
			},
			{
				stop1: "Sirensong",
				stopTime1: "Day",
				stopDisplayName1:
					typeof translateWord === "function"
						? translateWord("destination.thesirensongsea")
						: "The Sirensong Sea",
				stop2: "Kugane",
				stopTime2: "Sunset",
				stopDisplayName2:
					typeof translateWord === "function"
						? translateWord("destination.kugane")
						: "Kugane",
				stop3: "Ruby Sea",
				stopTime3: "Night",
				stopDisplayName3:
					typeof translateWord === "function"
						? translateWord("destination.therubysea")
						: "The Ruby Sea",
			},
		];
	} else {
	}

	var currStop = schedules[routeNumber - 1];
	$("#dest1Label").html(
		"<span class='desttextrt'>" +
			currStop.stopDisplayName1 +
			"</span>" +
			getTimeImg(currStop.stopTime1)
	);
	$("#dest2Label").html(
		"<span class='desttextrt'>" +
			currStop.stopDisplayName2 +
			"</span>" +
			getTimeImg(currStop.stopTime2)
	);
	$("#dest3Label").html(
		"<span class='desttextrt'>" +
			currStop.stopDisplayName3 +
			"</span>" +
			getTimeImg(currStop.stopTime3)
	);

	for (var i = 0; i < 3; i++) {
		tempDataSet = "";
		tempDataSetRegular = "";
		tempDataSetSpectral = "";
		tempStopTime = "";

		switch (i) {
			case 0:
				tempDataSet = dataObj.filter(
					(item) => item.Stop.indexOf(currStop.stop1) !== -1
				);
				tempStopTime = currStop.stopTime1;
				break;
			case 1:
				tempDataSet = dataObj.filter(
					(item) => item.Stop.indexOf(currStop.stop2) !== -1
				);
				tempStopTime = currStop.stopTime2;
				break;
			default:
				tempDataSet = dataObj.filter(
					(item) => item.Stop.indexOf(currStop.stop3) !== -1
				);
				tempStopTime = currStop.stopTime3;
		}

		tempDataSetRegular = tempDataSet.filter(
			(xitem) => xitem.TimeFrameDay == ""
		);

		tempDataSetSpectral = tempDataSet.filter(
			(xitem) => xitem.TimeFrameDay !== ""
		);

		//Filter Out Spectral Fish that aren't on this stop
		switch (tempStopTime) {
			case "Day":
				tempDataSetSpectral = tempDataSetSpectral.filter(
					(item) => item.TimeFrameDay == "Yes"
				);
				break;
			case "Night":
				tempDataSetSpectral = tempDataSetSpectral.filter(
					(item) => item.TimeFrameNight == "Yes"
				);
				break;
			default:
				tempDataSetSpectral = tempDataSetSpectral.filter(
					(item) => item.TimeFrameSunset == "Yes"
				);
		}

		//console.log("Regular stop |", tempDataSetRegular);
		//console.log("Spectral |", tempDataSetSpectral);
		//console.log("tempData" + i + "  | ", tempDataSet);

		makeStopTable(tempDataSetRegular, "reg", i + 1, tempStopTime, route);

		makeStopTable(tempDataSetSpectral, "spec", i + 1, tempStopTime, route);
	}
}
