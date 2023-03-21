const express = require("express");
const mongoose = require("mongoose");

const categoryModel = require("../models/categorymodel");

const categoryController = express.Router();

categoryController.post("/addcategory", async (req, res) => {
  const { categoryName, fullform } = req.body;

  const rag = await categoryModel.findOne({ categoryName });

  if (rag) {
    return res
      .status(501)
      .send({ status: 501, message: "category already present!" });
  }

  const category = new categoryModel({
    categoryName,
    fullform
  });

  await category.save();
  return res
    .status(200)
    .send({ status: 200, message: "category register successfull",category });
});

categoryController.get("/getcategory", async (req, res) => {
  const category = await categoryModel.find();
  res.send(category);
});

//update district by id
categoryController.put("/update/:id", async (req,res)=>{
  const id = req.params.id
  //const {id} = req.body;
  const rag = await categoryModel.findByIdAndUpdate( id ,
      {
        $set: req.body,
      },
      { new: true })
  res.status(200).send(rag)
}) 

//delete user by id 

categoryController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const cat = await categoryModel.findByIdAndRemove(id)
 res.send(cat)
}) 

module.exports = categoryController;
