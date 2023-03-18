const mongoose = require("mongoose")

const complainSchema = new mongoose.Schema({
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authroute",
        required:true
    },
    Designation:{type:String},
    policerange:{type:String},
    rangeDistrictName:{type:String},
    policestation:{type:String},
    phoneNumber:{type:Number},
    ComplainantName :{type:String },
    ComplainantPhoneNumber:{type:Number},
    alternateNumber:{type:Number},
    FatherName :{type:String },
    Address:{type:String },
    Email :{type:String },
    State :{type:String },
    District :{type:String },
    ComplaintCategory:{type:String },
    ComplaintShortDescription:{type:String },
    SectionsofComplaint:{type:String },
    Range:{type:String },
    SPName:{type:String },
    Status:{type:String },
    Markto:{type:String},
    

    //uploadpdfcomplaint
    //uploadevidence
   
},
{ timestamps: true }
)

const complainModel = mongoose.model("complain", complainSchema)


module.exports = complainModel