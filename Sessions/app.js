const express = require("express");
const app = express();
const sess = require("express-session");


app.use(express.urlencoded({extended:true}));
app.use(sess({secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie : {
        maxAge:500*1000
    }

}));

app.use(express.json());
app.set("view engine" , "ejs")

app.get("/" , (req , res)=>{
    res.render("home");
})
app.get("/form" , (req , res) =>{
    res.render("form");
})
// --------------------------CREATE----------------
app.post("/submit" , (req , res) =>{
    req.session.username = req.body.name ;
    req.session.startTime = Date.now();
req.session.duration = 5000;
    res.redirect("/show");
})

// -------------------------------------READ-------------

app.get("/show" , (req , res) =>{
    console.log(req.session);
    let remaining = req.session.duration - (Date.now() - req.session.startTime);

// res.send(`Remaining time: ${remaining} ms   <a href="/logout"> logout</a>`);
    res.send(`hello bhai tumne abhi abhi ye session ${req.session.username} set kiya hai vo bhi itne time ke liye ->${req.session.cookie.originalMaxAge }  <a href="/logout"> logout</a>
        <form action="/update" method="post">
  <input type="text" name="name" value="xyz">
  <button type="submit">Update</button>
</form>

        `);
})

// ---------------------------DELETE------------------

app.get("/logout", (req , res) =>{
    req.session.destroy();
    res.redirect("/show");
})

// ----------------------UPDATE-------------------

app.post("/update" , (req , res) =>{
    // console.log(req.body);
    req.session.username = req.body.name ;
    res.redirect("/show");
})




app.listen(3000 , ()=>{
    console.log("i am running on 3000 port");
})