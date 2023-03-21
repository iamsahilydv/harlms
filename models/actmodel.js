const mongoose=require("mongoose")

const actSchema= new mongoose.Schema({
   actName:[{type:String}]
})

const actModel=mongoose.model("act",actSchema)

module.exports=actModel