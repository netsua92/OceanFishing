$(document).ready(function () {
	$("#navbar").load("/navbar.html", function () {
		var currentURL = document.URL;
		var part = currentURL.split("/")[3];
		if (part == "" || part == null || part == "index.html") part = "home";
		$("#" + part + "Nav").addClass("active");
		$("#" + part + "Nav").attr("aria-current", "page");
		console.log("#" + part + "nav");
	});
});
