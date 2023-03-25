const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authroute",
      required: true,
    },
    Designation: { type: String },
    policerange: { type: String },
    rangeDistrictName: { type: String },
    policestation: { type: String },
    phoneNumber: { type: Number },
    ComplainantName: { type: String },
    ComplainantPhoneNumber: { type: Number },
    alternateNumber: { type: Number },
    FatherName: { type: String },
    Address: { type: String },
    AddressLine1: { type: String },
    Email: { type: String },
    State: { type: String },
    City: { type: String },
    ComplaintCategory: { type: String },
    ComplaintShortDescription: { type: String },
    SectionsofComplaint: { type: String },
    Range: { type: String },
    SPName: { type: String },
    Status: { type: String },
    Markto: { type: String },
    Date: { type: String },
    Issuedate: { type: String },
    trackingId:{type:String},
    complainDate:{type:String},
    targetDate:{type:String},
    fir:{type:String},
    uploadpdfcomplaint:{type:String},
    uploadevidence:{type:String}

    //uploadpdfcomplaint
    //uploadevidence
  },
  { timestamps: true }
);

const complainModel = mongoose.model("complain", complainSchema);

module.exports = complainModel;
