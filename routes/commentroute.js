const express = require("express");
const mongoose = require("mongoose");

const commentModel = require("../models/commentModel");

const commentController = express.Router();

commentController.post("/addcomment", async (req, res) => {
    const { author_id, complain_id,authorName, commentData, Designation } = req.body;
  
    const comment = new commentModel({
        author_id, complain_id,authorName, commentData, Designation
    });
  
    await comment.save();
    return res
      .status(200)
      .send({ status: 200, message: "comment register successfull",comment });
  });
  
  commentController.get("/getcomment", async (req, res) => {
    const comment = await commentModel.find();
    res.send(comment);
  });
  
  //update district by id
  commentController.put("/update/:id", async (req,res)=>{
    const id = req.params.id
    const rag = await commentModel.findByIdAndUpdate( id ,
        {
          $set: req.body,
        },
        { new: true })
    res.status(200).send(rag)
  }) 
  
  //delete comment by id 
  
  commentController.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
   //const {id} = req.body;
   const comment = await commentModel.findByIdAndRemove(id)
   res.send(comment)
  }) 


module.exports = commentController;