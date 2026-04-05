const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./model/product")

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/SSR-CB")
    .then(()=>{
        console.log("DB conected")
    })
    .catch(()=>{
        console.log("DB not conected");
    })

app.get('/',(req,res)=>{
    res.render("home")
})

app.get('/products',async (req,res)=>{
    const products = await Product.find({})
    res.render("product",{products})
})

app.get("/product/new" , (req,res)=>{
    res.render("addwaal");
})

app.post("/added" , async (req, res)=>{
    const {name,image   ,price,desc} = req.body ;
    // console.log(req.body);
    await Product.create({name , image , price , desc});
    console.log("ok done all");
    res.redirect("/products")
})

app.get("/product/:id/editwala" , async (req, res) =>{
    const id = req.params.id;
    const product = await Product.findById(id);
    // console.log(prod);
    // res.render("addwaal");
    res.render("editwala" , {product});
})

app.post("/update/:id" , async (req,res)=>{
    const id = req.params.id ;
    const {name , image , price , desc} = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
    name: name,
    price:price,
    image : image,
    desc : desc
})

res.redirect("/products")

})

app.get("/delete/:id" ,async (req,res) =>{
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
})





const PORT = 5000;
app.listen(PORT,()=>{
    console.log("server run at port ",PORT);
})