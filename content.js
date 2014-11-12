// EventListener for button browserAction button.
chrome.browserAction.onClicked.addListener(function() {

	var createObj,
		newObj,
		existObj;

	// Tab id for jombly
	var jomblyTab;

	// Query object. URL matching to www.jombly.com/*
	var qObj = {url: "http://www.jombly.com/*"}

	// Look for tab with url matching qObj
	chrome.tabs.query(qObj, function(tab) {
		
		// Jombly not open.  Open a new tab and play.
		if (tab.length <= 0) {
			
			// Obj for creating tabs.  Diabled focus tab.
			createObj = {url: "http://www.jombly.com", active: false};

			// Obj for execute Script. Code executes 
			// newObj = {code: "document.getElementById('playButton').click();"};
			newObj = {file: "inject.js"};
			// Create tab.
			chrome.tabs.create(createObj, function(tab) {
				
				// Inject code
				chrome.tabs.executeScript(tab.id, newObj, function() {
					// Optional callback function
				});
			});
		} else {

			// Tab id if jombly is open.
			jomblyTab = tab[0].id;

			// Obj for executeScript.
			existObj = {code: "document.getElementById('nextButton').click();"}

			// Inject code.
			chrome.tabs.executeScript(jomblyTab, existObj, function() {
				// Optional callback function
			});
		}


		
	});
})