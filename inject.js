/*

Default content_scripts run_at value is document_idle, which runs after windows.onload
event.  However, the script below sometimes fails to run if the webpage takes longer 
than usual to load completely.  setTimeout() is a workaround to make sure song plays
always.


*/
setTimeout(function() {

	document.getElementById('playButton').click();
	
}, 3000);
