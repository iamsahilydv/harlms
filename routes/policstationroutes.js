const express = require("express");
const mongoose = require("mongoose");

const policeStationModel = require("../models/policestationmodel");

const policeStationController = express.Router();

policeStationController.post("/addPolicestation", async (req, res) => {
  const {
    policeStationName,
    phoneNumber,
    policeStationDistrict,
    email,
    policeStationRange,
    Status,
  } = req.body;

  const pol = await policeStationModel.findOne({ policeStationName });

  if (pol) {
    return res
      .status(501)
      .send({ status: 501, message: "Police station already present!" });
  }

  const station = new policeStationModel({
    policeStationName,
    phoneNumber,
    policeStationDistrict,
    email,
    policeStationRange,
    Status,
  });

  await station.save();
  return res
    .status(200)
    .send({ status: 200, message: "Police station register successfull",station });
});

policeStationController.get("/getPolicestation", async (req, res) => {
  const policeStation = await policeStationModel.find();
  res.send(policeStation);
});

//update policeStation by id
policeStationController.put("/update/:id", async (req,res)=>{
  const id = req.params.id
  //const {id} = req.body;
  const pol = await policeStationModel.findByIdAndUpdate( id ,
      {
        $set: req.body,
      },
      { new: true })
  res.status(200).send(pol)
}) 


//delete user by id 

policeStationController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const pol = await policeStationModel.findByIdAndRemove(id)
 res.send(pol)
}) 

module.exports = policeStationController;
