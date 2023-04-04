const express = require("express");
const mongoose = require("mongoose");

const visitorModel = require("../models/visitormodel");

const visitorController = express.Router();

visitorController.post("/addvisitor", async (req, res) => {
  const { complainantName,complainantNumber, problem, orderbyadgp, markto } = req.body;

  
  const visitor = new visitorModel({
   complainantName,
   complainantNumber,
   problem,
   orderbyadgp,
   markto,
   FirNumber,
   complainClerk,
   PhoneNumber
  });

  await visitor.save();
  return res
    .status(200)
    .send({ status: 200, message: "visitor register successfull",visitor });
});

visitorController.get("/getvisitor", async (req, res) => {
  const visitor = await visitorModel.find();
  res.send(visitor);
});

//update district by id
visitorController.put("/update/:id", async (req,res)=>{
  const id = req.params.id
  //const {id} = req.body;
  const rag = await visitorModel.findByIdAndUpdate( id ,
      {
        $set: req.body,
      },
      { new: true })
  res.status(200).send(rag)
}) 

//delete visitor by id 

visitorController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const visitor = await visitorModel.findByIdAndRemove(id)
 res.send(visitor)
}) 

module.exports = visitorController;
