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
			existObj = {code: "document.getElementById('next').click();"};
			chrome.tabs.executeScript(tab[0].id, existObj, function() {
				// Optional callback function
			});
		}
	});

});

/**
 *
 * Add notification after song changes.
 *
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

	
	// Check options.  Default noti.notification is true.
	chrome.storage.sync.get({
		notification: true
	}, function (noti) {
		if (noti.notification === true) {

			// Each notification has a random id.
			chrome.notifications.create(makeNotificationId(), options, function(id) {
				setTimeout(function() {
					chrome.notifications.clear(id, function(cleared) {});
				}, 5000)
			});

		}
	});
});

/**
 *
 * Creates a random notificatoin id for each song
 *
 * This allows notification to stack on top of eachother if track is skipped
 * before notification clear is executed.  Also, clearing notification only
 * applies to specific notification.
 *
 */
function makeNotificationId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}