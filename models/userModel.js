const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please add the username"]
    },
    email: {
        type: String,
        required:[true,"Please add email"],
        unique : [true,"Email is already taken"]
    },
    password: {
        type: String,
        required:[true,"Please enter username"]
    },
},{
    timestamps:true
});

module.exports = mongoose.model("usermodel",userSchema)