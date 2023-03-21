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

//update district by id
districtController.put("/update/:id", async (req,res)=>{
    const id = req.params.id
    //const {id} = req.body;
    const dist = await districtModel.findByIdAndUpdate( id ,
        {
          $set: req.body,
        },
        { new: true })
    res.status(200).send(dist)
  }) 


  //delete user by id 

 districtController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const dis = await districtModel.findByIdAndRemove(id)
 res.send(dis)
}) 

module.exports=districtController