const functions = require("firebase-functions");
const express = require("express");

// Importing Express server
const app = require("../backend/server");

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);
