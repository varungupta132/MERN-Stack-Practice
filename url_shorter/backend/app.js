const express = require('express');
const app = express();

const mongoose = require('mongoose');
const url = require('./models/url');

mongoose.connect('mongodb://localhost:27017/Url_shortner')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to MongoDB'));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, port`);
});

app.get("/" , (req,res) => {
    res.send("hello i am running")
})