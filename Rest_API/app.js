const express = require("express");
const app = express();
app.set("view engine" , "ejs");



const user = require("./data/users");
app.get("/" , (req , res) => {
    res.send("Welcome to the Home Page");
})

app.get("/user" , (req , res) => {
    res.render("home" , user );
});




app.listen(3000 , () => {
    console.log("server started on port 3000")
})