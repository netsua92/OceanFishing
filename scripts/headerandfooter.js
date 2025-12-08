$(document).ready(function () {
	// Use absolute paths so loading works from any page depth
	$("#header").load("/header.html", function () {
		// After header loaded, load footer then ensure locale scripts are loaded and executed
		$("footer").load("/footer.html", function () {
			// Load locale utility first, then localize (absolute paths)
			$.getScript("/scripts/localeUtil.js?v=1").done(function () {
				$.getScript("/scripts/localize.js?v=1");
			});
		});

		// Load navbar after header (so IDs exist or path resolution is consistent)
		$("#navbar").load("/navbar.html", function () {
			var currentURL = document.URL;
			var part = currentURL.split("/")[3];
			if (part == "" || part == null || part == "index.html") part = "home";
			$("#" + part + "Nav").addClass("active");
			$("#" + part + "Nav").attr("aria-current", "page");
		});
	});
});
