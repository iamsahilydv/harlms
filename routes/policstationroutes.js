const express = require("express")
const mongoose = require("mongoose")

const policeStationModel=require("../models/policestationmodel")

const policeStationController=express.Router()

policeStationController.post("/addPolicestation", async(req,res)=>{
    const {policeStationName,phoneNumber,policeStationDistrict,policeStationRange}=req.body;
    
    const pol = await policeStationModel.findOne({policeStationName})
      
    if(pol){
        return res.status(501).send({status:501,message:"Police station already present!"});
    }
    
    const station = new policeStationModel({
         policeStationName,
         phoneNumber,
         policeStationDistrict,
         policeStationRange
    })
    
    await station.save();
    return res.status(200).send({status:200, message: "Police station register successfull"})
    
    })

    policeStationController.get("/getPolicestation", async(req,res)=>{

        const policeStation=await policeStationModel.find()
        res.send(policeStation)
        
    })

    module.exports=policeStationController
