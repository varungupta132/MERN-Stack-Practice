const mongo = require("mongoose");

mongo.connect("mongodb://localhost:27017/urls").then(
    console.log("db connected")
);

const schema = mongo.Schema({
    ourl : {
        type : String,
        required : true
    },
    surl : {
        type : String,
        required : true
    }
} , {
    timestamps : true
}
);


const model = mongo.model("urls" , schema)

module.exports = model ;