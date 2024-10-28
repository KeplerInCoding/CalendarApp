const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: process.env.API_IDENTIFIER || 'http://localhost:5000/api/v1',
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256',
});

// Middleware to log incoming requests and set user ID
const logAndExtractUserId = (req, res, next) => {
  // console.log(`Incoming request to ${req.method} ${req.originalUrl}`);
  // console.log(`Authorization Header: ${req.headers.authorization}`);

  // Extract user ID from the token's payload if available
  if (req.auth && req.auth.payload) {
    req.userId = req.auth.payload.sub; // Use the 'sub' field as user ID
    // console.log("User ID extracted from token:", req.userId);
  } else {
    console.log("User ID not found in token");
  }

  next();
};

// Combine the JWT check and log/extract middleware
module.exports = [jwtCheck, logAndExtractUserId];
