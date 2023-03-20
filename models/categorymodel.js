const mongoose=require("mongoose")

const categorySchema= new mongoose.Schema({
    categoryName:{type:String},
    fullform :{type:String}
})

const categoryModel=mongoose.model("category",categorySchema)

module.exports=categoryModel