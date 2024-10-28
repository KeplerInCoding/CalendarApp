// backend/middleware/authMiddleware.js
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://dev-qfiyzdi4imx1b4bw.us.auth0.com/api/v2/',
  issuerBaseURL: `dev-qfiyzdi4imx1b4bw.us.auth0.com`,
});

module.exports = checkJwt;
