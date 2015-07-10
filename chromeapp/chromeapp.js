document.querySelector('.window-action#minimize').addEventListener('click', function() {
	chrome.app.window.current().minimize();
});

document.querySelector('.window-action#close').addEventListener('click', function() {
	chrome.app.window.current().close();
});