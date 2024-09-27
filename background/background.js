// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "fetchCookies") {
      // Get user ID and streaming service from message
      const userId = message.userId;
      const streamingService = message.streamingService;
  
      // Fetch cookies from MongoDB
      fetch(`http://localhost:3000/cookies?userId=${userId}&streamingService=${streamingService}`)
        .then(response => response.json())
        .then(cookies => {
          if (cookies.length === 0) {
            // No cookies found, notify content script
            sendResponse({ success: false, error: "No cookies found" });
          } else {
            // Cookies found, send to content script
            sendResponse({ success: true, cookies: cookies });
          }
        })
        .catch(error => {
          console.error(error);
          sendResponse({ success: false, error: error.message });
        });
  
      // Return true to indicate that we want to send a response asynchronously
      return true;
    }
  });
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "deleteCookie") {
      // Get current tab ID
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
  
        // Delete cookie for current tab
        chrome.cookies.remove({ url: tabs[0].url, name: message.cookieName }, function() {
          console.log("Cookie deleted");
          sendResponse({ success: true });
        });
      });
  
      // Return true to indicate that we want to send a response asynchronously
      return true;
    } else if (message.action === "insertCookie") {
      // Get current tab ID
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
  
        // Insert cookie for current tab
        chrome.cookies.set({ url: tabs[0].url, name: message.cookieName, value: message.cookieValue }, function() {
          console.log("Cookie inserted");
          sendResponse({ success: true });
        });
      });
  
      // Return true to indicate that we want to send a response asynchronously
      return true;
    }
  });
  