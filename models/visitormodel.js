const mongoose=require("mongoose")

const visitorSchema= new mongoose.Schema({
   complainantName:{type:String, required: true},
   complainantNumber:{type:Number, required: true},
   problem:{type:String, required: true},
   orderbyadgp:{type:String, required: true},
   markto:{type:String, required: true},
   FirNumber:{type:String},
   complainClerk:{type:String},
   PhoneNumber:{type:String}
})

const visitorModel=mongoose.model("visitor",visitorSchema)

module.exports=visitorModel