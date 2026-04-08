const express = require("express");
const mongo = require("mongoose");
const User = require("./models/user");
const methodd = require("method-override");
mongo.connect("mongodb://localhost:27017/practice")
    .then(console.log("i am DB connected successfully"));

const app = express();
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(methodd("_method"))
// ----------------HOME----------------
app.get("/" , (req, res) =>{
    // res.send("all done dont worry , i am varun ");
    res.render("home page");
    // res.end()
})

// -------------------CREATE-------------
app.get("/add" , (req,res) => {
    res.render("add");
})
app.post("/add_kerde_bhai" , async (req,res) =>{
    const data = req.body;
    await User.insertMany(data).then(console.log("add ho gya "));
    res.redirect("/show");
})
// -----------------READ--------------
app.get("/show" ,async (req, res) => {
    const data = await User.find();
    res.render("show" , { data } );
})




// ----------------UPDATE------------------------
app.get("/edit/:id" ,async (req ,res) => {
    const id = req.params.id;

    const data = await User.findById(id);
    res.render("editwala",{data});
})
app.post("/update/:id" ,async (req,res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id , req.body);
    res.redirect("/show");
})


// ----------------------DELETE------------------------

app.get("/delete/:id" ,async (req,res) => {
    const id = req.params.id ;
    await User.findByIdAndDelete(id);
    res.redirect("/show");
})


app.listen(3000 , () => {
    console.log("yes i am running on 3000 port , dont worry ");
});


