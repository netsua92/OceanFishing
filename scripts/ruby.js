var cleanedDataObj = [];
const cleanedDataObjBK = [];
$(document).ready(function () {
	var lang = $.cookie("language");
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

	var rubysheetname = "Ruby";
	if (lang != "en") {
		rubysheetname = "Ruby-" + lang;
	}

	getSheetData({
		// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
		sheetID: "1AVqIXm7_Ld5LsHY814AB0-6MyEhigg1KtgL-FnpmQ2E",
		// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
		sheetName: rubysheetname,
		query: "SELECT *",
		callback: function (sheetData) {
			sheetDataHandlerRuby(sheetData);
			// Signal that sheet data is loaded
			if (typeof ContentReady !== "undefined") {
				ContentReady.sheetDataLoaded();
			}
		},
	});
});
