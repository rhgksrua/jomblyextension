/*

Default content_scripts run_at value is document_idle, which runs after windows.onload
event.  However, the script below sometimes fails to run if the webpage takes longer 
than usual to load completely.  setTimeout() is a workaround to make sure song plays
always.


*/
setTimeout(function() {

	/*
	
	var title = document.getElementById('title');
	console.log(title);
	var songInfo = {
		title: title.textContent,
	}

	console.log('sending first');
	chrome.runtime.sendMessage(songInfo, function(response) {
		// Optional callback function
		console.log('sent');
	});
*/
	document.getElementById('playButton').click();

}, 3000);
