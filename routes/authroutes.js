const express = require("express")
const bcrypt  = require("bcrypt")

const jwt = require('jsonwebtoken');

const AuthModel =require("../models/authmodel")

const authController = express.Router();

//for all users creation
authController.post("/signup",async (req, res) => {
    const {email, password,fname,lname,mobile,alternatemobile,policerange,
        districtofc,spname,designation,policestation,role} = req.body;

        const user = await AuthModel.findOne({email})
  
    if(user){
        return res.status(501).send("User already present please use different userid!");
    }
    
        await bcrypt.hash(password, 9, async function(err, hash) {
            if(err){
                return res.status(500).send("Password Error, Please try again...")
            }
            const user = new AuthModel({
                email,
                password : hash,
                fname,
                lname,
                mobile,
                alternatemobile,
                policestation,
                policerange,
                districtofc,
                spname,
                designation,
                role
            })
            await user.save();
             return res.status(200).send({ message: "Signup successfull", user: user})
        });
 
})

//for admin login only
authController.post("/admin", async (req, res) => {
    const {email, password} = req.body;
    const user = await AuthModel.findOne({email})
    console.log(user)
    if(user === null){
        return res.status(501).send({message:"You are not authorized!",status:501}); 
    }
    if(user.email !== "admin@cms.gov.in"){
        return res.status(501).send({message:"You are not authorized!",status:501});
    }
  
    if(!user){
        return res.status(501).send({message:"Login Failed, User Not Found!",status:501});
    }
    const hash = user.password;
    
    await bcrypt.compare(password, hash, function(err, result) {
       if(err){
        return res.send({message:"Login Failed, please try again later",status:501})
    }

    if(result){
        const token=jwt.sign({email:user.email,userId:user._id},"shhhhh")
        
        return res.status(200).send({message:"login succesfully",status:200,token:token,userId:user._id})
    }
    else{
        res.status(401).send({message:"invalid username password",status:401})
    }
    });
})


//for login purpose of all users
authController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await AuthModel.findOne({email})
  
    if(!user){
        return res.status(501).send({message:"Login Failed, User Not Found!",status:501});
    }
    const hash = user.password;
    
    await bcrypt.compare(password, hash, function(err, result) {
       if(err){
        return res.send("Login Failed, please try again later")
    }

    if(result){
        const token=jwt.sign({email:user.email,userId:user._id},"shhhhh")
        
        return res.status(200).send({message:"login succesfully",token:token})
    }
    else{
        res.status(401).send("invalid password")
    }
    });
})

//for all user data
authController.get("/alldata", async (req,res)=>{
    const user = await AuthModel.find()
    res.send(user)
})

//get all sp
authController.get("/allsp", async (req,res)=>{
    const user = await AuthModel.find({designation:"SP"})
    res.send(user)
})

//for all dsp
authController.get("/alldsp", async (req,res)=>{
    const user = await AuthModel.find({designation:"DSP"})
    res.send(user)
})

//for all asp
authController.get("/allasp", async (req,res)=>{
    const user = await AuthModel.find({designation:"ASP"})
    res.send(user)
})

//for all dsp
authController.get("/allsho", async (req,res)=>{
    const user = await AuthModel.find({designation:"SHO"})
    res.send(user)
})

//for all IO
authController.get("/allio", async (req,res)=>{
    const user = await AuthModel.find({designation:"IO"})
    res.send(user)
})

//get user by id
authController.get("/user/:id", async (req,res)=>{
    const {_id} = req.body;
    const user = await AuthModel.find({_id})
    res.send(user)
  }) 

//update user by id
authController.put("/update/:id", async (req,res)=>{
    const {_id} = req.body;
    const user = await AuthModel.updateOne({_id})
    res.send(user)
  })  
  
 //delete user by id 

 authController.delete("/delete/:id", async (req,res)=>{
    const {_id} = req.body;
    const user = await AuthModel.deleteOne({_id})
    res.send(user)
  }) 

module.exports = authController