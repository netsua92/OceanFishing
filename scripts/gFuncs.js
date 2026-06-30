var svgMoon =
	'<svg width="32" height="32" aria-label="Night" class="svgColor"><path d="M 14 3 A 12 12 0 1 1 3 18 A 9 9 0 1 0 14 3 Z"></path></svg>';
var svgSun =
	'<svg width="32" height="32" aria-label="Day" class="svgColor"><circle cx="16" cy="16" r="8"></circle><path d="M 26.84 17.89 L 29.86 21.74 L 25 22.33 Z"></path><path d="M 22.33 25 L 21.74 29.86 L 17.89 26.84 Z"></path><path d="M 14.11 26.84 L 10.26 29.86 L 9.67 25 Z"></path><path d="M 7 22.33 L 2.14 21.74 L 5.16 17.89 Z"></path><path d="M 5.16 14.11 L 2.14 10.26 L 7 9.67 Z"></path><path d="M 9.67 7 L 10.26 2.14 L 14.11 5.16 Z"></path><path d="M 17.89 5.16 L 21.74 2.14 L 22.33 7 Z"></path><path d="M 25 9.67 L 29.86 10.26 L 26.84 14.11 Z"></path></svg>';
var svgSunset =
	'<svg width="32" height="32" aria-label="Sunset" class="svgColor"><path d="M 29 22 A 10.4 10.4 0 1 0 10 22 Z"></path><path d="M 2 28 L 2 24 L 30 24 L 30 28 Z"></path></svg>';

var imgNight =
	"<span class=\" badge timebadge rounded-pill\"><img src='../img/ocNight.png' alt='Night' class='iconSmallest'></span>";
var imgDay =
	"<span class=\" badge timebadge rounded-pill\"><img src='../img/ocDay.png' alt='Day' class='iconSmallest'></span>";
var imgSunset =
	"<span class=\" badge timebadge rounded-pill\"><img src='../img/ocSunset.png' alt='Sunset' class='iconSmallest'></span>";

let specialBait = "Special Bait";
let SpecialBaitStripped = "SpecialBait";
var UncaughtRoutes = {
	Route1: false,
	Route2: false,
	Route3: false,
	Route4: false,
	Route5: false,
	Route6: false,
	Route7: false,
	Route8: false,
	Route9: false,
	Route10: false,
	Route11: false,
	Route12: false,
};

function subtractTimeFromDate(objDate, intHours) {
	var numberOfMlSeconds = objDate;

	var addMlSeconds = intHours * 60 * 60 * 1000;

	var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);

	return newDateObj;
}
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split("&"),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split("=");

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined
				? true
				: decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
};

function getTimeImg(time) {
	switch (time) {
		case "Night":
			return imgNight;
		case "Sunset":
			return imgSunset;
		default:
			return imgDay;
	}
}

function splitRange(rangeString) {
    var x1 = 0;
    var y1 = 0;

    if (rangeString !== "" && rangeString != null) {
        var parts = String(rangeString).split("-");

        if (parts[0].trim() !== "") {
            x1 = parseFloat(parts[0].trim());
            if (parts.length > 1 && parts[1].trim() !== "") {
                y1 = parseFloat(parts[1].trim());
            } else {
                // Single value like "2" means 2-2
                y1 = x1;
            }
        }
    }

    return [x1, y1];
}

function addStars(num) {
	let stars = "";
	for (let i = 0; i < num; i++) {
		stars += "★";
	}
	return stars;
}

function getChecklistCaughtState() {
	try {
		var raw = localStorage.getItem("caughtFishLS-combined");
		if (!raw) return { ruby: {}, indigo: {} };
		var parsed = JSON.parse(raw);
		return { ruby: parsed.ruby || {}, indigo: parsed.indigo || {} };
	} catch (e) {
		return { ruby: {}, indigo: {} };
	}
}

function isFishCaught(rawFishName) {
	var path = window.location.pathname.toLowerCase();
	var routeId = path.indexOf("ruby") !== -1 ? "ruby" : path.indexOf("indigo") !== -1 ? "indigo" : null;
	if (!routeId) return false;
	var normalized = String(rawFishName).replace(/^(?:[MITF]!)+/, "").trim();
	var caughtState = getChecklistCaughtState();
	var routeState = caughtState[routeId] || {};

	// New format: exact entry key match if we have row context.
	if (arguments.length > 1 && arguments[1]) {
		var row = arguments[1];
		var stop = String((row.StopTranslated || row.Stop || "")).trim().toLowerCase();
		var day = String(row.TimeFrameDay || "").trim().toLowerCase();
		var sunset = String(row.TimeFrameSunset || "").trim().toLowerCase();
		var night = String(row.TimeFrameNight || "").trim().toLowerCase();
		var bestBait = String((row.Bait && row.Bait.BestBait) || "").trim().toLowerCase();
		var mission = String(row.Mission || "").trim().toLowerCase();
		var species = String(row.Species || "").trim().toLowerCase();
		var stateKey = [normalized, stop, day, sunset, night, bestBait, mission, species].join("|");
		if (routeState[stateKey] === true) {
			return true;
		}
	}

	// Backward compatibility: old fish-name-only key.
	if (routeState[normalized] === true) {
		return true;
	}

	// Compatibility for newer keys when row context is unavailable.
	var prefix = normalized + "|";
	for (var key in routeState) {
		if (Object.prototype.hasOwnProperty.call(routeState, key) && routeState[key] === true && key.indexOf(prefix) === 0) {
			return true;
		}
	}

	return false;
}

var completedRoutesFilterStorageKey = "hideCompletedRoutes";

var routeStopConfigs = {
	ruby: [
		[
			{ stop: "Unnamed", time: "Sunset" },
			{ stop: "Sirensong", time: "Night" },
			{ stop: "Thavnair", time: "Day" },
		],
		[
			{ stop: "Sirensong", time: "Sunset" },
			{ stop: "Kugane", time: "Night" },
			{ stop: "One River", time: "Day" },
		],
		[
			{ stop: "Sirensong", time: "Sunset" },
			{ stop: "Kugane", time: "Night" },
			{ stop: "Ruby Sea", time: "Day" },
		],
		[
			{ stop: "Unnamed", time: "Night" },
			{ stop: "Sirensong", time: "Day" },
			{ stop: "Thavnair", time: "Sunset" },
		],
		[
			{ stop: "Sirensong", time: "Night" },
			{ stop: "Kugane", time: "Day" },
			{ stop: "One River", time: "Sunset" },
		],
		[
			{ stop: "Sirensong", time: "Night" },
			{ stop: "Kugane", time: "Day" },
			{ stop: "Ruby Sea", time: "Sunset" },
		],
		[
			{ stop: "Unnamed", time: "Day" },
			{ stop: "Sirensong", time: "Sunset" },
			{ stop: "Thavnair", time: "Night" },
		],
		[
			{ stop: "Sirensong", time: "Day" },
			{ stop: "Kugane", time: "Sunset" },
			{ stop: "One River", time: "Night" },
		],
		[
			{ stop: "Sirensong", time: "Day" },
			{ stop: "Kugane", time: "Sunset" },
			{ stop: "Ruby Sea", time: "Night" },
		],
	],
	indigo: [
		[
			{ stop: "Southern", time: "Night" },
			{ stop: "Galadion", time: "Day" },
			{ stop: "Northern", time: "Sunset" },
		],
		[
			{ stop: "Southern", time: "Day" },
			{ stop: "Galadion", time: "Sunset" },
			{ stop: "Northern", time: "Night" },
		],
		[
			{ stop: "Southern", time: "Sunset" },
			{ stop: "Galadion", time: "Night" },
			{ stop: "Northern", time: "Day" },
		],
		[
			{ stop: "Galadion", time: "Night" },
			{ stop: "Southern", time: "Day" },
			{ stop: "Rhotano", time: "Sunset" },
		],
		[
			{ stop: "Galadion", time: "Day" },
			{ stop: "Southern", time: "Sunset" },
			{ stop: "Rhotano", time: "Night" },
		],
		[
			{ stop: "Galadion", time: "Sunset" },
			{ stop: "Southern", time: "Night" },
			{ stop: "Rhotano", time: "Day" },
		],
		[
			{ stop: "Cieldalaes", time: "Night" },
			{ stop: "Northern", time: "Day" },
			{ stop: "Blood", time: "Sunset" },
		],
		[
			{ stop: "Cieldalaes", time: "Day" },
			{ stop: "Northern", time: "Sunset" },
			{ stop: "Blood", time: "Night" },
		],
		[
			{ stop: "Cieldalaes", time: "Sunset" },
			{ stop: "Northern", time: "Night" },
			{ stop: "Blood", time: "Day" },
		],
		[
			{ stop: "Cieldalaes", time: "Night" },
			{ stop: "Rhotano", time: "Day" },
			{ stop: "Rothlyt", time: "Sunset" },
		],
		[
			{ stop: "Cieldalaes", time: "Day" },
			{ stop: "Rhotano", time: "Sunset" },
			{ stop: "Rothlyt", time: "Night" },
		],
		[
			{ stop: "Cieldalaes", time: "Sunset" },
			{ stop: "Rhotano", time: "Night" },
			{ stop: "Rothlyt", time: "Day" },
		],
	],
};

function normalizeFishNameForChecklist(rawFishName) {
	return String(rawFishName || "").replace(/^(?:[MITF]!)+/, "").trim();
}

function getHideCompletedRoutesEnabled() {
	try {
		return localStorage.getItem(completedRoutesFilterStorageKey) === "true";
	} catch (e) {
		return false;
	}
}

function setHideCompletedRoutesEnabled(enabled) {
	try {
		localStorage.setItem(completedRoutesFilterStorageKey, enabled ? "true" : "false");
	} catch (e) {
		return;
	}
}

function getRouteStopConfig(route, routeNumber) {
	var routeKey = String(route || "").trim().toLowerCase();
	var routeConfigSet = routeStopConfigs[routeKey];
	var routeIndex = Number(routeNumber) - 1;
	if (!routeConfigSet || routeIndex < 0 || routeIndex >= routeConfigSet.length) {
		return [];
	}
	return routeConfigSet[routeIndex];
}

function getRouteScheduleEntries(route, routeNumber, dataObj) {
	var routeStops = getRouteStopConfig(route, routeNumber);
	var allEntries = [];

	routeStops.forEach(function (routeStop) {
		var stopEntries = (dataObj || []).filter(function (item) {
			return item.Stop.indexOf(routeStop.stop) !== -1;
		});

		var regularEntries = stopEntries.filter(function (item) {
			return item.TimeFrameDay == "";
		});

		var spectralEntries = stopEntries.filter(function (item) {
			return item.TimeFrameDay !== "";
		});

		switch (routeStop.time) {
			case "Day":
				spectralEntries = spectralEntries.filter(function (item) {
					return item.TimeFrameDay == "Yes";
				});
				break;
			case "Night":
				spectralEntries = spectralEntries.filter(function (item) {
					return item.TimeFrameNight == "Yes";
				});
				break;
			default:
				spectralEntries = spectralEntries.filter(function (item) {
					return item.TimeFrameSunset == "Yes";
				});
		}

		allEntries = allEntries.concat(regularEntries, spectralEntries);
	});

	return allEntries;
}

function getRouteUncaughtSummary(route, routeNumber, dataObj) {
	var routeEntries = getRouteScheduleEntries(route, routeNumber, dataObj);
	var uncaughtFishNames = {};

	routeEntries.forEach(function (item) {
		if (!isFishCaught(item.Fish, item)) {
			uncaughtFishNames[normalizeFishNameForChecklist(item.Fish).toLowerCase()] = true;
		}
	});

	var uncaughtCount = Object.keys(uncaughtFishNames).length;
	return {
		entries: routeEntries,
		uncaughtCount: uncaughtCount,
		hasUncaught: uncaughtCount > 0,
	};
}

function syncActiveBoatScheduleRoute(firstRoute) {
	var activeRoute = null;
	var activeRow = activeRowIDpers ? document.getElementById(activeRowIDpers) : null;

	if (activeRow) {
		activeRow.classList.add("activeRow");
		activeRoute = activeRow.getAttribute("data-route");
	} else {
		var firstRow = document.querySelector("#boatSchedule>tbody>tr");
		if (firstRow) {
			firstRow.classList.add("activeRow");
			activeRowIDpers = firstRow.id || "";
			activeRoute = firstRow.getAttribute("data-route");
		} else {
			activeRowIDpers = "";
		}
	}

	return activeRoute || (firstRoute != null ? String(firstRoute) : null);
}

function updateBoatScheduleEmptyState(show) {
	var emptyState = document.getElementById("boatScheduleEmptyState");
	if (!emptyState) {
		return;
	}
	emptyState.classList.toggle("d-none", !show);
}

function clearDisplayedStopTables() {
	["#dest1Label", "#dest2Label", "#dest3Label"].forEach(function (selector, index) {
		var label = document.querySelector(selector);
		if (label) {
			label.textContent = "Stop " + (index + 1);
		}
	});

	[
		"#desttable1reg",
		"#desttable1spec",
		"#desttable2reg",
		"#desttable2spec",
		"#desttable3reg",
		"#desttable3spec",
	].forEach(function (selector) {
		if (typeof $ !== "undefined" && $.fn && $.fn.dataTable && $.fn.dataTable.isDataTable(selector)) {
			$(selector).DataTable().clear().destroy();
		}
		var table = document.querySelector(selector);
		if (table) {
			table.innerHTML = "";
		}
	});
}

function getUncaughtRoutes(color) {
	caughtFish = JSON.parse(localStorage.getItem("caughtFishLS-" + color));
	if (caughtFish != null) {
		caughtFish.forEach(function (item) {
			if (!item.Caught) {
				console.log(item);
				for (const [k, v] of Object.entries(item.Routes)) {
					//console.log("k = " + k + " v =" + v);
					if (v === true) {
						UncaughtRoutes[k] = true;
					}
				}
			}
		});
	}
}

function normalizeMaybeNullText(value, fallback) {
    if (value === null || value === undefined) {
        return fallback || "";
    }
    var text = String(value).trim();
    if (text.toLowerCase() === "null" || text.toLowerCase() === "undefined") {
        return fallback || "";
    }
    return text;
}

function normalizeRowTooltipFields(row) {
    if (!row.Bait) row.Bait = {};
    if (!row.Weather) row.Weather = {};

    row.Intuition = normalizeMaybeNullText(row.Intuition);
    row.FishTranslated = normalizeMaybeNullText(row.FishTranslated, normalizeMaybeNullText(row.Fish));
    row.hooksetName = normalizeMaybeNullText(row.hooksetName, normalizeMaybeNullText(row.Hookset));
    row.SpeciesTranslated = normalizeMaybeNullText(row.SpeciesTranslated, normalizeMaybeNullText(row.Species));

    row.Bait.BestBait = normalizeMaybeNullText(row.Bait.BestBait);
    row.Bait.BestBaitTranslated = normalizeMaybeNullText(row.Bait.BestBaitTranslated, row.Bait.BestBait);

    row.Weather.Special1Type = normalizeMaybeNullText(row.Weather.Special1Type);
    row.Weather.Special2Type = normalizeMaybeNullText(row.Weather.Special2Type);
    row.Weather.Special3Type = normalizeMaybeNullText(row.Weather.Special3Type);
    row.Weather.Special1TypeTranslated = normalizeMaybeNullText(row.Weather.Special1TypeTranslated, row.Weather.Special1Type);
    row.Weather.Special2TypeTranslated = normalizeMaybeNullText(row.Weather.Special2TypeTranslated, row.Weather.Special2Type);
    row.Weather.Special3TypeTranslated = normalizeMaybeNullText(row.Weather.Special3TypeTranslated, row.Weather.Special3Type);
}


function styleRow(row, id, type) {
	 normalizeRowTooltipFields(row);
	//var lang = $.cookie("language");
	var noQuoteIntuition = row.Intuition.replace(/"/g, "\'");
	var rawFishName = row.Fish;


	//Best Bait Image
	if (!row.Bait.BestBait || row.Bait.BestBait.trim() === "") {
		row.Bait.BestBait = "<img class='iconSmall' src='../img/bait/Bait.png' alt='Any Bait' tabindex='0' data-bs-toggle='tooltip' data-bs-title='Any Bait'>";
	} else if (row.Bait.BestBait.substring(0, 2) == "M!") {
		if (row.Bait.BestBait.substring(2, 4) == "T!") {

			row.Bait.BestBait = row.Bait.BestBait.replace("M!T!", "");
		} else {
			row.Bait.BestBait = row.Bait.BestBait.replace("M!", "");
		}
		row.Bait.BestBait =
			"<img class='iconSmall' src='../img/fish/" +
			row.Bait.BestBait.replace(/'/g, "_") +
			".png' alt='" +
			row.Bait.BestBaitTranslated +
			"' tabindex='0' data-bs-toggle='tooltip' data-bs-title='" +
			row.Bait.BestBaitTranslated +
			"' tabindex='0'>";
	} else {
		row.Bait.BestBait =
			"<img class='iconSmall' src='../img/bait/" +
			row.Bait.BestBait.replace(/\s/g, "") +
			".png' alt='" +
			row.Bait.BestBaitTranslated +
			"' tabindex='0' data-bs-toggle='tooltip' data-bs-title='" +
			row.Bait.BestBaitTranslated +
			"'>";
	}

	//Fish Data
	if (row.Fish.substring(0, 2) == "M!") {
		if (row.Fish.substring(2, 4) == "T!") {
		//Mooch Trigger Fish
			row.Fish = row.Fish.replace("M!T!", "");

			console.log(row.Fish);
			row.Fish =
				"<div class='row'><div class='col-3 min50'><img class='iconSmall' src='../img/fish/" +
				row.Fish.replace(/'/g, "_") +
				".png' alt='" +
				row.FishTranslated +
				"' data-bs-toggle='tooltip' data-bs-title='" +
				row.FishTranslated.replace(/'/g, "") +
				"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
				row.FishTranslated +
				"</span>" +
				addStars(row.Stars) +
				"<img src='../img/bait/Mooch.png' class='iconMini moochIcon'> " +
				row.Intuition +
				"</div></div>";
		} else {
		//Mooch
				row.Fish = row.Fish.replace("M!", "");
				row.Fish =
				"<div class='row'><div class='col-3 min50'><img class='iconSmall' src='../img/fish/" +
				row.Fish.replace(/'/g, "_") +
				".png' alt='" +
				row.FishTranslated +
				"' data-bs-toggle='tooltip' data-bs-title='" +
				row.FishTranslated.replace(/'/g, "") +
				"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
				row.FishTranslated +
				"</span>" +
				addStars(row.Stars) +
				"<img src='../img/bait/Mooch.png' class='iconMini moochIcon'> " +
				"</div></div>";
		}
	} else if (row.Fish.substring(0, 2) == "I!") {
		//Intuition Fish
		row.Fish = row.Fish.replace("I!", "");
		row.Fish =
			"<div class='row'><div class='col-3 min50'><img class='iconSmall' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.FishTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.FishTranslated.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.FishTranslated +
			"</span>" +
			addStars(row.Stars) +
			'<br/><img src="../img/Intuition.png" class="iconMini" alt="Intuition"> ' +
			row.Intuition +
			"</div>" + 
			"<div class='contentMax d-block d-lg-none'><img src='../img/Intuition.png' class='iconMini' alt='Intuition'> " + row.Intuition +
			"</div></div>";
	} else if (row.Fish.substring(0, 2) == "F!") {
		//Fabled Fish
		row.Fish = row.Fish.replace("F!", "");
		row.Fish =
			"<div class='row'><div class='col-3 min50'><img class='iconSmall fabledFish' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.FishTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.FishTranslated.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.FishTranslated +
			"</span>" +
			addStars(row.Stars) +
			'<br/><img src="../img/Intuition.png" class="iconMini" alt="Intuition"> ' +
			row.Intuition +
			"</div>" + 
			"<div class='contentMax d-block d-lg-none'><img src='../img/Intuition.png' class='iconMini' alt='Intuition'> " + row.Intuition +
			"</div></div>";
	} else if (row.Fish.substring(0, 2) == "T!") {
		//Trigger Fish
		row.Fish = row.Fish.replace("T!", "");
		row.Fish =
			"<div class='row'><div class='col-3 min50'><img class='iconSmall' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.FishTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.FishTranslated.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.FishTranslated +
			"</span>" +
			addStars(row.Stars) +
			"<br/>" +
			row.Intuition +
			"</div></div>";
	} else {
		row.Fish =
			"<div class='row'><div class='col-3 min50'><img class='iconSmall' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.FishTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.FishTranslated.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.FishTranslated +
			"</span>" +
			addStars(row.Stars) +
			"</div></div>";
	}

	//Caught badge from checklist
	if (isFishCaught(rawFishName, row)) {
		var caughtBadge = "<span class='badge bg-success mt-1' style='font-size:0.65em;'>&#10003; Caught</span>";
		row.Fish = row.Fish
			.replace("class='col-3 min50'>", "class='col-3 min50 d-flex flex-column align-items-center'>")
			.replace("tabindex='0'></div>", "tabindex='0'>" + caughtBadge + "</div>");
	}

	//Hookset Images
	if (row.Hookset == "Powerful") {
		row.Hookset =
			"<div><img src='../img/Powerful.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
			row.hooksetName +
			"' tabindex='0'>";
	} else {
		row.Hookset =
			"<div><img src='../img/Precision.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
			row.hooksetName +
			"' tabindex='0'>";
	}

	//Species Images
	switch (row.Species) {
		case "Manta":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/manta_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Fugu":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/balloon_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Crab":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/crab_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Seadragon":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/dragon_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Jellyfish":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/jelly_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Octopus":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/octo_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Shark":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/shark_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Shellfish":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/mussel_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Squid":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/squid_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Shrimp":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/shrimp_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Prehistoric":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/prehistoric_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		case "Mantis":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/mantis_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='" +
				row.SpeciesTranslated +
				"' tabindex='0'></span>";
			break;
		default:
			break;
	}

	//Hookset !!! bites
	switch (row.Bite) {
		case "!":
			row.Hookset =
				'<span class="badge bitebadge bg-success">!<span class="visually-hidden"> ! </span></span></div>' +
				row.Hookset;
			break;
		case "!!":
			row.Hookset =
				'<span class="badge bitebadge bg-primary">!!<span class="visually-hidden">!!</span></span></div>' +
				row.Hookset;
			break;
		default:
			row.Hookset =
				'<span class="badge bitebadge bg-danger">!!!<span class="visually-hidden">!!!</span></span></div>' +
				row.Hookset;
			break;
	}
	//TH Scores
	if (typeof row.TH[0] == "string") {
    var thRaw = row.TH[0].trim();
    var thIsRange = thRaw.indexOf("-") !== -1;
    var thRange = splitRange(thRaw);
    var th1 = parseFloat(row.Points) * parseFloat(thRange[0]);
    var th2 = parseFloat(row.Points) * parseFloat(thRange[1]);

    if (thIsRange) {
        row.TH[0] = th1 + " - " + th2 + " (" + thRaw + ")";
    } else {
        row.TH[0] = th1 + " (" + thRaw + ")";
    }
    row.TH[1] = th1;
}
	//DH Scores
	if (typeof row.DH[0] == "string") {
    var dhRaw = row.DH[0].trim();
    var dhIsRange = dhRaw.indexOf("-") !== -1;
    var dhRange = splitRange(dhRaw);
    var dh1 = parseFloat(row.Points) * parseFloat(dhRange[0]);
    var dh2 = parseFloat(row.Points) * parseFloat(dhRange[1]);

    if (dhIsRange) {
        row.DH[0] = dh1 + " - " + dh2 + " (" + dhRaw + ")";
    } else {
        row.DH[0] = dh1 + " (" + dhRaw + ")";
    }
    row.DH[1] = dh1;
}

	//Append if Fabled onto points
	if (row.Fabled == "No") {
		row.Bait.BestBait += "<span class='fabled' hidden>FabledTrue</span>";
	}

	//Weather
	var rowWeather = "";
	if (row.Weather.FairSkies !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Fair Skies.png' alt='" +
			translateWord("table.fairskies") +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			translateWord("table.fairskies") +
			"' tabindex='0'>";
	}
	if (row.Weather.Clouds !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Clouds.png' alt='" +
			translateWord("table.clouds") +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			translateWord("table.clouds") +
			"' tabindex='0'>";
	}
	if (row.Weather.Fog !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Fog.png' alt='" +
			translateWord("table.fog") +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			translateWord("table.fog") +
			"' tabindex='0'>";
	}
	if (row.Weather.Special1 !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special1Type +
			".png' alt='" +
			row.Weather.Special1TypeTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.Weather.Special1TypeTranslated +
			"' tabindex='0'>";
	}
	if (row.Weather.Special2 !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special2Type +
			".png' alt='" +
			row.Weather.Special2TypeTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.Weather.Special2TypeTranslated +
			"' tabindex='0'>";
	}
	if (row.Weather.Special3 == "No") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special3Type +
			".png' alt='" +
			row.Weather.Special3TypeTranslated +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.Weather.Special3TypeTranslated +
			"' tabindex='0'>";
	}
	if (row.Weather.ClearSkies !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Clear Skies.png' alt='" +
			translateWord("table.clearskies") +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			translateWord("table.clearskies") +
			"' tabindex='0'>";
	}

	if (rowWeather == "") {
		row.ClearSkies = translateWord("table.any");
	} else {
		if (getCurrentLangSafe() === "jp" || getCurrentLangSafe() === "ko") {
			row.ClearSkies = rowWeather + " " + translateWord("table.not");
		} else {
			row.ClearSkies = translateWord("table.not") + " " + rowWeather;
		}
	}

	return row;
}

var stopTableUiState = {
	fabledByStop: {},
	sortByTable: {},
};

function getStopTableSelector(id, type) {
	return "#desttable" + id + type;
}

function applyFabledFocusState(id, checked) {
	$("#fff" + id).prop("checked", !!checked);
	$("#fff" + id + "spec").prop("checked", !!checked);

	$("[id^=desttable" + id + "] .fabled").each(function () {
		if (checked) {
			$(this).closest("tr").hide();
			$(this).closest("table").removeClass("table-striped");
		} else {
			$(this).closest("tr").show();
			$(this).closest("table").addClass("table-striped");
		}
	});
}

function makeStopTable(tempDataSet, type, id, time, route) {
	let tableSelector = getStopTableSelector(id, type);
	if (
		typeof $ !== "undefined" &&
		$.fn &&
		$.fn.dataTable &&
		$.fn.dataTable.isDataTable(tableSelector)
	) {
		try {
			let existingTable = $(tableSelector).DataTable();
			let existingOrder = existingTable.order();
			if (Array.isArray(existingOrder) && existingOrder.length > 0) {
				stopTableUiState.sortByTable[tableSelector] = existingOrder;
			}
		} catch (err) {
			// Ignore sort capture failures and continue with rebuild.
		}
	}

	let existingFabledState = stopTableUiState.fabledByStop[id];
	if (typeof existingFabledState !== "boolean") {
		existingFabledState =
			$("#fff" + id).prop("checked") || $("#fff" + id + "spec").prop("checked") || false;
		stopTableUiState.fabledByStop[id] = !!existingFabledState;
	}

	let toggleDiv = document.querySelector("#Toggles" + id + type);
	let persistedColumnVisibility = {};
	if (toggleDiv) {
		toggleDiv.querySelectorAll("button.toggle-vis").forEach((el) => {
			let columnIdx = Number(el.getAttribute("data-column"));
			if (Number.isNaN(columnIdx)) return;
			persistedColumnVisibility[columnIdx] =
				el.classList.contains("active") || el.getAttribute("aria-pressed") === "true";
		});
	}
	let newtempDataSet = [];
	let specBait = false;
	let mooch = false;
	//tempDataSet = { ...tempDataSettemp };

	tempDataSet.forEach(function (row) {
		//Set Special Bait text to what the special bait is
		if (type == "spec") {
			if (row.Bait.SpecialType != "") {
				specialBait = row.Bait.SpecialTypeTranslated;
				SpecialBaitStripped = row.Bait.SpecialType.replace(/\s/g, "");
				$("#specialBaitToggle" + id + type).html(specialBait);
				specBait = true;
			} else if (row.Bait.Special && row.Bait.Special[0] != "") {
				specBait = true;
			} else {
				specialBait = "Special Bait";
				SpecialBaitStripped = "SpecialBait";
				$("#specialBaitToggle" + id + type).html(specialBait);
			}
		}

		//Disable Mooch if no Mooch
		if (row.Bait.MoochType != "") {
			mooch = true;
		} else {
			mooch = false;
		}

		let temprow;
		if (row.Fish.substring(0, 1) !== "<") {
			temprow = styleRow(row, id, type);
		} else {
			temprow = row;
		}

		if (temprow.ClearSkies === undefined || temprow.ClearSkies === null) {
    		temprow.ClearSkies = "";
		}
		newtempDataSet.push(temprow);
	});

	var table;

	if (type == "spec") {
		//Make Table
		table = new DataTable("#desttable" + id + type, {
			data: newtempDataSet,
			columns: [
				{
					data: { _: "Fish", type: "Fish", sort: "Stars" },
					title: translateWord("table.fish"),
				},
				{ data: "Hookset", title: translateWord("table.hook") },
				{ data: "Bait.BestBait", title: translateWord("table.bestbait"), orderable: false },
				{
					data: {
						_: "Bait.Ragworm.0",
						type: "Bait.Ragworm.1",
						sort: "Bait.Ragworm.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/Ragworm.png' alt='Ragworm'>",
				},
				{
					data: {
						_: "Bait.Krill.0",
						type: "Bait.Krill.1",
						sort: "Bait.Krill.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/Krill.png' alt='Krill'>",
				},
				{
					data: {
						_: "Bait.PlumpWorm.0",
						type: "Bait.PlumpWorm.1",
						sort: "Bait.PlumpWorm.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/PlumpWorm.png' alt='Plump Worm'>",
				},
				{
					data: {
						_: "Bait.Mooch.0",
						type: "Bait.Mooch.1",
						sort: "Bait.Mooch.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/Mooch.png' alt='Mooch'>",
					visible: false,
				},
				{
					data: {
						_: "Bait.Special.0",
						type: "Bait.Special.1",
						sort: "Bait.Special.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/" +
						SpecialBaitStripped +
						".png' alt='" +
						specialBait +
						"'>",
					visible: false,
				},
				{
					data: {
						_: "Bait.VersatileLure.0",
						type: "Bait.VersatileLure.1",
						sort: "Bait.VersatileLure.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/VersatileLure.png' alt='Versatile Lure'>",
					visible: false,
				},
				{ data: "Points", title: translateWord("table.points") },
				{
					data: {
						_: "DH.0",
						type: "DH.1",
						sort: "DH.1",
					},
					title: translateWord("table.dhyield"),
				},
				{
					data: {
						_: "TH.0",
						type: "TH.1",
						sort: "TH.1",
					},
					title: translateWord("table.thyield"),
				},
				{ data: "Species", title: translateWord("table.species") },
			],
			paging: false,
			destroy: true,
			searching: false,
			info: false,
		});
	} else {
		//Make Table
		table = new DataTable("#desttable" + id + type, {
			data: newtempDataSet,
			columns: [
				{
					data: { _: "Fish", type: "Fish", sort: "Stars" },
					title: translateWord("table.fish"),
				},
				{ data: "Hookset", title: translateWord("table.hook") },
				{ data: "Bait.BestBait", title: translateWord("table.bestbait"), orderable: false },
				{
					data: {
						_: "Bait.Ragworm.0",
						type: "Bait.Ragworm.1",
						sort: "Bait.Ragworm.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/Ragworm.png' alt='Ragworm'>",
				},
				{
					data: {
						_: "Bait.Krill.0",
						type: "Bait.Krill.1",
						sort: "Bait.Krill.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/Krill.png' alt='Krill'>",
				},
				{
					data: {
						_: "Bait.PlumpWorm.0",
						type: "Bait.PlumpWorm.1",
						sort: "Bait.PlumpWorm.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/PlumpWorm.png' alt='Plump Worm'>",
				},
				{
					data: {
						_: "Bait.Mooch.0",
						type: "Bait.Mooch.1",
						sort: "Bait.Mooch.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/Mooch.png' alt='Mooch'>",
					visible: false,
				},
				{
					data: {
						_: "Bait.VersatileLure.0",
						type: "Bait.VersatileLure.1",
						sort: "Bait.VersatileLure.1",
					},
					title:
						"<img class='iconSmall' src='../img/bait/VersatileLure.png' alt='Versatile Lure'>",
					visible: false,
				},
				{ data: "Points", title: translateWord("table.points") },
				{
					data: {
						_: "DH.0",
						type: "DH.1",
						sort: "DH.1",
					},
					title: translateWord("table.dhyield"),
				},
				{
					data: {
						_: "TH.0",
						type: "TH.1",
						sort: "TH.1",
					},
					title: translateWord("table.thyield"),
				},
				{
					data: "ClearSkies",
					title: translateWord("table.weather"),
					defaultContent: "",
				},
				{ data: "Species", title: translateWord("table.species") },
			],
			paging: false,
			destroy: true,
			searching: false,
			info: false,
		});
	}
	//Set Click Listeners for Bait Toggles
	if (toggleDiv) {
		toggleDiv.querySelectorAll("button.toggle-vis").forEach((el) => {
			el.onclick = function (e) {
			e.preventDefault();

			let columnIdx = this.getAttribute("data-column");
			if (columnIdx === null) return;
			let column = table.column(columnIdx);
			let nextVisible = !column.visible();

			// Toggle the visibility
			column.visible(nextVisible);
			this.classList.toggle("active", nextVisible);
			this.setAttribute("aria-pressed", nextVisible ? "true" : "false");
		};
		});
	}
	let toggleFable = document.querySelector("#fff" + id);
	$(toggleFable).off("change").on("change", function () {
		var c = !!$(this).prop("checked");
		stopTableUiState.fabledByStop[id] = c;
		applyFabledFocusState(id, c);
	});

	let toggleFableSpec = document.querySelector("#fff" + id + "spec");
	$(toggleFableSpec).off("change").on("change", function () {
		var c = !!$(this).prop("checked");
		stopTableUiState.fabledByStop[id] = c;
		applyFabledFocusState(id, c);
	});

	const tooltipTriggerList = document.querySelectorAll(
		'[data-bs-toggle="tooltip"]'
	);
	const tooltipList = [...tooltipTriggerList]
    .filter(function (el) {
        var title = el.getAttribute("data-bs-title") || el.getAttribute("title");
        return normalizeMaybeNullText(title) !== "";
    })
    .map(function (el) {
        return new bootstrap.Tooltip(el);
    });
	const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	const popoverList = [...popoverTriggerList].map(
		(popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
	);

	if (!specBait) {
		$("#specialBaitToggle" + id + type).addClass("disabled");
		$("#specialBaitToggle" + id + type).attr("disabled", true).attr("tabindex", "-1");
	}

	$("[id^=desttable" + id + type + "]").each(function (index) {
		let column = table.column(6);
		if ($(this).find(".moochIcon").length > 0) {
			column.visible(true);
			$("#moochBaitToggle" + id + type).addClass("active");
			$("#moochBaitToggle" + id + type).removeClass("disabled");
			$("#moochBaitToggle" + id + type).removeAttr("disabled").removeAttr("tabindex");
		} else {
			column.visible(false);
			$("#moochBaitToggle" + id + type).addClass("disabled");
			$("#moochBaitToggle" + id + type).removeClass("active");
			$("#moochBaitToggle" + id + type).attr("disabled", true).attr("tabindex", "-1");
		}
	});

	if (type == "spec") {
		$("[id^=desttable" + id + type + "]").each(function (index) {
			let columnspec = table.column(7);
			var hasSpecialData = false;
			columnspec.data().each(function (val) {
				if (val && val !== "") hasSpecialData = true;
			});
			if (hasSpecialData || specBait) {
				columnspec.visible(true);
				$("#specialBaitToggle" + id + type).addClass("active");
				$("#specialBaitToggle" + id + type).removeClass("disabled");
				$("#specialBaitToggle" + id + type).removeAttr("disabled").removeAttr("tabindex");
			} else {
				$("#specialBaitToggle" + id + type).removeClass("active");
				$("#specialBaitToggle" + id + type).addClass("disabled");
				$("#specialBaitToggle" + id + type).attr("disabled", true).attr("tabindex", "-1");
			}
		});
	}

	if (toggleDiv) {
		toggleDiv.querySelectorAll("button.toggle-vis").forEach((el) => {
			let columnIdx = Number(el.getAttribute("data-column"));
			if (Number.isNaN(columnIdx)) return;

			let isDisabled = el.hasAttribute("disabled") || el.classList.contains("disabled");
			let shouldBeVisible = isDisabled
				? false
				: persistedColumnVisibility[columnIdx] !== undefined
				? persistedColumnVisibility[columnIdx]
				: el.classList.contains("active") || el.getAttribute("aria-pressed") === "true";

			table.column(columnIdx).visible(shouldBeVisible);
			el.classList.toggle("active", shouldBeVisible);
			el.setAttribute("aria-pressed", shouldBeVisible ? "true" : "false");
		});
	}

	let savedSortOrder = stopTableUiState.sortByTable[tableSelector];
	if (Array.isArray(savedSortOrder) && savedSortOrder.length > 0) {
		try {
			table.order(savedSortOrder).draw(false);
		} catch (err) {
			// Ignore invalid saved sort and continue.
		}
	}

	applyFabledFocusState(id, stopTableUiState.fabledByStop[id]);

	if (typeof table.on === "function") {
		table.on("order.dt", function () {
			let nextOrder = table.order();
			if (Array.isArray(nextOrder) && nextOrder.length > 0) {
				stopTableUiState.sortByTable[tableSelector] = nextOrder;
			}
		});

		table.on("draw.dt", function () {
			applyFabledFocusState(id, !!stopTableUiState.fabledByStop[id]);
		});
	}

	tempDataSet = "";
}
function getCurrentLangSafe() {
    if (typeof checkLanguage === "function") return checkLanguage();
    if ($.cookie) return $.cookie("language") || "en";
    return "en";
}