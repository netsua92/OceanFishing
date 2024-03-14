var svgMoon =
	'<svg width="32" height="32" aria-label="Night" class="svgColor"><path d="M 14 3 A 12 12 0 1 1 3 18 A 9 9 0 1 0 14 3 Z"></path></svg>';
var svgSun =
	'<svg width="32" height="32" aria-label="Day" class="svgColor"><circle cx="16" cy="16" r="8"></circle><path d="M 26.84 17.89 L 29.86 21.74 L 25 22.33 Z"></path><path d="M 22.33 25 L 21.74 29.86 L 17.89 26.84 Z"></path><path d="M 14.11 26.84 L 10.26 29.86 L 9.67 25 Z"></path><path d="M 7 22.33 L 2.14 21.74 L 5.16 17.89 Z"></path><path d="M 5.16 14.11 L 2.14 10.26 L 7 9.67 Z"></path><path d="M 9.67 7 L 10.26 2.14 L 14.11 5.16 Z"></path><path d="M 17.89 5.16 L 21.74 2.14 L 22.33 7 Z"></path><path d="M 25 9.67 L 29.86 10.26 L 26.84 14.11 Z"></path></svg>';
var svgSunset =
	'<svg width="32" height="32" aria-label="Sunset" class="svgColor"><path d="M 29 22 A 10.4 10.4 0 1 0 10 22 Z"></path><path d="M 2 28 L 2 24 L 30 24 L 30 28 Z"></path></svg>';

var imgNight = "<img src='../img/ocNight.png' alt='Night' class='svgColor'>";
var imgDay = "<img src='../img/ocDay.png' alt='Day' class='svgColor'>";
var imgSunset = "<img src='../img/ocSunset.png' alt='Sunset' class='svgColor'>";

let specialBait = "Special Bait";
let SpecialBaitStripped = "SpecialBait";
let mooch = false;

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
function destroyTables() {
	/*if ($.fn.dataTable.isDataTable("#desttable1reg")) {
		$("#desttable1reg").DataTable().destroy();
		$("#desttable1reg").empty();
	}
	var table1spec = new DataTable("#desttable1spec");
	var table2reg = new DataTable("#desttable2reg");
	var table2spec = new DataTable("#desttable2spec");
	var table3reg = new DataTable("#desttable3reg");
	var table3spec = new DataTable("#desttable3spec");
	table1spec.clear().destroy();
	table2reg.clear().destroy();
	table2spec.clear().destroy();
	table3reg.clear().destroy();
	table3spec.clear().destroy(); 

	$("#desttable1regContainer").html(
		'<table id="desttable1reg" class="table-striped table table-hover"></table>'
	);
	$("#desttable1specContainer").html(
		'<table id="desttable1spec" class="table-striped table table-hover"></table>'
	);
	$("#desttable2regContainer").html(
		'<table id="desttable2reg" class="table-striped table table-hover"></table>'
	);
	$("#desttable2specContainer").html(
		'<table id="desttable2spec" class="table-striped table table-hover"></table>'
	);
	$("#desttable3regContainer").html(
		'<table id="desttable3reg" class="table-striped table table-hover"></table>'
	);
	$("#desttable3specContainer").html(
		'<table id="desttable3spec" class="table-striped table table-hover"></table>'
	);*/
}

function remakeTables() {
	/*$("#desttable1regContainer").html(
		'<table id="desttable1reg" class="table-striped table table-hover"></table>'
	);
	$("#desttable1specContainer").html(
		'<table id="desttable1spec" class="table-striped table table-hover"></table>'
	);
	$("#desttable2regContainer").html(
		'<table id="desttable2reg" class="table-striped table table-hover"></table>'
	);
	$("#desttable2specContainer").html(
		'<table id="desttable2spec" class="table-striped table table-hover"></table>'
	);
	$("#desttable3regContainer").html(
		'<table id="desttable3reg" class="table-striped table table-hover"></table>'
	);
	$("#desttable3specContainer").html(
		'<table id="desttable3spec" class="table-striped table table-hover"></table>'
	); */
}

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
	if (rangeString != "" || rangeString != null) {
		var f = rangeString.split("-");

		if (f[0] != "") {
			x1 = parseFloat(f[0]);
			y1 = parseFloat(f[1]);
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

function styleRow(row, id, type) {
	//Best Bait Image
	if (row.Bait.BestBait.substring(0, 2) == "M!") {
		row.Bait.BestBait = row.Bait.BestBait.replace("M!", "");
		row.Bait.BestBait =
			"<img class='iconSmall' src='../img/fish/" +
			row.Bait.BestBait.replace(/'/g, "_") +
			".png' alt='" +
			row.Bait.BestBait +
			"' tabindex='0' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Bait.BestBait +
			"' tabindex='0'>";
	} else {
		row.Bait.BestBait =
			"<img class='iconSmall' src='../img/bait/" +
			row.Bait.BestBait.replace(/\s/g, "") +
			".png' alt='" +
			row.Bait.BestBait +
			"' tabindex='0' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Bait.BestBait +
			"'>";
	}

	//Fish Data
	if (row.Fish.substring(0, 2) == "M!") {
		//Mooch
		row.Fish = row.Fish.replace("M!", "");
		row.Fish =
			"<div class='row'><div class='col-3'><img class='iconSmall' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.Fish +
			"' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Fish.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.Fish +
			"</span>" +
			addStars(row.Stars) +
			"<img src='../img/bait/Mooch.png' class='iconMini'> " +
			"</div></div>";
	} else if (row.Fish.substring(0, 2) == "I!") {
		//Intuition Fish
		row.Fish = row.Fish.replace("I!", "");
		row.Fish =
			"<div class='row'><div class='col-3'><img class='iconSmall' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.Fish +
			"' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Fish.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.Fish +
			"</span>" +
			addStars(row.Stars) +
			'<br/><img src="../img/Intuition.png" class="iconMini" alt="Intuition"> ' +
			row.Intuition +
			"</div></div>";
	} else {
		row.Fish =
			"<div class='row'><div class='col-3'><img class='iconSmall' src='../img/fish/" +
			row.Fish.replace(/'/g, "_") +
			".png' alt='" +
			row.Fish +
			"' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Fish.replace(/'/g, "") +
			"' tabindex='0'></div><div class='col d-none d-lg-block'><span class='d-none d-lg-block'>" +
			row.Fish +
			"</span>" +
			addStars(row.Stars) +
			"</div></div>";
	}

	//Hookset Images
	if (row.Hookset == "Powerful") {
		row.Hookset =
			"<div><img src='../img/Powerful.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Powerful Hookset' tabindex='0'>";
	} else {
		row.Hookset =
			"<div><img src='../img/Precision.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Precision Hookset' tabindex='0'>";
	}

	//Species Images
	switch (row.Species) {
		case "Manta":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/manta_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Manta' tabindex='0'>";
			break;
		case "Fugu":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/balloon_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Fugu' tabindex='0'>";
			break;
		case "Crab":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/crab_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Crab' tabindex='0'>";
			break;
		case "Seadragon":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/dragon_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Dragon' tabindex='0'>";
			break;
		case "Jellyfish":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/jelly_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Jelly' tabindex='0'>";
			break;
		case "Octopus":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/octo_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Octo' tabindex='0'>";
			break;
		case "Shark":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/shark_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Shark' tabindex='0'>";
			break;
		case "Shellfish":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/mussel_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Shellfish' tabindex='0'>";
			break;
		case "Squid":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/squid_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Squid' tabindex='0'>";
			break;
		case "Shrimp":
			row.Species =
				"&nbsp;&nbsp;<img src='../img/shrimp_mark.png' class='iconSmaller' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Shrimp' tabindex='0'>";
			break;
		default:
			break;
	}

	//Hookset !!! bites
	switch (row.Bite) {
		case "!":
			row.Hookset =
				row.Hookset +
				'  <span class="translate-middle badge rounded-pill bg-success">!<span class="visually-hidden"> ! </span></span></div>';
			break;
		case "!!":
			row.Hookset =
				row.Hookset +
				'  <span class="translate-middle badge rounded-pill bg-primary">!!<span class="visually-hidden">!!</span></span></div>';
			break;
		default:
			row.Hookset =
				row.Hookset +
				'  <span class="translate-middle badge rounded-pill bg-danger">!!!<span class="visually-hidden">!!!</span></span></div>';
			break;
	}
	//TH Scores
	if (typeof row.TH[0] == "string") {
		var tempRange = new splitRange(row.TH[0]);
		row.TH[0] =
			row.TH[0] +
			" (" +
			parseFloat(row.Points) * parseFloat(tempRange[0]) +
			" - " +
			parseFloat(row.Points) * parseFloat(tempRange[1]) +
			")";
	} else {
		row.TH[0] = row.TH[0] + " (" + row.TH[0] * parseFloat(row.Points) + ")";
	}

	//DH Scores
	if (typeof row.DH[0] == "string") {
		var tempRange = new splitRange(row.DH[0]);
		row.DH[0] =
			row.DH[0] +
			" (" +
			parseFloat(row.Points) * parseFloat(tempRange[0]) +
			" - " +
			parseFloat(row.Points) * parseFloat(tempRange[1]) +
			")";
	} else {
		row.DH[0] = row.DH[0] + " (" + row.DH[0] * parseFloat(row.Points) + ")";
	}

	//Append if Fabled onto points
	if (row.Fabled == "No") {
		row.Bait.BestBait +=
			"<span class='fabled" + id + "' hidden>FabledTrue</span>";
	}

	//Weather
	var rowWeather = "";
	if (row.Weather.FairSkies !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Fair Skies.png' alt='Fair Skies' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Fair Skies' tabindex='0'>";
	}
	if (row.Weather.Clouds !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Clouds.png' alt='Clouds' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Clouds' tabindex='0'>";
	}
	if (row.Weather.Fog !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Fog.png' alt='Fog' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Fog' tabindex='0'>";
	}
	if (row.Weather.Special1 !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special1Type +
			".png' alt='" +
			row.Weather.Special1Type +
			"' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Weather.Special1Type +
			"' tabindex='0'>";
	}
	if (row.Weather.Special2 !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special2Type +
			".png' alt='" +
			row.Weather.Special2Type +
			"' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Weather.Special2Type +
			"' tabindex='0'>";
	}
	if (row.Weather.Special3 == "No") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/" +
			row.Weather.Special3Type +
			".png' alt='" +
			row.Weather.Special3Type +
			"' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='" +
			row.Weather.Special3Type +
			"' tabindex='0'>";
	}
	if (row.Weather.ClearSkies !== "Yes") {
		rowWeather +=
			"<img class='iconMini' src='../img/Weather/Clear Skies.png' alt='Clear Skies' data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='Clear Skies' tabindex='0'>";
	}
	if (rowWeather == "") {
		row.ClearSkies = "Any";
	} else {
		row.ClearSkies = "Not " + rowWeather;
	}

	return row;
}

function makeStopTable(tempDataSet, type, id, time, route) {
	let newtempDataSet = [];
	//tempDataSet = { ...tempDataSettemp };

	tempDataSet.forEach(function (row) {
		//Set Special Bait text to what the special bait is
		if (type == "spec") {
			if (row.Bait.SpecialType != "") {
				specialBait = row.Bait.SpecialType;
				SpecialBaitStripped = row.Bait.SpecialType.replace(/\s/g, "");
				$("#specialBaitToggle" + id + type).html(specialBait);
			} else {
				specialBait = "Special Bait";
				SpecialBaitStripped = "SpecialBait";
				$("#specialBaitToggle" + id + type).html(specialBait);
				$("#specialBaitToggle" + id + type).addClass("disabled");
			}
		}

		//Disable Mooch if no Mooch
		if (row.Bait.MoochType != "") {
			mooch = true;
		}

		let temprow;
		if (row.Fish.substring(0, 1) !== "<") {
			temprow = styleRow(row, id, type);
		} else {
			temprow = row;
		}
		newtempDataSet.push(temprow);
	});

	var table;

	if (type == "spec") {
		//Make Table
		table = new DataTable("#desttable" + id + type, {
			data: newtempDataSet,
			columns: [
				{ data: { _: "Fish", type: "Fish", sort: "Stars" }, title: "Fish" },
				{ data: "Hookset", title: "Hook" },
				{ data: "Bait.BestBait", title: "Best Bait" },
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
				{ data: "Points", title: "Points" },
				{
					data: {
						_: "DH.0",
						type: "DH.1",
						sort: "DH.1",
					},
					title: "DH",
				},
				{
					data: {
						_: "TH.0",
						type: "TH.1",
						sort: "TH.1",
					},
					title: "TH",
				},
				{ data: "Species", title: "Species" },
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
				{ data: { _: "Fish", type: "Fish", sort: "Stars" }, title: "Fish" },
				{ data: "Hookset", title: "Hook" },
				{ data: "Bait.BestBait", title: "Best Bait" },
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
				{ data: "Points", title: "Points" },
				{
					data: {
						_: "DH.0",
						type: "DH.1",
						sort: "DH.1",
					},
					title: "DH",
				},
				{
					data: {
						_: "TH.0",
						type: "TH.1",
						sort: "TH.1",
					},
					title: "TH",
				},
				{
					data: "ClearSkies",
					title: "Weather",
				},
				{ data: "Species", title: "Species" },
			],
			paging: false,
			destroy: true,
			searching: false,
			info: false,
		});
	}
	//Set Click Listeners for Bait Toggles
	let toggleDiv = document.querySelector("#Toggles" + id + type);

	toggleDiv.querySelectorAll("button.toggle-vis").forEach((el) => {
		el.addEventListener("click", function (e) {
			e.preventDefault();

			let columnIdx = e.target.getAttribute("data-column");
			let column = table.column(columnIdx);

			// Toggle the visibility
			column.visible(!column.visible());
		});
	});
	let toggleFable = document.querySelector("#fff" + id);
	$(toggleFable).on("change", function (event, state) {
		$("[id^=desttable" + id + "]").each(function (index) {
			$(".fabled" + id).each(function () {
				// .each to loop through elements
				if (toggleFable.checked) {
					$(this).closest("tr").hide();
					$(this).closest("table").removeClass("table-striped");
				} else {
					$(this).closest("tr").show();
					$(this).closest("table").addClass("table-striped");
				}
			});
		});
	});

	if (!mooch) {
		$("#moochBaitToggle" + id + type).addClass("disabled");
	}

	const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	const popoverList = [...popoverTriggerList].map(
		(popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
	);
	tempDataSet = "";
}
