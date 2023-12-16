chrome.storage.sync.get("defaultOptions", function (defaults) {
	chrome.storage.sync.get(defaults.defaultOptions, function (options) {
		console.log(options)

		window.location.replace(options.url || 'options.html')
		if (options.focus) {
			window.history.pushState('', '', '');
		}

	})
})