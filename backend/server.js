// Main server file for Express setup

// Setup main server
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const experiencesRouter = require('./routes/experiences');
const ratingsRouter = require('./routes/ratings');

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

// Temp variable to hold usernames and passwords
const users = []

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users)
})

// Create a user with a hashed password
app.post('/signup', async (req, res) => {
    try {
        // generate a unique salt that will go at the front of the password
        const salt = await bcrypt.genSalt()

        // hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        // console.log(salt)
        // console.log(hashedPassword)

        // create a user object with the name and newly hashed password
        const user = { name: req.body.name, password: hashedPassword }

        // store user in the array
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

// Find if username exists and then check the hashed password
app.post('/login', async (req, res) => {

    // Find the user with the matching name in the user array
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('User not found')
    }
    try {
        // Compared entered password with the stored password
       if (await bcrypt.compare(req.body.password, user.password)) {
        res.send("Login Successful!")
       } else {
        res.send("Login Failed")
       }
    } catch {
        res.status(500).send()
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
