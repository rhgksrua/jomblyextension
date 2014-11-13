/* 

EventListener for button browserAction button.

Moves to next song if jombly is open.  If not open, opens a new tab
and plays.

*/
chrome.browserAction.onClicked.addListener(function() {

	var createObj,
		newObj,
		existObj;

	var qObj = {url: "http://www.jombly.com/*"}

	// Look for tab with url matching qObj
	chrome.tabs.query(qObj, function(tab) {
		
		// Jombly not open.  Open a new tab and play.
		if (tab.length <= 0) {
			createObj = {url: "http://www.jombly.com", active: false};
			newObj = {file: "inject.js"};
			chrome.tabs.create(createObj, function(tab) {
				chrome.tabs.executeScript(tab.id, newObj, function() {
					// Optional callback function
				});
			});
		
		// Jombly is open and clicking on browser action plays next song.
		} else {
			existObj = {code: "document.getElementById('nextButton').click();"};
			chrome.tabs.executeScript(tab[0].id, existObj, function() {
				// Optional callback function
			});
		}
	});

});

/*

Add notification after song changes.  Currently Artwork cannot be displayed because
content security policy.  There is a workaround using blob or data URL, 
but not implemented.

*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var notiId = "jom";
	var options = {
		type: "basic",
		iconUrl: "http://www.jombly.com/img/jombly_icon_70.png",
		message: request.title,
		title: "Jombly",
		priority: 0
	}

	// Need to clear notification or notification will stay hidden unless
	// user looks for it in the taskbar.
	chrome.notifications.clear(notiId, function(cleared) {
		// cleared is true if notification exists, or false if not.
	});
	
	// Check options.  Default noti.notification is true.
	chrome.storage.sync.get({
		notification: true
	}, function (noti) {
		if (noti.notification === true) {
			chrome.notifications.create(notiId, options, function() {});
		}
	});
});