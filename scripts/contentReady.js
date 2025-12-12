/**
 * Content Ready Coordinator
 * Manages loading states for header/footer injection, translations, and data
 * Provides a single event that fires when everything is ready to display
 */

var ContentReady = (function () {
	var loadingStates = {
		headerFooter: false,
		translations: false,
		sheetData: false,
	};

	var callbacks = [];

	function setLoadingState(key, value) {
		loadingStates[key] = value;
		checkAllReady();
	}

	function checkAllReady() {
		var allReady =
			loadingStates.headerFooter &&
			loadingStates.translations &&
			loadingStates.sheetData;

		if (allReady) {
			fireReadyCallbacks();
		}
	}

	function fireReadyCallbacks() {
		callbacks.forEach(function (callback) {
			try {
				callback();
			} catch (e) {
				console.error("Error in contentReady callback:", e);
			}
		});
		// Clear callbacks so they don't fire again
		callbacks = [];
	}

	return {
		/**
		 * Mark header/footer as loaded
		 */
		headerFooterLoaded: function () {
			setLoadingState("headerFooter", true);
		},

		/**
		 * Mark translations as loaded
		 */
		translationsLoaded: function () {
			setLoadingState("translations", true);
		},

		/**
		 * Mark sheet data as loaded
		 */
		sheetDataLoaded: function () {
			setLoadingState("sheetData", true);
		},

		/**
		 * Register callback to fire when all content is ready
		 * If already ready, callback fires immediately
		 */
		onReady: function (callback) {
			if (
				loadingStates.headerFooter &&
				loadingStates.translations &&
				loadingStates.sheetData
			) {
				// Already loaded, fire immediately
				try {
					callback();
				} catch (e) {
					console.error("Error in contentReady callback:", e);
				}
			} else {
				callbacks.push(callback);
			}
		},

		/**
		 * Get current loading state (for debugging)
		 */
		getState: function () {
			return Object.assign({}, loadingStates);
		},
	};
})();

// Listen for translations loaded event from localize.js
$(document).on("translationsLoaded", function () {
	ContentReady.translationsLoaded();
});
