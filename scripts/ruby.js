var cleanedDataObj = [];
const cleanedDataObjBK = [];
$(document).ready(function () {

	$("#boatscheduletoggle").on("click", function () {
		$("#boatSchedule>tbody>tr").each(function (index) {
			if (!$(this).hasClass("activeRow")) {
				$(this).toggle();
			}
		});

		if ($(this).hasClass("active")) {
			$("#boatscheduletoggle").removeClass("active");
		} else {
			$("#boatscheduletoggle").addClass("active");
		}
	});


	var lang = resolveLang();
	var langCode = (lang || "en").toUpperCase(); // EN, FR, JP, DE
	var csvUrl = "/fishdata/ruby-" + langCode + ".csv";

	fetch(csvUrl)
		.then(function (res) {
			if (!res.ok) {
				throw new Error("Failed to load CSV: " + res.status + " " + csvUrl);
			}
			return res.text();
		})
		.then(function (csvText) {
			var sheetData = csvToObjects(csvText);
			pendingSheetData = sheetData;
			tryInitRubyTable();
		})
		.catch(function (err) {
			console.error("Ruby CSV load error:", err);
			// Optional fallback so page doesn't stay in loading state forever
			if (typeof ContentReady !== "undefined") {
				ContentReady.sheetDataLoaded();
			}
		});


	/*
	   getSheetData({
		   // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
		   sheetID: "1AVqIXm7_Ld5LsHY814AB0-6MyEhigg1KtgL-FnpmQ2E",
		   // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
		   sheetName: sheetName,
		   query: "SELECT *",
		   callback: function (sheetData) {
			   sheetDataHandlerRuby(sheetData);
			   // Signal that sheet data is loaded
			   if (typeof ContentReady !== "undefined") {
				   ContentReady.sheetDataLoaded();
			   }
		   },
	   }); 
	   */
});

function resolveLang() {
	var lang = $.cookie("language");
	if (!lang) {
		var raw =
			(window.localeUtil && window.localeUtil.getUserLocale
				? window.localeUtil.getUserLocale()
				: (navigator.language || "en")
			).split("-")[0].toLowerCase();
		lang = ["en", "fr", "jp", "de"].includes(raw) ? raw : "en";
		$.cookie("language", lang, { path: "/" });
	}
	return lang;
}

function csvToObjects(csvText) {
	// Normalize newlines + remove UTF-8 BOM if present
	csvText = csvText.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

	var lines = csvText.split("\n").filter(function (line) {
		return line.trim() !== "";
	});

	if (lines.length === 0) return [];

	var headers = parseCsvLine(lines[0]);
	var rows = [];

	for (var i = 1; i < lines.length; i++) {
		var values = parseCsvLine(lines[i]);
		var obj = {};

		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = values[j] !== undefined ? values[j] : "";
		}

		rows.push(obj);
	}

	return rows;
}

function parseCsvLine(line) {
	var out = [];
	var cur = "";
	var inQuotes = false;

	for (var i = 0; i < line.length; i++) {
		var ch = line[i];

		if (ch === '"') {
			// Escaped quote ("")
			if (inQuotes && line[i + 1] === '"') {
				cur += '"';
				i++;
			} else {
				inQuotes = !inQuotes;
			}
		} else if (ch === "," && !inQuotes) {
			out.push(cur);
			cur = "";
		} else {
			cur += ch;
		}
	}

	out.push(cur);
	return out;
}

var pendingSheetData = null;
var translationsReady = false;

function isTranslationsReady() {
	return (
		typeof translateWord === "function" &&
		translateWord("table.dhyield") !== "table.dhyield"
	);
}

function tryInitRubyTable() {
	if (!pendingSheetData) return;
	if (!translationsReady && !isTranslationsReady()) return;

	sheetDataHandlerRuby(pendingSheetData);
	pendingSheetData = null;

	if (typeof ContentReady !== "undefined") {
		ContentReady.sheetDataLoaded();
	}
}

$(document).one("translationsLoaded", function () {
	translationsReady = true;
	tryInitRubyTable();
});