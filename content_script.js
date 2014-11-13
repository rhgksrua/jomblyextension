/*

content_script.js is injected to jombly.  It listens for change in
the title of the song and sends title and artwork to the extension.

*/

var title = document.getElementById('title');
var artwork = document.getElementById('container').style.backgroundImage.slice(4, -1);

/* 

Using WebKitMutationObserver to detect when song changes.

*/
var obs = new WebKitMutationObserver(function(mutation) {

	var songInfo = {
		title: title.textContent,
		artwork: artwork
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

