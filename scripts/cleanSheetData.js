function sheetDataHandlerIndigo(sheetData) {
	console.log("Indigo data: ", sheetData);

	for (var key in sheetData) {
		var fish = sheetData[key];
		const newFish = {
			Fish: fish.Fish,
			Bait: {
				Krill: [fish.BaitKrill, splitRange(fish.BaitKrill)[0]],
				PlumpWorm: [fish.BaitPlumpWorm, splitRange(fish.BaitPlumpWorm)[0]],
				Ragworm: [fish.BaitRagworm, splitRange(fish.BaitRagworm)[0]],
				Special: [fish.BaitSpecial, splitRange(fish.BaitSpecial)[0]],
				Mooch: [fish.BaitMooch, splitRange(fish.BaitMooch)[0]],
				MoochType: fish.MoochType,
				SpecialType: fish.BaitSpecialType,
				VersatileLure: [
					fish.BaitVersatileLure,
					splitRange(fish.BaitVersatileLure)[0],
				],
				BestBait: fish.BestBait,
			},
			Bite: fish.Bite,
			DH: [fish.DH, fish.DH],
			Hookset: fish.Hookset,
			Intuition: fish.Intuition,
			Mission: fish.Mission,
			Points: fish.Points,
			Species: fish.Species,
			Stars: fish.Stars,
			Stop: fish.Stop,
			TH: [fish.TH, fish.TH],
			TimeFrameDay: fish.TimeFrameDay,
			TimeFrameNight: fish.TimeFrameNight,
			TimeFrameSunset: fish.TimeFrameSunset,
			Weather: {
				ClearSkies: fish.WeatherClearSkies,
				Clouds: fish.WeatherClouds,
				FairSkies: fish.WeatherFairSkies,
				Fog: fish.WeatherFog,
				Special1: fish.WeatherSpecial1,
				Special1Type: fish.WeatherSpecial1Type,
				Special2: fish.WeatherSpecial2,
				Special2Type: fish.WeatherSpecial2Type,
				Special3: fish.WeatherSpecial3,
				Special3Type: fish.WeatherSpecial3Type,
			},
			Fabled: fish.FabledTable,
		};

		if (newFish.DH[0] == "") {
			newFish.DH[0] = "3 - 4";
			newFish.DH[1] = 3;
		}
		if (newFish.TH[0] == "") {
			newFish.TH[0] = "5 - 7";
			newFish.TH[1] = 5;
		}

		cleanedDataObj.push(newFish);
		cleanedDataObjBK.push(newFish);
	}

	console.log("clean data", cleanedDataObj);

	//Get Ocean Fishing Schedule for next 12 stops and return the first Route to show
	var firstRoute = convertTime();
	var table = $("#boatSchedule").DataTable();
	var test = setInterval(function () {
		convertTime(false);
		if (activeRowIDpers == "") {
			console.log("fuck");
			$("#boatSchedule>tbody>tr:first").addClass("activeRow");
		} else {
			console.log("fuckity");
			$("#boatSchedule>tbody>#" + activeRowIDpers).addClass("activeRow");
		}

		if ($("#boatscheduletoggle").hasClass("active")) {
			$("#boatSchedule>tbody>tr").each(function (index) {
				if (!$(this).hasClass("activeRow")) {
					$(this).toggle();
				}
			});
		}
	}, 60000);
	$("#boatSchedule>tbody>tr:first").addClass("activeRow");
	$("#throbber").addClass("importanthide");
	displayStops("Indigo", firstRoute, cleanedDataObj);
}

function sheetDataHandlerRuby(sheetData) {
	console.log("Ruby data: ", sheetData);

	for (var key in sheetData) {
		var fish = sheetData[key];
		const newFish = {
			Fish: fish.Fish,
			Bait: {
				Krill: [fish.BaitKrill, splitRange(fish.BaitKrill)[0]],
				PlumpWorm: [fish.BaitPlumpWorm, splitRange(fish.BaitPlumpWorm)[0]],
				Ragworm: [fish.BaitRagworm, splitRange(fish.BaitRagworm)[0]],
				Special: [fish.BaitSpecial, splitRange(fish.BaitSpecial)[0]],
				Mooch: [fish.BaitMooch, splitRange(fish.BaitMooch)[0]],
				MoochType: fish.MoochType,
				SpecialType: fish.BaitSpecialType,
				VersatileLure: [
					fish.BaitVersatileLure,
					splitRange(fish.BaitVersatileLure)[0],
				],
				BestBait: fish.BestBait,
			},
			Bite: fish.Bite,
			DH: [fish.DH, fish.DH],
			Hookset: fish.Hookset,
			Intuition: fish.Intuition,
			Mission: fish.Mission,
			Points: fish.Points,
			Species: fish.Species,
			Stars: fish.Stars,
			Stop: fish.Stop,
			TH: [fish.TH, fish.TH],
			TimeFrameDay: fish.TimeFrameDay,
			TimeFrameNight: fish.TimeFrameNight,
			TimeFrameSunset: fish.TimeFrameSunset,
			Weather: {
				ClearSkies: fish.WeatherClearSkies,
				Clouds: fish.WeatherClouds,
				FairSkies: fish.WeatherFairSkies,
				Fog: fish.WeatherFog,
				Special1: fish.WeatherSpecial1,
				Special1Type: fish.WeatherSpecial1Type,
				Special2: fish.WeatherSpecial2,
				Special2Type: fish.WeatherSpecial2Type,
				Special3: fish.WeatherSpecial3,
				Special3Type: fish.WeatherSpecial3Type,
			},
			Fabled: fish.FabledTable,
		};

		cleanedDataObj.push(newFish);
		cleanedDataObjBK.push(newFish);
	}

	console.log("clean data", cleanedDataObj);

	//Get Ocean Fishing Schedule for next 12 stops and return the first Route to show
	var firstRoute = convertTime();
	var table = $("#boatSchedule").DataTable();
	var test = setInterval(function () {
		convertTime(false);
		if (activeRowIDpers == "") {
			console.log("fuck");
			$("#boatSchedule>tbody>tr:first").addClass("activeRow");
		} else {
			console.log("fuckity");
			$("#boatSchedule>tbody>#" + activeRowIDpers).addClass("activeRow");
		}

		if ($("#boatscheduletoggle").hasClass("active")) {
			$("#boatSchedule>tbody>tr").each(function (index) {
				if (!$(this).hasClass("activeRow")) {
					$(this).toggle();
				}
			});
		}
	}, 60000);

	$("#boatSchedule>tbody>tr:first").addClass("activeRow");
	$("#throbber").addClass("importanthide");
	displayStops("Ruby", firstRoute, cleanedDataObj);
}
