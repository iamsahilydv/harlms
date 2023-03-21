const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname:{type:String,required : true },
    lname:{type:String,required : true },
    mobile:{type:Number, required:true},
    alternatemobile:{type:Number},
    policerange:{type:String},
    districtofc:{type:String},
    spname:{type:String},
    range:{type:String},
    designation:{type:String},
    policestation:{type:String},
    email : {type : String, required : true},
    password : {type : String, required : true},
    role:{type:String}
},
{ timestamps: true }

)

const AuthModel = mongoose.model("myuserdata", userSchema)


module.exports = AuthModel