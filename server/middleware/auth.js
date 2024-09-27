const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the JWT from the request headers
  const token = req.headers.authorization;

  // Check if a JWT was provided
  if (!token) {
    return res.status(401).json({ error: 'Authorization required' });
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, 'mysecret');

    // Set the user ID in the request object for later use
    req.user = {
      id: decoded.id
    };

    // Call the next middleware function
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
