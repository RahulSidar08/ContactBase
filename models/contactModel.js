const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    name : {
        type:String,
        required:[true,"Please add the name"]
    },
    email : {
        type:String,
        required:[true,"Please add the email"]
    },
    phone : {
        type:String,
        required:[true,"Please add the Contact Number"]
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model("contactmodel",contactSchema)