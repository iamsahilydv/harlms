const mongoose=require("mongoose")

const policeStationSchema= new mongoose.Schema({
    policeStationName:{type:String},
    phoneNumber:{type:Number},
    emailAddress :{type:String}
})

const policeStationModel=mongoose.model("policeStation",policeStationSchema)

module.exports=policeStationModel