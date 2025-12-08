var translations = {};

$(document).ready(function () {
	localizePage();

	// Language switcher button click listener
	$("#languageSwitcher").on("click", "button", function () {
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
});

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
