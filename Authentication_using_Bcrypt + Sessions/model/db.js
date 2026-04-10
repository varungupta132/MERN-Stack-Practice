const m = require("mongoose");
m.connect("mongodb://localhost:27017/auth").then(()=>{
    console.log("DB Connected");
});

const schema = m.Schema({
    name : String ,
    password : String
})

const model = m.model("auth" , schema);
console.log("exported successfully")
module.exports = {model};

