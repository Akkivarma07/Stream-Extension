// Get the selected streaming service from local storage
chrome.storage.local.get(['streamingService'], function(result) {
    // Check if the user has selected a streaming service
    if (result.streamingService) {
      // Get the cookies for the selected streaming service from the background script
      chrome.runtime.sendMessage({action: 'getCookies'}, function(response) {
        // Check if cookies were returned
        if (response.cookies) {
          // Delete all existing cookies for the selected streaming service
          chrome.cookies.getAll({domain: result.streamingService.domain}, function(cookies) {
            for (var i = 0; i < cookies.length; i++) {
              chrome.cookies.remove({url: result.streamingService.url + cookies[i].path, name: cookies[i].name});
            }
          });
  
          // Set the new cookies for the selected streaming service
          for (var i = 0; i < response.cookies.length; i++) {
            chrome.cookies.set({
              url: response.cookies[i].url,
              name: response.cookies[i].name,
              value: response.cookies[i].value,
              domain: response.cookies[i].domain,
              path: response.cookies[i].path,
              secure: response.cookies[i].secure,
              httpOnly: response.cookies[i].httpOnly,
              expirationDate: response.cookies[i].expirationDate
            });
          }
        }
      });
    }
  });
  