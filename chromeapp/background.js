chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		frame: 'none',
		outerBounds: {
			'width': 480,
			'height': 640
		},
		resizable: false
	});
});