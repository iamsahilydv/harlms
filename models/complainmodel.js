const mongoose = require("mongoose")

const complainSchema = new mongoose.Schema({
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authroute",
        required:true
    },
    fname:{type:String },
    lname:{type:String},
    mobile:{type:Number},
    alternatemobile:{type:Number},
    policerange:{type:String},
    districtofc:{type:String},
    policestation:{type:String},
   complainAgainst:{type:String},
   complainDetails:{type:String} 
},
{ timestamps: true }
)

const complainModel = mongoose.model("complain", complainSchema)


module.exports = complainModel