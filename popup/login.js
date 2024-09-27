// Connect to the background script
const bg = chrome.extension.getBackgroundPage();

// DOM elements
const platformSelect = document.getElementById('platform-select');
const netflixBtn = document.getElementById('netflix-btn');
const primeBtn = document.getElementById('prime-btn');
const cookieInfo = document.getElementById('cookie-info');
const cookieDisplay = document.getElementById('cookie-display');
const deleteCookieBtn = document.getElementById('delete-cookie-btn');

// Show the platform selection screen
platformSelect.style.display = 'block';

// Add event listeners to the platform selection buttons
netflixBtn.addEventListener('click', selectNetflix);
primeBtn.addEventListener('click', selectPrime);

// Function to handle Netflix button click
function selectNetflix() {
	// Send a message to the background script to select Netflix
	chrome.runtime.sendMessage({platform: 'netflix'}, function(response) {
		// Display the cookies and show the delete button
		displayCookies(response);
		cookieInfo.style.display = 'block';
	});
}

// Function to handle Amazon Prime button click
function selectPrime() {
	// Send a message to the background script to select Prime
	chrome.runtime.sendMessage({platform: 'prime'}, function(response) {
		// Display the cookies and show the delete button
		displayCookies(response);
		cookieInfo.style.display = 'block';
	});
}

// Function to display the cookies in the popup
function displayCookies(cookies) {
	if (cookies) {
		cookieDisplay.textContent = cookies;
	} else {
		cookieDisplay.textContent = 'No cookies found.';
	}
}

// Add event listener to the delete button
deleteCookieBtn.addEventListener('click', deleteCookies);

// Function to handle delete button click
function deleteCookies() {
	// Send a message to the background script to delete cookies
	chrome.runtime.sendMessage({deleteCookies: true}, function(response) {
		// Display a message indicating the cookies were deleted
		cookieDisplay.textContent = 'Cookies deleted.';
	});
}
