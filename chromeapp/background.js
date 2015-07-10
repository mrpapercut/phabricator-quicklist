chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('chrome.html', {
		frame: 'none',
		outerBounds: {
			'width': 480,
			'height': 640
		},
		resizable: false
	});
});