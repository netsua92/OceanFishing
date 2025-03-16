var cleanedDataObj = [];
const cleanedDataObjBK = [];
var caughtFish = [{}];
var rubyorindigo = "";
$(document).ready(function () {
	$.fn.dataTable.ext.order["dom-checkbox"] = function (settings, col) {
		return this.api()
			.column(col, { order: "index" })
			.nodes()
			.map(function (td, i) {
				return $("input", td).prop("checked") ? "1" : "0";
			});
	};

	if (window.location.href.indexOf("ruby") > -1) {
		rubyorindigo = "ruby";
	} else {
		rubyorindigo = "indigo";
	}

	caughtFish = JSON.parse(localStorage.getItem("caughtFishLS-" + rubyorindigo));
});

function sheetDataHandlerChecklist(sheetData) {
	for (var key in sheetData) {
		var fish = sheetData[key];

		const newFish = {
			Fish: fish.Fish,
			FishImg: "",
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
			Caught: "",
		};

		if (newFish.TimeFrameDay === "" || newFish.TimeFrameDay === "Yes") {
			newFish.TimeFrameDay =
				"<img src='../img/ocDay.png' alt='Day' data-bs-toggle='tooltip' data-bs-title='Catchable during Day'>";
		} else {
			newFish.TimeFrameDay =
				"<img src='../img/ocDay.png' alt='Day' data-bs-toggle='tooltip' data-bs-title='Not Catchable during Day' class='notCatchable'>";
		}
		if (newFish.TimeFrameNight === "" || newFish.TimeFrameNight === "Yes") {
			newFish.TimeFrameNight =
				"<img src='../img/ocNight.png' alt='Night' data-bs-toggle='tooltip' data-bs-title='Catchable during Night'>";
		} else {
			newFish.TimeFrameNight =
				"<img src='../img/ocNight.png' alt='Night' data-bs-toggle='tooltip' data-bs-title='Not Catchable during Night' class='notCatchable'>";
		}
		if (newFish.TimeFrameSunset === "" || newFish.TimeFrameSunset === "Yes") {
			newFish.TimeFrameSunset =
				"<img src='../img/ocSunset.png' alt='Sunset' data-bs-toggle='tooltip' data-bs-title='Catchable during Sunset'>";
		} else {
			newFish.TimeFrameSunset =
				"<img src='../img/ocSunset.png' alt='Sunset' data-bs-toggle='tooltip' data-bs-title='Not Catchable during Sunset' class='notCatchable'>";
		}

		cleanedDataObj.push(newFish);
		cleanedDataObjBK.push(newFish);
	}

	console.log("clean data", cleanedDataObj);
	let newtempDataSet = [];
	cleanedDataObj.forEach(function (row) {
		let temprow;
		if (row.Fish.substring(0, 1) !== "<") {
			temprow = styleRowCL(row);
		} else {
			temprow = row;
		}
		newtempDataSet.push(temprow);
	});

	var table = new DataTable("#checklistTable", {
		data: newtempDataSet,
		columns: [
			{ data: "FishImg", title: "", orderable: false },
			{ data: "Fish", title: "Fish" },
			{ data: "Stop", title: "Location" },
			{ data: "Bait.BestBait", title: "Best Bait", orderable: false },
			{ data: "TimeFrameDay", title: "Day", orderable: false },
			{ data: "TimeFrameNight", title: "Night", orderable: false },
			{ data: "TimeFrameSunset", title: "Sunset", orderable: false },
			{
				data: "Caught",
				orderDataType: "dom-checkbox",
				title: "Caught",
				render: function (data, type, row) {
					if (type === "display") {
						return '<input type="checkbox" class="editor-active caughtFish" data-sort="0">';
					}
					return data;
				},
				className: "dt-body-center",
			},
		],
		paging: false,
		destroy: true,
		searching: false,
		info: false,
	});

	if (caughtFish != null) {
		console.log("loading page, reading in localStorage Fish");
		caughtFish.forEach(function (item) {
			console.log("fish = " + item.Fish + " | Caught : " + item.Caught);
			var tr = $(
				'*[data-bs-title="' + item.Fish.replace(/'/g, "") + '"]'
			).closest("tr");

			tr.children().find("input:checkbox").attr("checked", item.Caught);

			if (item.Caught) {
				tr.addClass("caughtRow");
				tr.addClass("selected");
				tr.children().find("input:checkbox").attr("data-sort", 1);
			} else {
				tr.removeClass("caughtRow");
				tr.removeClass("selected");
				tr.children().find("input:checkbox").attr("data-sort", 0);
			}
		});
	}

	$(".caughtFish").on("click", function (e) {
		var tr = $(this).closest("tr");
		if (this.checked) {
			tr.addClass("caughtRow");
			tr.addClass("selected");
			$(this).attr("data-sort", 1);
		} else {
			tr.removeClass("caughtRow");
			tr.removeClass("selected");
			$(this).attr("data-sort", 0);
		}
		var data = table.cell(tr, 1).node();

		if (caughtFish === null) {
			caughtFish = [
				{
					Fish: data.innerText.split("\n")[0],
					Caught: this.checked,
				},
			];
		} else {
			const elem = caughtFish.find(
				({ Fish }) => Fish === data.innerText.split("\n")[0]
			);

			if (elem) {
				elem.Caught = this.checked;
			} else {
				caughtFish.push({
					Fish: data.innerText.split("\n")[0],
					Caught: this.checked,
				});
			}
		}

		localStorage.setItem(
			"caughtFishLS-" + rubyorindigo,
			JSON.stringify(caughtFish)
		);
	});

	const tooltipTriggerList = document.querySelectorAll(
		'[data-bs-toggle="tooltip"]'
	);
	const tooltipList = [...tooltipTriggerList].map(
		(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
	);
	const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	const popoverList = [...popoverTriggerList].map(
		(popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
	);
	$("#throbber").addClass("importanthide");
}

function styleRowCL(row, id, type) {
	//Best Bait Image
	if (row.Bait.BestBait.substring(0, 2) == "M!") {
		row.Bait.BestBait = row.Bait.BestBait.replace("M!", "");
		row.Bait.BestBait =
			"<img class='iconSmall' src='../img/fish/" +
			row.Bait.BestBait.replace(/'/g, "_") +
			".png' alt='" +
			row.Bait.BestBait +
			"' tabindex='0' data-bs-toggle='tooltip' data-bs-title='" +
			row.Bait.BestBait +
			"' tabindex='0'>";
	} else {
		row.Bait.BestBait =
			"<img class='iconSmall' src='../img/bait/" +
			row.Bait.BestBait.replace(/\s/g, "") +
			".png' alt='" +
			row.Bait.BestBait +
			"' tabindex='0' data-bs-toggle='tooltip' data-bs-title='" +
			row.Bait.BestBait +
			"'>";
	}

	//Fish Data
	if (row.Fish.substring(0, 2) == "M!") {
		//Mooch
		row.Fish = row.Fish.replace("M!", "");
	} else if (row.Fish.substring(0, 2) == "I!") {
		//Intuition Fish
		row.Fish = row.Fish.replace("I!", "");
	} else if (row.Fish.substring(0, 2) == "F!") {
		//Fabled Fish
		row.Fish = row.Fish.replace("F!", "");
	} else if (row.Fish.substring(0, 2) == "T!") {
		//Trigger Fish
		row.Fish = row.Fish.replace("T!", "");
	}

	row.FishImg =
		"<img class='iconSmall' src='../img/fish/" +
		row.Fish.replace(/'/g, "_") +
		".png' alt='" +
		row.Fish +
		"' data-bs-toggle='tooltip' data-bs-title='" +
		row.Fish.replace(/'/g, "") +
		"' tabindex='0'>";

	//Hookset Images
	if (row.Hookset == "Powerful") {
		row.Hookset =
			"<div><img src='../img/Powerful.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Powerful Hookset' tabindex='0'>";
	} else {
		row.Hookset =
			"<div><img src='../img/Precision.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Precision Hookset' tabindex='0'>";
	}

	//Species Images
	switch (row.Species) {
		case "Manta":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/manta_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Manta' tabindex='0'></span>";
			break;
		case "Fugu":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/balloon_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Fugu' tabindex='0'></span>";
			break;
		case "Crab":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/crab_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Crab' tabindex='0'></span>";
			break;
		case "Seadragon":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/dragon_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Dragon' tabindex='0'></span>";
			break;
		case "Jellyfish":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/jelly_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Jellyfish' tabindex='0'></span>";
			break;
		case "Octopus":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/octo_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Octo' tabindex='0'></span>";
			break;
		case "Shark":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/shark_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Shark' tabindex='0'></span>";
			break;
		case "Shellfish":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/mussel_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Shellfish' tabindex='0'></span>";
			break;
		case "Squid":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/squid_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Squid' tabindex='0'></span>";
			break;
		case "Shrimp":
			row.Species =
				"&nbsp;&nbsp;<span class=\" badge speciesbadge rounded-pill\"><img src='../img/shrimp_mark.png' class='iconSmaller' data-bs-toggle='tooltip' data-bs-title='Shrimp' tabindex='0'></span>";
			break;
		default:
			break;
	}

	//Hookset !!! bites
	switch (row.Bite) {
		case "!":
			row.Hookset =
				row.Hookset +
				'  <span class="translate-middle badge bitebadge rounded-pill bg-success">!<span class="visually-hidden"> ! </span></span></div>';
			break;
		case "!!":
			row.Hookset =
				row.Hookset +
				'  <span class="translate-middle badge bitebadge rounded-pill bg-primary">!!<span class="visually-hidden">!!</span></span></div>';
			break;
		default:
			row.Hookset =
				row.Hookset +
				'  <span class="translate-middle badge bitebadge rounded-pill bg-danger">!!!<span class="visually-hidden">!!!</span></span></div>';
			break;
	}
	//TH Scores
	if (typeof row.TH[0] == "string") {
		var tempRange = new splitRange(row.TH[0]);
		var math1 = parseFloat(row.Points) * parseFloat(tempRange[0]);
		var math2 = parseFloat(row.Points) * parseFloat(tempRange[1]);

		row.TH[0] = math1 + " - " + math2 + " (" + row.TH[0] + ")";
		row.TH[1] = math1;
	} else {
		var math = parseFloat(row.TH[0]) * parseFloat(row.Points);
		row.TH[0] = math + " (" + row.TH[0] + ")";
		row.TH[1] = math;
	}

	//DH Scores
	if (typeof row.DH[0] == "string") {
		var tempRange = new splitRange(row.DH[0]);

		var math1 = parseFloat(row.Points) * parseFloat(tempRange[0]);
		var math2 = parseFloat(row.Points) * parseFloat(tempRange[1]);

		row.DH[0] = math1 + " - " + math2 + " (" + row.DH[0] + ")";
		row.DH[1] = math1;
	} else {
		var math = parseFloat(row.DH[0]) * parseFloat(row.Points);
		row.DH[0] = math + " (" + row.DH[0] + ")";
		row.DH[1] = math;
	}

	//Append if Fabled onto points
	if (row.Fabled == "No") {
		row.Bait.BestBait += "<span class='fabled' hidden>FabledTrue</span>";
	}

	//Weather
	var rowWeather = "";
	if (row.Weather.FairSkies !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Fair Skies.png' alt='Fair Skies' data-bs-toggle='tooltip' data-bs-title='Fair Skies' tabindex='0'>";
	}
	if (row.Weather.Clouds !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Clouds.png' alt='Clouds' data-bs-toggle='tooltip' data-bs-title='Clouds' tabindex='0'>";
	}
	if (row.Weather.Fog !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Fog.png' alt='Fog' data-bs-toggle='tooltip' data-bs-title='Fog' tabindex='0'>";
	}
	if (row.Weather.Special1 !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special1Type +
			".png' alt='" +
			row.Weather.Special1Type +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.Weather.Special1Type +
			"' tabindex='0'>";
	}
	if (row.Weather.Special2 !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special2Type +
			".png' alt='" +
			row.Weather.Special2Type +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.Weather.Special2Type +
			"' tabindex='0'>";
	}
	if (row.Weather.Special3 == "No") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special3Type +
			".png' alt='" +
			row.Weather.Special3Type +
			"' data-bs-toggle='tooltip' data-bs-title='" +
			row.Weather.Special3Type +
			"' tabindex='0'>";
	}
	if (row.Weather.ClearSkies !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Clear Skies.png' alt='Clear Skies' data-bs-toggle='tooltip' data-bs-title='Clear Skies' tabindex='0'>";
	}
	if (rowWeather == "") {
		row.ClearSkies = "Any";
	} else {
		row.ClearSkies = "Not " + rowWeather;
	}

	return row;
}
