// Main server file for Express setup
// Connects to routes

// Setup main server routes
const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const experiencesRouter = require('./routes/experiences');
const tripExperiencesRouter = require('./routes/tripExperiences');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

// Import bcrypt library to allow for hashing passwords
const bcrypt = require('bcrypt')

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/trip-experiences', tripExperiencesRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Export the app for Firebase Functions
module.exports = app;

// Start the server locally only if not in Firebase Functions
if (!process.env.FUNCTIONS_EMULATOR) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
