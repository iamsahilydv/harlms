const express = require("express")
const mongoose = require("mongoose")

const complainModel =require("../models/complainmodel")

const complainController = express.Router();


//for all complain creation
complainController.post("/create",async (req, res) => {
    const {author_id,policerange,rangeDistrictName,policestation,
      phoneNumber,ComplainantName,ComplainantPhoneNumber,alternateNumber,
      FatherName,Address,Email,State,District,ComplaintCategory,
      ComplaintShortDescription,SectionsofComplaint,Range,
      SPName,Status,Markto} = req.body;

      
            const complain = new complainModel({
            author_id,
            policerange,
            rangeDistrictName,
            policestation,
            phoneNumber,
            ComplainantName,
            ComplainantPhoneNumber,
            alternateNumber,
            FatherName,
            Address,
            Email,
            State,
            District,
            ComplaintCategory,
            ComplaintShortDescription,
            SectionsofComplaint,
            Range,
            SPName,
            Status,
            Markto
            
          })
            await complain.save();
             return res.status(200).send({ message: "complain register successfull"})
        });

//for all user data
complainController.get("/allcomplain", async (req,res)=>{
  const complain = await complainModel.find()
  res.send(complain)
})    

//get complain by particular user id
complainController.get("/complainbyuser/:id", async (req,res)=>{
  const id  = req.params._id
  const complain = await complainModel.find({id})
  res.send(complain)
})  


//get complain by particular complain id
complainController.get("/complain/:id", async (req,res)=>{
  const id  = req.params._id
  const complain = await complainModel.find({id})
  res.send(complain)
}) 
 
//to update any complain by complain id
complainController.put("/update/:id", async (req,res)=>{
  const {id} = req.params._id
  const complain = await complainModel.findByIdAndUpdate(
   id = req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).send(complain);
}) 


module.exports=complainController