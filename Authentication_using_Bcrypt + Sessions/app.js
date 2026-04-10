const express = require("express");
const app = express();
const {model} = require("./model/db");
const bcrypt = require("bcrypt");
const session = require("express-session");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 10*1000
  }
}))
app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.get("/" , (req, res) =>{
    res.render("form");
})

app.post("/submit" ,async (req , res) =>{
    const name = req.body.username;
    const pass = req.body.password;
    var x ;
    const bcry=  await bcrypt.hash( pass , 10 )
    const data = await model.create({name , password : bcry});
    // model.save();
    console.log(data);
    console.log("DB me store ho gya  hai id and passward");
    res.render("login");
})

app.post("/login" , async (req , res)=>{
    const {username , password } = req.body;
    const data = await model.findOne({name : username});
    console.log(data);
    if(data){
        // const result = await bcrypt.compare(password  , data.password );
        // if(result){
        //     res.send("<h1> PAYMENT</h1>");
        // }
        bcrypt.compare(password , data.password , (err , result) =>{
            if(result){
                console.log("Matched");
                req.session.user = username;
                res.redirect("/payment?username=" + username);
            }
            else{
                res.render("login");
            }
        })
    }
    else{
        res.render("login");
    }
})

async function isAuth(req , res,next){
    if(req.session.user){
        return next();
    }else{
        return res.send("nahi khulega page");
    }
}

app.get("/logout" , (req , res) => {
    req.session.destroy();
    res.redirect("/payment");
})


app.get("/payment" , isAuth , (req , res) => {
    res.send("<h1> PAYMENT PAGE VARUN</h1> <a href='/logout'> logout</a>")
})




app.listen(3000 , ()=>{
    console.log("Running on port 3000 here");
})