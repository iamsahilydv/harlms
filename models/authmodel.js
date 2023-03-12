const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname:{type:String,required : true },
    lname:{type:String,required : true },
    mobile:{type:Number, required:true},
    alternatemobile:{type:Number, required:true},
    policerange:{type:String},
    districtofc:{type:String,required:true},
    spname:{type:String},
    designation:{type:String},
    policestation:{type:String},
    email : {type : String, required : true},
    password : {type : String, required : true},
    role:{type:String}
})

const AuthModel = mongoose.model("myuserdata", userSchema)


module.exports = AuthModel