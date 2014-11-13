/*

Options.js

Enable/Disable notification

*/

// Load saved options.  Notification is enabled by default.
document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get({
		notification: true
	}, function (noti) {
		document.getElementById('show').checked = noti.notification;
		console.log(noti.notification);
	});
});

// Save user pref.
document.getElementById('show').addEventListener('change', function() {
	var checked = this.checked;
	chrome.storage.sync.set({
		notification: checked
	})


});

