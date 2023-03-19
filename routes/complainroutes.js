const express = require("express")
const mongoose = require("mongoose")

const complainModel =require("../models/complainmodel")

const complainController = express.Router();


//for all complain creation
complainController.post("/create",async (req, res) => {
    const {author_id,policerange,rangeDistrictName,policestation,
      phoneNumber,ComplainantName,ComplainantPhoneNumber,alternateNumber,
      FatherName,Address,Email,State,City,ComplaintCategory,
      ComplaintShortDescription,SectionsofComplaint,Range,
      SPName,Status,Markto,AddressLine1} = req.body;

      
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
            AddressLine1,
            Email,
            State,
            City,
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

// filter for adgp compain dashboard
complainController.get("/adgpfilter", async (req,res)=>{
  const {fromDate, toDate, policestation, status,
  category,district,range}=req.body;

  if(fromDate && toDate && policestation && status && category && district && range){
    const complain = await complainModel.find({$and:[ {createdAt:{$gt: fromDate}},{createdAt: { $lt: toDate }},
       {policestation:policestation},{Status:status} , {ComplaintCategory:category} ,
      {District:district},{Range:range}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status && category && district){
    const complain = await complainModel.find({$and:[ {createdAt:{$gt: fromDate}},{createdAt: { $lt: toDate }},
      {policestation:policestation},{Status:status} , {ComplaintCategory:category} ,
     {District:district}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status && category){
    const complain = await complainModel.find({$and:[ {createdAt:{$gt: fromDate}},{createdAt: { $lt: toDate }},
      {policestation:policestation},{Status:status} , {ComplaintCategory:category}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status){
    const complain = await complainModel.find({$and:[ {createdAt:{$gt: fromDate}},{createdAt: { $lt: toDate }},
      {policestation:policestation},{Status:status}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation ){
    const complain = await complainModel.find({$and:[ {createdAt:{$gt: fromDate}},{createdAt: { $lt: toDate }},
      {policestation:policestation}]})
  res.send(complain)
  }

  else if(fromDate && toDate){
    const complain = await complainModel.find({$and:[ {createdAt:{$gt: fromDate}},{createdAt: { $lt: toDate }}]})
  res.send(complain)
  }

  else{
    const complain = await complainModel.find()
  res.send(complain)
  }

}) 

// filter for sp compain dashboard
complainController.get("/spfilter", async (req,res)=>{
  const {fromDate, toDate, policestation, status,
  category,district,policepost}=req.body;

  if(fromDate && toDate && policestation && status && category && district && policepost){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, {createdAt: {$lt: toDate} },
       {policestation:policestation} , {Status:status} , {ComplaintCategory:category} ,
      {District:district} , {Designation:policepost}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status && category && district){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, {createdAt: {$lt: toDate} },
      {policestation:policestation} , {Status:status} , {ComplaintCategory:category} ,
     {District:district}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status && category){
    const complain = await complainModel.find({$and:[{createdAt:{$gt: fromDate}}, {createdAt: {$lt: toDate} },
      {policestation:policestation} , {Status:status} , {ComplaintCategory:category}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, {createdAt: {$lt: toDate} },
      {policestation:policestation} , {Status:status}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation ){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, {createdAt: {$lt: toDate} },
      {policestation:policestation} ]})
  res.send(complain)
  }

  else if(fromDate && toDate){
    const complain = await complainModel.find({$and:[{createdAt:{$gt: fromDate}}, {createdAt: {$lt: toDate} }]})
  res.send(complain)
  }

  else{
    const complain = await complainModel.find()
  res.send(complain)
  }

}) 

// filter for dsp/asp compain dashboard
complainController.get("/dspfilter", async (req,res)=>{
  const {fromDate, toDate, policestation, status,
  category,policepost}=req.body;

  if(fromDate && toDate && policestation && status && category && policepost){
    const complain = await complainModel.find({ $and :[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
       {policestation:policestation} , {Status:status} , {ComplaintCategory:category} , {Designation:policepost}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status && category){
    const complain = await complainModel.find({ $and :[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
      {policestation:policestation} , {Status:status} , {ComplaintCategory:category} ]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation && status){
    const complain = await complainModel.find({ $and :[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
      {policestation:policestation} , {Status:status}]})
  res.send(complain)
  }

  else if(fromDate && toDate && policestation ){
    const complain = await complainModel.find({ $and :[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
      {policestation:policestation}]})
  res.send(complain)
  }

  else if(fromDate && toDate){
    const complain = await complainModel.find({ $and :[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} }] })
  res.send(complain)
  }

  else{
    const complain = await complainModel.find()
  res.send(complain)
  }

}) 


// filter for sho compain dashboard
complainController.get("/shofilter", async (req,res)=>{
  const {fromDate, toDate, status,
  category,policepost,io,fir}=req.body;

  if(fromDate && toDate && status && category && policepost){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
     {Status:status} , {ComplaintCategory:category} , {Designation:policepost} , {Markto:io}]})
  res.send(complain)
  }

  else if(fromDate && toDate && status && category && policepost){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
      {Status:status} , {ComplaintCategory:category} , {Designation:policepost}]})
  res.send(complain)
  }

  else if(fromDate && toDate && status && category){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
      {Status:status} , {ComplaintCategory:category}]})
  res.send(complain)
  }

  else if(fromDate && toDate  && status){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} } ,
      {Status:status}]})
  res.send(complain)
  }

  else if(fromDate && toDate){
    const complain = await complainModel.find({ $and:[{createdAt:{$gt: fromDate}}, { createdAt: {$lt: toDate} }] })
  res.send(complain)
  }

  else{
    const complain = await complainModel.find()
  res.send(complain)
  }

})

module.exports=complainController