const express = require("express");
const mongo = require("mongoose");
const model = require("./model/user")
const app = express();
const val = require("valid-url");
const short = require("shortid");

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.get("/" , (req , res) => {
    // res.send('<h1 style = "background-color : green ;">  hello my name is varun  </h1>');
    res.render("form");
})

app.post("/submit" ,async (req , res) => {
    // console.log(req.body);
    // model.insertOne(req.body);
    const name = req.body.name;
    const url = req.body.url;
    let flag = false;
    if(val.isUri(url)){
        flag = true;
    }
    let gene;
    if(flag){
        gene = short.generate();
        let ourl = url;
        let surl = gene;
        await model.insertMany({ ourl , surl});
        console.log("generated and stored done")
        return res.render("final" , {url , gene});
    }
    res.send("please enter a valid url") 
})
app.get("/:id" , async (req , res) =>{
    const ori =await model.findOne({surl : req.params.id})
    res.redirect(ori.ourl);
})







app.listen(3000 , () => {
    console.log("hello i am running in 3000 port");
})