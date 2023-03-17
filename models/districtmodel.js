const mongoose=require("mongoose")

const districtSchema= new mongoose.Schema({
    rangeName:{type:String},
    rangeDistrictName:{type:String},
    State :{type:String}
})

const districtModel=mongoose.model("district",districtSchema)

module.exports=districtModel