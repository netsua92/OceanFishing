var cleanedDataObj = [];
const cleanedDataObjBK = [];
$(document).ready(function () {
	//generate drop down list
	//document.getElementById("droplist").innerHTML = temptext;

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
	var sheetName = lang === "en" ? "Indigo" : "Indigo-" + lang;

	getSheetData({
		// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
		sheetID: "1AVqIXm7_Ld5LsHY814AB0-6MyEhigg1KtgL-FnpmQ2E",
		// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
		sheetName: sheetName,
		query: "SELECT *",
		callback: function (sheetData) {
			sheetDataHandlerIndigo(sheetData);
			// Signal that sheet data is loaded
			if (typeof ContentReady !== "undefined") {
				ContentReady.sheetDataLoaded();
			}
		},
	});
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
