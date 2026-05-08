// Accessibility: keyboard navigation for table rows
// - Arrow Up/Down moves focus between rows
// - Escape on tabs un-focuses the tab and returns to boat table.
// - Escape on table rows un-focuses the row and allows normal arrow key functionality
$(document).ready(function () {
	function setActiveChecklistRow($row) {
		if (!$row || !$row.length) {
			return;
		}
		if (!$row.attr("tabindex")) {
			$row.attr("tabindex", "0");
		}
		var $tbody = $row.closest("tbody");
		$tbody.find("tr.activeRow").removeClass("activeRow");
		$row.addClass("activeRow");
	}

	function getVisibleRows($row) {
		var $rows = $row.closest("tbody").find("tr:visible");
		$rows.each(function () {
			if (!this.hasAttribute("tabindex")) {
				this.setAttribute("tabindex", "0");
			}
		});
		return $rows;
	}

	$(document).on("keydown", ".stopsRow, #boatSchedule tbody tr, [id*='desttable'] tbody tr, [id$='ChecklistTable'] tbody tr", function (e) {
		var $row = $(this);
		var $rows = getVisibleRows($row);
		var currentIndex = $rows.index($row);
		if ($row.closest("[id$='ChecklistTable']").length) {
			setActiveChecklistRow($row);
		}

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				if (currentIndex < $rows.length - 1) {
					var $next = $rows.eq(currentIndex + 1);
					if ($next.closest("[id$='ChecklistTable']").length) {
						setActiveChecklistRow($next);
					}
					$next[0].focus({ preventScroll: true });
					$next[0].scrollIntoView({ behavior: "smooth", block: "center" });
				} else {
					// Last visible row: focus first focusable element after the tbody
					var tbody = $row.closest("tbody")[0];
					var table = tbody.closest("table");
					var allFocusable = Array.from(document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
					for (var i = 0; i < allFocusable.length; i++) {
						if (table.contains(allFocusable[i])) continue;
						if (allFocusable[i].compareDocumentPosition(table) & Node.DOCUMENT_POSITION_PRECEDING) {
							allFocusable[i].focus({ preventScroll: true });
							allFocusable[i].scrollIntoView({ behavior: "smooth", block: "center" });
							break;
						}
					}
				}
				break;
			case "ArrowUp":
				e.preventDefault();
				if (currentIndex > 0) {
					var $prev = $rows.eq(currentIndex - 1);
					if ($prev.closest("[id$='ChecklistTable']").length) {
						setActiveChecklistRow($prev);
					}
					$prev[0].focus({ preventScroll: true });
					$prev[0].scrollIntoView({ behavior: "smooth", block: "center" });
				} else {
					// At the first row, focus the table header row
					var $thead = $row.closest("table").find("thead tr").first();
					if ($thead.length) {
						if (!$thead.attr("tabindex")) {
							$thead.attr("tabindex", "-1");
						}
						$thead[0].focus({ preventScroll: true });
						$thead[0].scrollIntoView({ behavior: "smooth", block: "center" });
					}
				}
				break;
			case "Escape":
				e.preventDefault();
				if ($row.closest("[id$='ChecklistTable']").length) {
					$row.removeClass("activeRow");
				}
				$row.blur();
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if ($row.closest("[id$='ChecklistTable']").length) {
					setActiveChecklistRow($row);
					var $firstFocusableInRow = $row
						.find("input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])")
						.first();
					if ($firstFocusableInRow.length) {
						$firstFocusableInRow[0].focus({ preventScroll: true });
					}
					break;
				}
				$row.click();
				// When activating a route row, scroll to and focus the first dest tab
				if ($row.hasClass("stopsRow")) {
					var target = document.getElementById("myTabRow");
					if (target) {
						target.scrollIntoView({ behavior: "smooth", block: "start" });
					}
					var $activeTab = $("#myTab .nav-link.active");
					if ($activeTab.length) {
						setTimeout(function () {
							$activeTab[0].focus({ preventScroll: true });
						}, 500);
					}
				}
				break;
		}
	});

	// If focus is on any checklist row item, move focus to its row for consistent arrow navigation.
	$(document).on("keydown", "[id$='ChecklistTable'] tbody tr a[href], [id$='ChecklistTable'] tbody tr button:not([disabled]), [id$='ChecklistTable'] tbody tr input:not([disabled]), [id$='ChecklistTable'] tbody tr select:not([disabled]), [id$='ChecklistTable'] tbody tr textarea:not([disabled]), [id$='ChecklistTable'] tbody tr [tabindex]:not([tabindex='-1'])", function (e) {
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
			return;
		}

		e.preventDefault();
		var $row = $(this).closest("tr");
		if (!$row.length) {
			return;
		}
		if (!$row.attr("tabindex")) {
			$row.attr("tabindex", "0");
		}
		setActiveChecklistRow($row);
		$row[0].focus({ preventScroll: true });
		$row.trigger($.Event("keydown", { key: e.key }));
	});

	// Keep checklist row active state in sync with focus.
	$(document).on("focusin", "[id$='ChecklistTable'] tbody tr, [id$='ChecklistTable'] tbody tr *", function () {
		var $row = $(this).closest("tr");
		if ($row.length) {
			if (!$row.attr("tabindex")) {
				$row.attr("tabindex", "0");
			}
			setActiveChecklistRow($row);
		}
	});

	// Allow pressing ArrowDown on thead tr to focus the first tbody row
	// Allow pressing ArrowUp on thead tr to focus the first focusable element above
	$(document).on("keydown", "thead tr", function (e) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			var $firstRow = $(this).closest("table").find("tbody tr:visible").first();
			if ($firstRow.length) {
				if (!$firstRow.attr("tabindex")) {
					$firstRow.attr("tabindex", "0");
				}
				$firstRow[0].focus({ preventScroll: true });
				$firstRow[0].scrollIntoView({ behavior: "smooth", block: "center" });
			}
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			var table = $(this).closest("table")[0];
			var allFocusable = Array.from(document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
			// Find the last focusable element that comes before the table in DOM order
			var target = null;
			for (var i = allFocusable.length - 1; i >= 0; i--) {
				if (table.contains(allFocusable[i])) continue;
				if (allFocusable[i].compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING) {
					target = allFocusable[i];
					break;
				}
			}
			if (target) {
				target.focus({ preventScroll: true });
				target.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		}
	});

	// Escape on dest tabs returns focus to the active boat row
	$(document).on("keydown", "#myTab .nav-link", function (e) {
		if (e.key === "Escape") {
			e.preventDefault();
			var $activeRow = $("#boatSchedule tbody tr.activeRow");
			if ($activeRow.length) {
				$activeRow[0].scrollIntoView({ behavior: "smooth", block: "center" });
				setTimeout(function () {
					$activeRow[0].focus({ preventScroll: true });
				}, 500);
			}
		}
	});

	// Make boatSchedule, desttable, and checklist rows focusable after DataTables renders them
	var observer = new MutationObserver(function () {
		$("#boatSchedule tbody tr, [id*='desttable'] tbody tr, [id$='ChecklistTable'] tbody tr").each(function () {
			if (!this.hasAttribute("tabindex")) {
				$(this).attr("tabindex", "0");
			}
		});
	});

	var scheduleTable = document.getElementById("boatSchedule");
	if (scheduleTable) {
		observer.observe(scheduleTable, { childList: true, subtree: true });
	}

	// Observe all desttable containers for dynamically rendered rows
	$("[id*='desttable']").each(function () {
		observer.observe(this, { childList: true, subtree: true });
	});

	// Observe combined checklist tables for dynamically rendered rows
	$("#rubyChecklistTable, #indigoChecklistTable").each(function () {
		observer.observe(this, { childList: true, subtree: true });
	});
});
