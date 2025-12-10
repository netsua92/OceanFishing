$(document).ready(function () {
	// Use absolute paths so loading works from any page depth
	$("#header").load("/header.html", function () {
		// After header loaded, load footer then ensure locale scripts are loaded and executed
		$("footer").load("/footer.html", function () {
			// Load locale utility first, then localize (absolute paths)
			$.getScript("/scripts/localeUtil.js?v=1").done(function () {
				$.getScript("/scripts/localize.js?v=2");
			});
		});

		// Load navbar after header (so IDs exist or path resolution is consistent)
		$("#navbar").load("/navbar.html", function () {
			// Use window.location.pathname to get just the path part (no protocol/host)
			var pathname = window.location.pathname;
			var pathSegments = pathname.split("/").filter(function (s) {
				return s;
			}); // remove empty segments

			// Get the folder name: if last segment is "index.html", use the one before it, otherwise use the last one
			var part;
			if (pathSegments[pathSegments.length - 1] === "index.html") {
				part = pathSegments[pathSegments.length - 2];
			} else {
				part = pathSegments[pathSegments.length - 1];
			}

			// If no part found or it's empty, we're at root (home)
			if (part == "" || part == null) part = "home";
			// Append "Nav" to create the nav ID
			var navId = part + "Nav";
			// DEBUG: Log for verification
			console.log(
				"Current page part: " + part + ", Looking for nav ID: " + navId
			);
			console.log(
				"All nav items on page:",
				$(".nav-link")
					.map(function () {
						return this.id;
					})
					.get()
			);
			// Try to set active on the matching nav item
			var navItem = $("#" + navId);
			console.log("Found nav item?", navItem.length > 0);
			if (navItem.length > 0) {
				navItem.addClass("active");
				navItem.attr("aria-current", "page");
				console.log("Added active class to:", navId);
			} else {
				console.log("Nav item not found for ID:", navId);
			}
		});
	});
});
