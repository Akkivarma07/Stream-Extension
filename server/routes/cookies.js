const express = require('express');
const router = express.Router();

// This middleware function checks if a valid JWT is present in the request headers
const authMiddleware = require('../middleware/auth');

// This is just an example of fetching cookies from a MongoDB database
const { fetchCookies } = require('../database/models/Cookie');

router.get('/:service', authMiddleware, (req, res) => {
  // Get the cookies for the specified service from the database
  const cookies = fetchCookies(req.user.id, req.params.service);

  // Check if cookies were returned
  if (cookies) {
    res.status(200).json({ cookies });
  } else {
    res.status(404).json({ error: 'Cookies not found' });
  }
});

module.exports = router;
