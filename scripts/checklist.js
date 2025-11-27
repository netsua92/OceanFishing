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
			Routes: {
				Route1: strToBool(fish.Route1),
				Route2: strToBool(fish.Route2),
				Route3: strToBool(fish.Route3),
				Route4: strToBool(fish.Route4),
				Route5: strToBool(fish.Route5),
				Route6: strToBool(fish.Route6),
				Route7: strToBool(fish.Route7),
				Route8: strToBool(fish.Route8),
				Route9: strToBool(fish.Route9),
				Route10: strToBool(fish.Route10),
				Route11: strToBool(fish.Route11),
				Route12: strToBool(fish.Route12),
			},
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
		//console.log("loading page, reading in localStorage Fish");
		caughtFish.forEach(function (item) {
			//console.log("fish = " + item.Fish + " | Caught : " + item.Caught);
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

		const elem = caughtFish.find(
			({ Fish }) => Fish === data.innerText.split("\n")[0]
		);

		if (elem) {
			elem.Caught = this.checked;
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

	if (caughtFish === null) {
		caughtFish = [
			{
				Fish: row.Fish,
				Caught: false,
				Routes: row.Routes,
			},
		];
	} else {
		const elem = caughtFish.find(({ Fish }) => Fish === row.Fish);

		if (!elem) {
			caughtFish.push({
				Fish: row.Fish,
				Caught: false,
				Routes: row.Routes,
			});
		}
	}

	localStorage.setItem(
		"caughtFishLS-" + rubyorindigo,
		JSON.stringify(caughtFish)
	);

	return row;
}

function strToBool(input) {
	input = input === "Yes";
	return input;
}
