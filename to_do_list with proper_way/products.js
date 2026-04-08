const mongo = require("mongoose");


async function dbc(){
    await mongo.connect("mongodb://localhost:27017/practice")
    .then(
        console.log("i am DB connected success fully ")
    );
        const schema = mongo.Schema({
            name : String,
            email : String,
            image : String
        })

        const model = mongo.model("practice" , schema);
        const data = [
            {
                "name": "varun",
                "email": "xyz@gmail.com",
                "image": "https://picsum.photos/id/237/200/300"
            },
            {
                "name": "rahul",
                "email": "rahul123@gmail.com",
                "image": "https://picsum.photos/id/238/200/300"
            },
            {
                "name": "aman",
                "email": "aman456@gmail.com",
                "image": "https://picsum.photos/id/239/200/300"
            },
            {
                "name": "rohit",
                "email": "rohit789@gmail.com",
                "image": "https://picsum.photos/id/240/200/300"
            },
            {
                "name": "neha",
                "email": "neha@gmail.com",
                "image": "https://picsum.photos/id/241/200/300"
            },
            {
                "name": "priya",
                "email": "priya@gmail.com",
                "image": "https://picsum.photos/id/242/200/300"
            },
            {
                "name": "ankit",
                "email": "ankit@gmail.com",
                "image": "https://picsum.photos/id/243/200/300"
            },
            {
                "name": "sneha",
                "email": "sneha@gmail.com",
                "image": "https://picsum.photos/id/244/200/300"
            },
            {
                "name": "karan",
                "email": "karan@gmail.com",
                "image": "https://picsum.photos/id/245/200/300"
            },
            {
                "name": "pooja",
                "email": "pooja@gmail.com",
                "image": "https://picsum.photos/id/246/200/300"
            }
        ];


        model.insertMany(data);
        // console.log(model.showdbs);

        console.log(await model.findOne({"email" : "xyz@gmail.com"}))

}

// dbc()

module.exports = {dbc} ;