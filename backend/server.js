// Import express framework
const express = require('express')
const app = express()

// Import bcrypt library to allow for hashing passwords
const bcrypt = require('bcrypt')

// Import cors middleware
const cors = require('cors')

const port = 3000

// Enable CORS for all routes
app.use(cors())

// automatically parse JSON data in request bodies
app.use(express.json())

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });