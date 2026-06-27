function cloneFishEntry(entry) {
	return JSON.parse(JSON.stringify(entry));
}

function sheetDataHandlerIndigo(sheetData) {
	console.log("Indigo data: ", sheetData);
	cleanedDataObj.length = 0;
	cleanedDataObjBK.length = 0;

	for (var key in sheetData) {
		var fish = sheetData[key];
		const newFish = {
			Fish: fish.Fish,
			FishTranslated: fish.FishTranslated,
			Bait: {
				Krill: [fish.BaitKrill, splitRange(fish.BaitKrill)[0]],
				PlumpWorm: [fish.BaitPlumpWorm, splitRange(fish.BaitPlumpWorm)[0]],
				Ragworm: [fish.BaitRagworm, splitRange(fish.BaitRagworm)[0]],
				Special: [fish.BaitSpecial, splitRange(fish.BaitSpecial)[0]],
				Mooch: [fish.BaitMooch, splitRange(fish.BaitMooch)[0]],
				MoochType: fish.MoochType,
				SpecialType: fish.BaitSpecialType,
				SpecialTypeTranslated: fish.BaitSpecialTypeTranslated,
				VersatileLure: [
					fish.BaitVersatileLure,
					splitRange(fish.BaitVersatileLure)[0],
				],
				BestBait: fish.BestBait,
				BestBaitTranslated: fish.BestBaitTranslated,
			},
			Bite: fish.Bite,
			DH: [fish.DH, fish.DH],
			Hookset: fish.Hookset,
			hooksetName: fish.hooksetName,
			Intuition: fish.Intuition,
			Mission: fish.Mission,
			Points: fish.Points,
			Species: fish.Species,
			SpeciesTranslated: fish.SpeciesTranslated,
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
				Special1TypeTranslated: fish.WeatherSpecial1TypeTranslated,
				Special2: fish.WeatherSpecial2,
				Special2Type: fish.WeatherSpecial2Type,
				Special2TypeTranslated: fish.WeatherSpecial2TypeTranslated,
				Special3: fish.WeatherSpecial3,
				Special3Type: fish.WeatherSpecial3Type,
				Special3TypeTranslated: fish.WeatherSpecial3TypeTranslated,
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
		cleanedDataObjBK.push(cloneFishEntry(newFish));
	}

	console.log("clean data", cleanedDataObj);

	// Build initial schedule, then explicitly reapply completed-route filter if enabled.
	var firstRoute = convertTime();
	if (getHideCompletedRoutesEnabled()) {
		firstRoute = convertTime(false);
	}
	var test = setInterval(function () {
		var refreshedFirstRoute = convertTime(false);
		var selectedRoute = syncActiveBoatScheduleRoute(refreshedFirstRoute);
		if (selectedRoute) {
			displayStops("Indigo", selectedRoute, cleanedDataObj);
		} else {
			clearDisplayedStopTables();
		}

		if ($("#boatscheduletoggle").hasClass("active")) {
			$("#boatSchedule>tbody>tr").each(function (index) {
				if (!$(this).hasClass("activeRow")) {
					$(this).toggle();
				}
			});
		}
	}, 60000);
	var initialSelectedRoute = syncActiveBoatScheduleRoute(firstRoute);
	$("#throbber").addClass("importanthide");
	if (initialSelectedRoute) {
		displayStops("Indigo", initialSelectedRoute, cleanedDataObj);
	} else {
		clearDisplayedStopTables();
	}
}

function sheetDataHandlerRuby(sheetData) {
	console.log("Ruby data: ", sheetData);
	cleanedDataObj.length = 0;
	cleanedDataObjBK.length = 0;

	for (var key in sheetData) {
		var fish = sheetData[key];
		const newFish = {
			Fish: fish.Fish,
			FishTranslated: fish.FishTranslated,
			Bait: {
				Krill: [fish.BaitKrill, splitRange(fish.BaitKrill)[0]],
				PlumpWorm: [fish.BaitPlumpWorm, splitRange(fish.BaitPlumpWorm)[0]],
				Ragworm: [fish.BaitRagworm, splitRange(fish.BaitRagworm)[0]],
				Special: [fish.BaitSpecial, splitRange(fish.BaitSpecial)[0]],
				Mooch: [fish.BaitMooch, splitRange(fish.BaitMooch)[0]],
				MoochType: fish.MoochType,
				SpecialType: fish.BaitSpecialType,
				SpecialTypeTranslated: fish.BaitSpecialTypeTranslated,
				VersatileLure: [
					fish.BaitVersatileLure,
					splitRange(fish.BaitVersatileLure)[0],
				],
				BestBait: fish.BestBait,
				BestBaitTranslated: fish.BestBaitTranslated,
			},
			Bite: fish.Bite,
			DH: [fish.DH, fish.DH],
			Hookset: fish.Hookset,
			hooksetName: fish.hooksetName,
			Intuition: fish.Intuition,
			Mission: fish.Mission,
			Points: fish.Points,
			Species: fish.Species,
			SpeciesTranslated: fish.SpeciesTranslated,
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
				Special1TypeTranslated: fish.WeatherSpecial1TypeTranslated,
				Special2: fish.WeatherSpecial2,
				Special2Type: fish.WeatherSpecial2Type,
				Special2TypeTranslated: fish.WeatherSpecial2TypeTranslated,
				Special3: fish.WeatherSpecial3,
				Special3Type: fish.WeatherSpecial3Type,
				Special3TypeTranslated: fish.WeatherSpecial3TypeTranslated,
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
		cleanedDataObjBK.push(cloneFishEntry(newFish));
	}

	console.log("clean data", cleanedDataObj);

	// Build initial schedule, then explicitly reapply completed-route filter if enabled.
	var firstRoute = convertTime();
	if (getHideCompletedRoutesEnabled()) {
		firstRoute = convertTime(false);
	}
	var test = setInterval(function () {
		var refreshedFirstRoute = convertTime(false);
		var selectedRoute = syncActiveBoatScheduleRoute(refreshedFirstRoute);
		if (selectedRoute) {
			displayStops("Ruby", selectedRoute, cleanedDataObj);
		} else {
			clearDisplayedStopTables();
		}

		if ($("#boatscheduletoggle").hasClass("active")) {
			$("#boatSchedule>tbody>tr").each(function (index) {
				if (!$(this).hasClass("activeRow")) {
					$(this).toggle();
				}
			});
		}
	}, 60000);

	var initialSelectedRoute = syncActiveBoatScheduleRoute(firstRoute);
	$("#throbber").addClass("importanthide");
	if (initialSelectedRoute) {
		displayStops("Ruby", initialSelectedRoute, cleanedDataObj);
	} else {
		clearDisplayedStopTables();
	}
}

