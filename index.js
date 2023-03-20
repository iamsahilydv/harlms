const express=require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const bodyparser=require('body-parser')


const connection= require("./config/config")


const authController=require("./routes/authroutes")
const complainController=require("./routes/complainroutes")
const districtController=require("./routes/districtroutes")
const rangeController=require("./routes/rangeroutes")
const policeStationController=require("./routes/policstationroutes")

require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

app.use("/user", authController)
app.use("/complain", complainController)
app.use("/district", districtController)
app.use("/range", rangeController)
app.use("/policestation", policeStationController)


app.get("/",(req,res)=>{
    return res.status(200).send("HomePage");
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection,{useNewUrlParser:true, useUnifiedTopology:true}
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
    console.log(`db connect at ${process.env.PORT}`);
})