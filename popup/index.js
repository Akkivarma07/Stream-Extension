/* popup/index.js */

// DOM elements
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const errorMessage = document.querySelector('#error-message');
const serviceIcons = document.querySelectorAll('.service-icon');

// Event listener for form submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === '' || password === '') {
    errorMessage.textContent = 'Please enter a username and password.';
    return;
  }

  try {
    // Authenticate user and get cookies
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();

      // Navigate to selected service page
      const selectedService = document.querySelector('.selected-service').getAttribute('data-service');
      const serviceUrl = selectedService === 'netflix' ? 'https://www.netflix.com' : 'https://www.primevideo.com';

      chrome.tabs.create({ url: serviceUrl }, (tab) => {
        // Delete existing cookies for selected service
        chrome.cookies.getAll({ url: serviceUrl }, (cookies) => {
          cookies.forEach((cookie) => {
            if (cookie.name.startsWith('Netflix') || cookie.name.startsWith('Prime')) {
              chrome.cookies.remove({ url: serviceUrl, name: cookie.name });
            }
          });

          // Insert new cookies for selected service
          data.cookies.forEach((cookie) => {
            chrome.cookies.set({ url: serviceUrl, name: cookie.name, value: cookie.value });
          });
        });
      });
    } else {
      const errorData = await response.json();
      errorMessage.textContent = errorData.message;
    }
  } catch (error) {
    console.error(error);
    errorMessage.textContent = 'An error occurred while logging in.';
  }
});

// Event listener for service selection
serviceIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    // Deselect other services
    serviceIcons.forEach((otherIcon) => {
      if (otherIcon.classList.contains('selected-service')) {
        otherIcon.classList.remove('selected-service');
      }
    });

    // Select clicked service
    icon.classList.add('selected-service');
  });
});
