const mongoose=require("mongoose")

const rangeSchema= new mongoose.Schema({
    rangeName:{type:String},
    State :{type:String}
})

const rangeModel=mongoose.model("range",rangeSchema)

module.exports=rangeModel