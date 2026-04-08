const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String
});

const User = mongoose.model("practice", userSchema);

module.exports = User;
