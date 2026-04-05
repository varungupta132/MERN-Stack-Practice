express = require('express');
const app = express();
port = 3000;
data = require('./data/users');

app.get('/' , (req , res)=>{
    res.send('Home Page');
});

app.get('/about' , (req , res)=>{
    res.send('About Page');
});

app.get('/contact' , (req , res)=>{
    res.send('Contact Page');
});

app.post('/blogs' , (req , res)=>{       // create a blog
    res.send('User Page' );
});



















app.listen(port ,()=>{
    console.log(`server started on port ${port}`)
});