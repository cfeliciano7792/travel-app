const functions = require("firebase-functions");

// Importing Express server
const app = require("../backend/server");

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);
