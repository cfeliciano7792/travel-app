const express = require('express');
const app = express();
const port = 3000;

app.get('/login', (req, res) => {
  res.send('Hello, world!');
});

app.get('/signup', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});