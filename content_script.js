/*

content_script.js is injected to jombly.  It listens for change in
the title of the song and sends title and artwork to the extension.
The value for manifest content_scripts run_at is document end.
This is a workaround to show notification for the first track playing.

*/

var title = document.getElementById('songInfo');

/* 

Using WebKitMutationObserver to detect when song changes.

*/
var obs = new WebKitMutationObserver(function(mutation) {
	var songInfo = {
		title: title.textContent,
	}
	chrome.runtime.sendMessage(songInfo, function(response) {
		// Optional callback function
	});
});

var config = {
	childList: true, 
	characterData: true
};

obs.observe(title, config);

