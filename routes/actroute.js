const express = require("express");
const mongoose = require("mongoose");

const actModel = require("../models/actmodel");

const actController = express.Router();

actController.post("/addact", async (req, res) => {
  const { actName, State } = req.body;

  const rag = await actModel.findOne({ actName });

  if (rag) {
    return res
      .status(501)
      .send({ status: 501, message: "act already present!" });
  }

  const act = new actModel({
    actName,
    State,
  });

  await act.save();
  return res
    .status(200)
    .send({ status: 200, message: "act register successfull",act });
});

actController.get("/getact", async (req, res) => {
  const act = await actModel.find();
  res.send(act);
});

//update district by id
actController.put("/update/:id", async (req,res)=>{
  const id = req.params.id
  //const {id} = req.body;
  const rag = await actModel.findByIdAndUpdate( id ,
      {
        $set: req.body,
      },
      { new: true })
  res.status(200).send(rag)
}) 

//delete act by id 

actController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const act = await actModel.findByIdAndRemove(id)
 res.send(act)
}) 

module.exports = actController;
