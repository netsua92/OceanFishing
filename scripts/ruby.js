var cleanedDataObj = [];
const cleanedDataObjBK = [];
$(document).ready(function () {
	//generate drop down list
	var temptext = '<label for="routeNumber">Route: </label>';
	temptext += '<select id="routeNumber">';
	for (var i = 0; i < routeNames.length; i++) {
		temptext += "<option value=" + (i + 1) + ">" + routeNames[i] + "</option>";
	}
	temptext += "</select><br>";
	document.getElementById("droplist").innerHTML = temptext;

	getSheetData({
		// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
		sheetID: "1AVqIXm7_Ld5LsHY814AB0-6MyEhigg1KtgL-FnpmQ2E",
		// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
		sheetName: "Ruby",
		query: "SELECT *",
		callback: sheetDataHandlerRuby,
	});
});
