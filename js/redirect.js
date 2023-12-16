chrome.storage.sync.get("defaultOptions", function (defaults) {
	chrome.storage.sync.get(defaults.defaultOptions, function (options) {
		document.head.innerHTML += `<style> body { background: ${options.bgColor}} </style>`

		window.location.replace(options.url || 'options.html')
		if (options.focus) {
			window.history.pushState('', '', '')
		}

		console.log(options)
	})
})