// Main server file for Express setup

// Setup main server
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const experiencesRouter = require('./routes/experiences');
const ratingsRouter = require('./routes/ratings');

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/ratings', ratingsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
