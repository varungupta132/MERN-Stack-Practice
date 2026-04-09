const express = require("express");
const app = express();
const cop = require("cookie-parser");
app.use(cop());

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.get("/" , (req , res)=> {
    // res.send("home page <a href='/setc' >want to add cookie </a>");
    res.render("home page")
})
var x ;
app.get("/setc" , (req,res) => {
    res.render("set_cookie")
})
app.post("/cookie_daal_do_bhai" , (req, res) =>{
    res.cookie("cokname", req.body.value);
    res.status(200).redirect("/show");
    // console.log(req.body);
})

app.get('/show' , async (req , res) => {
    console.log(req.cookies);
    res.send(`hello Varun you Just entered the cookie value  ${req.cookies.cokname} ,<br> <a href = "/clearcookie" class = "btn btn-warning"> clear cookie </a> , <a href = "/update" class = "btn btn-warning"> update cookie </a>`);
})

// console.log(x , "this is cookie wala");

app.get("/update", (req, res) => {
    res.send(`
        <h2>Update Cookie</h2>
        <form action="/update-cookie" method="POST">
            <input type="text" name="value" placeholder="Enter new value" />
            <button type="submit">Update Cookie</button>
        </form>
    `);
});

app.post("/update-cookie" , (req , res) => {
    res.cookie("cokname", req.body.value);
    // res.redirect("/update-cookie");
    res.send("ok");
})

app.get("/clearcookie" , (req , res) => {
    res.clearCookie("cokname");
    res.redirect("/");
})
// -------------------------------------   CREATE Cookies READ it and then Delete it-----------------------


// -------------------------------Next step i can do , --> creat a form , and then from that CRUD opeartions on Cookies ----------



app.listen(3000 , () =>{
    console.log("running on port numner 3000");
})
