function getUserLocale() {
	if (typeof navigator !== "undefined") {
		if (navigator.languages && navigator.languages.length)
			return navigator.languages[0];
		return (
			navigator.language ||
			navigator.userLanguage ||
			(typeof Intl !== "undefined" &&
				Intl.DateTimeFormat &&
				Intl.DateTimeFormat().resolvedOptions().locale) ||
			"en-US"
		);
	}
	if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
		return Intl.DateTimeFormat().resolvedOptions().locale || "en-US";
	}
	return "en-US";
}

// expose as a namespaced util and as a global helper
if (typeof window !== "undefined") {
	window.localeUtil = window.localeUtil || {};
	window.localeUtil.getUserLocale = getUserLocale;
	window.getUserLocale = getUserLocale;
}
