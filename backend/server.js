// Main server file for Express setup

// Setup main server
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const experiencesRouter = require('./routes/experiences');
const ratingsRouter = require('./routes/ratings');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

// Import bcrypt library to allow for hashing passwords
const bcrypt = require('bcrypt')

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/ratings', ratingsRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
