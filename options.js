/*

Options.js

Enable/Disable notification

*/

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get({
		notification: true
	}, function (noti) {
		document.getElementById('show').checked = noti.notification;
		console.log(noti.notification);
	});
});

document.getElementById('show').addEventListener('change', function() {
	var checked = this.checked;
	chrome.storage.sync.set({
		notification: checked
	})


});

