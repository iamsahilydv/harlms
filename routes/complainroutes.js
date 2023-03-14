const express = require("express")
const mongoose = require("mongoose")

const complainModel =require("../models/complainmodel")

const complainController = express.Router();


//for all complain creation
complainController.post("/create",async (req, res) => {
    const {author_id,fname,lname,mobile,alternatemobile,policerange,
        districtofc,policestation,complainAgainst,complainDetails} = req.body;

        //const complain = await complainModel.findOne({email})

            const complain = new complainModel({
            author_id,
            fname,
            lname,
            mobile,
            alternatemobile,
            policerange,
            policestation,
            districtofc,
            complainAgainst,
            complainDetails
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
  const {author_id} = req.body;
  const complain = await complainModel.find({author_id})
  res.send(complain)
})  


//get complain by particular complain id
complainController.get("/complain/:id", async (req,res)=>{
  const {_id} = req.body;
  const complain = await complainModel.find({_id})
  res.send(complain)
}) 
 


module.exports=complainController