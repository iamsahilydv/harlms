const express = require("express")
const mongoose = require("mongoose")

const districtModel=require("../models/districtmodel")

const districtController=express.Router();

districtController.post("/addDistrict", async(req,res)=>{
const {rangeName,rangeDistrictName,State}=req.body;

const dist = await districtModel.findOne({rangeDistrictName})
  
if(dist){
    return res.status(501).send({status:501,message:"District already present!"});
}

const district= new districtModel({
     rangeName,
     rangeDistrictName,
     State
})

await district.save();
return res.status(200).send({status:200, message: "district register successfull"})

})

districtController.get("/getDistrict", async(req,res)=>{

const district=await districtModel.find()
res.send(district)

})

module.exports=districtController