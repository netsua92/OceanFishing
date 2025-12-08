var translations = {};

$(document).ready(function () {
	localizePage();

	// Bind language switcher, with MutationObserver fallback if element isn't present yet
	bindLanguageSwitcher();
});

function bindLanguageSwitcher() {
	function attach() {
		if ($("#languageSwitcher").length === 0) return false;

		// detach any previous handlers then attach
		$("#languageSwitcher").off("click.languageSwitcher", "button");
		$("#languageSwitcher").on("click.languageSwitcher", "button", function () {
			var languageValue = $(this).attr("data-language-value");

			// Remove active class and set aria-pressed to false for all buttons
			$("#languageSwitcher button")
				.removeClass("active")
				.attr("aria-pressed", "false");

			// Add active class and set aria-pressed to true for clicked button
			$(this).addClass("active").attr("aria-pressed", "true");

			$.cookie("language", languageValue, { path: "/" });
			localizePage();
			location.reload();
		});

		// ensure language button state reflects cookie/current language
		checkLanguage();

		return true;
	}

	if (attach()) return;

	// Fallback: observe DOM for languageSwitcher insertion
	var observer = new MutationObserver(function (mutations, obs) {
		if (attach()) {
			obs.disconnect();
		}
	});

	observer.observe(document.documentElement || document.body, {
		childList: true,
		subtree: true,
	});
}

// Document-level fallback in case delegated handler doesn't fire (e.g., due to event reparenting)
$(document).on("click.localizeFallback", "[data-language-value]", function (e) {
	var $btn = $(this);
	if ($btn.closest("#languageSwitcher").length === 0) return; // only handle buttons inside the switcher
	var languageValue = $btn.attr("data-language-value");
	$("#languageSwitcher button")
		.removeClass("active")
		.attr("aria-pressed", "false");
	$btn.addClass("active").attr("aria-pressed", "true");
	$.cookie("language", languageValue, { path: "/" });
	localizePage();
	location.reload();
});

// Native capture-phase listener to catch clicks before Bootstrap dropdown suppresses them
document.addEventListener(
	"click",
	function captureLanguageClick(e) {
		var target = e.target;
		// Walk up the DOM to find a button with data-language-value inside #languageSwitcher
		while (target && target !== document) {
			if (target.hasAttribute && target.hasAttribute("data-language-value")) {
				var switcher = target.closest("#languageSwitcher");
				if (switcher) {
					var languageValue = target.getAttribute("data-language-value");

					// Prevent default and stop propagation
					e.preventDefault();
					e.stopPropagation();

					// Update button states
					var allButtons = switcher.querySelectorAll("button");
					allButtons.forEach(function (btn) {
						btn.classList.remove("active");
						btn.setAttribute("aria-pressed", "false");
					});
					target.classList.add("active");
					target.setAttribute("aria-pressed", "true");

					// Set cookie and reload
					$.cookie("language", languageValue, { path: "/" });
					localizePage();
					location.reload();
					return;
				}
			}
			target = target.parentElement;
		}
	},
	true
);

function localizePage() {
	var userLang = checkLanguage();

	$.getJSON("../locales/translation-" + userLang + ".json", function (data) {
		translations = data;
		$("[data-localize]").each(function () {
			var key = $(this).attr("data-localize");
			//console.log(key);
			$(this).html(data[key]);
		});

		// Notify other scripts that translations are loaded
		try {
			$(document).trigger("translationsLoaded");
		} catch (e) {
			// ignore
		}
	});

	$.cookie("language", userLang, { path: "/" });
}

function translateWord(wordKey) {
	if (translations && translations[wordKey] !== undefined) {
		return translations[wordKey];
	}
	return wordKey;
}

function checkCookie(cookieName) {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		if (cookies[i].trim().startsWith(cookieName + "=")) {
			return true; // Cookie exists
		}
	}
	return false; // Cookie does not exist
}

function checkLanguage() {
	if (checkCookie("language")) {
		userLang = $.cookie("language");
	} else {
		userLang =
			navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0];
		if (userLang != "en" && userLang != "fr" && userLang != "jp") {
			userLang = "en";
		}
	}

	// Update language switcher button states
	$("#languageSwitcher button")
		.removeClass("active")
		.attr("aria-pressed", "false");
	$("#languageSwitcher button[data-language-value='" + userLang + "']")
		.addClass("active")
		.attr("aria-pressed", "true");

	return userLang;
}
