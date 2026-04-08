const express = require("express");
const app = express();
const cop = require("cookie-parser");
app.use(cop());

app.get("/" , (req , res)=> {
    res.send("home page <a href='/setc' >want to add cookie </a>");
})
var x ;
app.get("/setc" , (req,res) => {
    res.cookie("name" , "varun" , {
        maxAge : 100000 // cookei expires
    });
    x = req.cookies;
    res.send('<a href ="/show">click here to see cookies </a>');
})
app.get('/show' , (req , res) => {
    console.log(req.cookies);
    res.send(`hello ${req.cookies.name}  , <a href = "/clearcookie"> clear cookie </a>`);
})

console.log(x , "this is cookie wala");

app.get("/clearcookie" , (req , res) => {
    res.clearCookie("name");
    res.redirect("/");
})
// -------------------------------------   CREATE Cookies READ it and then Delete it-----------------------


// -------------------------------Next step i can do , --> creat a form , and then from that CRUD opeartions on Cookies ----------



app.listen(3000 , () =>{
    console.log("running on port numner 3000");
})
