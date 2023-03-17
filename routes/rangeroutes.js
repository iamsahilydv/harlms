const express = require("express")
const mongoose = require("mongoose")

const rangeModel=require("../models/rangemodel")

const rangeController=express.Router();

rangeController.post("/addRange", async(req,res)=>{
const {rangeName,State}=req.body;

const rag = await rangeModel.findOne({rangeName})
  
if(rag){
    return res.status(501).send({status:501,message:"Range already present!"});
}

const range= new rangeModel({
     rangeName,
     State
})

await range.save();
return res.status(200).send({status:200, message: "Range register successfull"})

})

rangeController.get("/getRange", async(req,res)=>{

const range=await rangeModel.find()
res.send(range)

})

module.exports=rangeController