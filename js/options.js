
// Saves options to chrome.storage
const saveOptions = function () {
	let values = {}
	let inputs = document.querySelectorAll('input')

	for (let i = 0;i < inputs.length;i++) {
		let input = inputs[i]

		let value = input.type === "checkbox" ? input.checked : input.value

		values[input.id] = value
	};

	chrome.storage.sync.set(values, function () {
		console.log(values)
		// Update status to let user know options were saved.
		let status = document.getElementById('status')
		status.className = 'notice'
		status.textContent = 'Options saved.'
		setTimeout(function () {
			status.className += ' hidden'
		}, 100)
	})
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const getOptions = function (callback) {
	chrome.storage.sync.get("defaultOptions", function (defaults) {
		chrome.storage.sync.get(defaults.defaultOptions, function (options) {
			callback(options)
		})
	})
}

document.addEventListener('DOMContentLoaded', function () {
	// interactive input
	let inputs = document.querySelectorAll('input')

	let bgColor = document.getElementById('bgColor')
	const updateBg = function () {
		bgColor.style.background = bgColor.value
	}
	bgColor.addEventListener('keyup', updateBg)

	getOptions(function (options) {
		for (let i = 0;i < inputs.length;i++) {
			let input = inputs[i]

			let valueType =
				input.type === "checkbox" ?
					"checked" :
					"value"

			input[valueType] = options[input.id]
		};

		updateBg()
	})

	document.querySelector('button').addEventListener('click', saveOptions)
})