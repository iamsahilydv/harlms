const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');

const complainModel = require("../models/complainmodel");

const complainController = express.Router();


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
});

//var upload = multer({ storage: storage }).single('uploadpdfcomplaint')

//for all complain creation
complainController.post("/create", upload.single("uploadpdfcomplaint"), async (req, res) => {
  //console.log(req.file.filename)
  const {
    author_id,highPriority, policerange, Designation, rangeDistrictName, policestation, phoneNumber, ComplainantName,
    ComplainantPhoneNumber, alternateNumber, FatherName, Address, Email, State, City, ComplaintCategory, ComplaintShortDescription,
     SectionsofComplaint, Range, SPName, Status, Markto, AddressLine1, Date, Issuedate, trackingId, complainDate, targetDate
  } = req.body;

//const {uploadpdfcomplaint}=req.file.filename;

  const complain = new complainModel({
    author_id,
    uploadpdfcomplaint: req.file?.filename ,
    uploadevidence:req.file?.filename ,
    highPriority,
    Designation,
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
    Markto,
    Date,
    Issuedate,
    trackingId,
    complainDate,
    targetDate
  });
  await complain.save();
  return res.status(200).send({ message: "complain register successfull",complain });
});

//for all user data
complainController.get("/allcomplain", async (req, res) => {
  const complain = await complainModel.find();
  res.send(complain);
});

//get complain by particular user id
complainController.get("/complainbyuser/:id", async (req, res) => {
  const id = req.params._id;
  const complain = await complainModel.find({ id });
  res.send(complain);
});

//get complain by particular complain id
complainController.get("/complain/:id", async (req, res) => {
  const id = req.params._id;
  const complain = await complainModel.find({ id });
  res.send(complain);
});

//to update any complain by complain id
complainController.put("/update/:id", async (req,res)=>{
  const id = req.params.id
  const complain = await complainModel.findByIdAndUpdate(
   id ,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).send(complain);
});


//delete complain by id 

complainController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const comp = await complainModel.findByIdAndRemove(id)
 res.send(comp)
}) 


// filter for adgp compain dashboard
complainController.get("/adgpfilter", async (req, res) => {
  const { fromdate, toDate, policestation,
    Status, ComplaintCategory, District, Range, rangeDistrictName } = req.query;

     const filter = {}
     
  if (fromdate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate};
  }
  if (fromdate  && toDate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate, $lte: toDate };
  }
     

        if (ComplaintCategory) {
          filter.ComplaintCategory = ComplaintCategory
         }

         if (ComplaintCategory && fromdate  && toDate) {
          filter.ComplaintCategory = ComplaintCategory,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
         }
        if (District) {
          filter.District = District
        }
        if (District && fromdate  && toDate) {
          filter.District = District,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
        }

       if (Status) {
        filter.Status = Status
      }
      if (Status && fromdate  && toDate) {
        filter.Status = Status,
        filter.complainDate = { $gte: fromdate, $lte: toDate };
      }
      
        if(rangeDistrictName){
           filter.rangeDistrictName = rangeDistrictName
        }

        if(rangeDistrictName && fromdate  && toDate){
          filter.rangeDistrictName = rangeDistrictName,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
       }
        if (Range) {
         filter.Range = Range
       }
       if (Range && fromdate  && toDate) {
        filter.Range = Range,
        filter.complainDate = { $gte: fromdate, $lte: toDate }
      }
       if (policestation) {
         filter.policestation = policestation
       }
       if (policestation && fromdate  && toDate) {
        filter.policestation = policestation,
        filter.complainDate = { $gte: fromdate, $lte: toDate }
      }
        if (rangeDistrictName && ComplaintCategory ) {
         filter.rangeDistrictName = rangeDistrictName,
         filter.ComplaintCategory = ComplaintCategory
       }  
       if (rangeDistrictName && ComplaintCategory && fromdate  && toDate) {
        filter.rangeDistrictName = rangeDistrictName,
        filter.ComplaintCategory = ComplaintCategory,
        filter.complainDate = { $gte: fromdate, $lte: toDate }
      }

       const complain = await complainModel.find(filter);

   res.send(complain);

});

// filter for sp compain dashboard
complainController.get("/spfilter", async (req, res) => {
  const {
    fromdate, toDate, policestation, Status, ComplaintCategory, rangeDistrictName, Designation} = req.query;

  const filter = {}
     
  if (fromdate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate};
  }
  if (fromdate  && toDate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate, $lte: toDate };
  }
     
        if (ComplaintCategory) {
          filter.ComplaintCategory = ComplaintCategory
         }

         if (ComplaintCategory && fromdate  && toDate) {
          filter.ComplaintCategory = ComplaintCategory,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
         }
        if (Designation) {
          filter.Designation = Designation
        }
        if (Designation && fromdate  && toDate) {
          filter.Designation = Designation,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
        }

       if (Status) {
        filter.Status = Status
      }
      if (Status && fromdate  && toDate) {
        filter.Status = Status,
        filter.complainDate = { $gte: fromdate, $lte: toDate };
      }
      
       if (policestation) {
         filter.policestation = policestation
       }
       if (policestation && fromdate  && toDate) {
        filter.policestation = policestation,
        filter.complainDate = { $gte: fromdate, $lte: toDate }
      }
        if (rangeDistrictName && ComplaintCategory ) {
         filter.rangeDistrictName = rangeDistrictName,
         filter.ComplaintCategory = ComplaintCategory
       }  
       if (rangeDistrictName && ComplaintCategory && fromdate  && toDate) {
        filter.rangeDistrictName = rangeDistrictName,
        filter.ComplaintCategory = ComplaintCategory,
        filter.complainDate = { $gte: fromdate, $lte: toDate }
      }
  
    
    const complain = await complainModel.find(filter);
    res.send(complain);
});

// filter for dsp/asp compain dashboard
complainController.get("/dspfilter", async (req, res) => {
  const { fromdate, toDate, policestation, Status, ComplaintCategory, Designation } = req.query;
  
    const filter = {}
     
  if (fromdate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate};
  }
  if (fromdate  && toDate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate, $lte: toDate };
  }
     
        if (ComplaintCategory) {
          filter.ComplaintCategory = ComplaintCategory
         }

         if (ComplaintCategory && fromdate  && toDate) {
          filter.ComplaintCategory = ComplaintCategory,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
         }
        if (Designation) {
          filter.Designation = Designation
        }
        if (Designation && fromdate  && toDate) {
          filter.Designation = Designation,
          filter.complainDate = { $gte: fromdate, $lte: toDate };
        }

       if (Status) {
        filter.Status = Status
      }
      if (Status && fromdate  && toDate) {
        filter.Status = Status,
        filter.complainDate = { $gte: fromdate, $lte: toDate };
      }
      
       if (policestation) {
         filter.policestation = policestation
       }
       if (policestation && fromdate  && toDate) {
        filter.policestation = policestation,
        filter.complainDate = { $gte: fromdate, $lte: toDate }
      }
            
    const complain = await complainModel.find(filter);
    res.send(complain);
  
});

// filter for sho compain dashboard
complainController.get("/shofilter", async (req, res) => {
  const { fromdate,toDate, Status, ComplaintCategory, Markto, io, fir } = req.query;


  const filter = {}
  if (fromdate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate};
  }
  if (fromdate  && toDate){
       // add 7 day to the end date
    filter.complainDate = { $gte: fromdate, $lte: toDate };
  }
  if (ComplaintCategory) {
   filter.ComplaintCategory = ComplaintCategory
  }
  if (ComplaintCategory && fromdate  && toDate) {
    filter.ComplaintCategory = ComplaintCategory
    
    filter.complainDate = { $gte: fromdate, $lte: toDate };
   }
  if (Status) {
   filter.Status = Status
 }
 if (fir) {
  filter.fir = fir
}
if (io) {
  filter.io = io
}
if (Markto) {
  filter.Markto = Markto
} 
if (Status && ComplaintCategory && io) {
  filter.Status = Status,
  filter.io = io,
  filter.ComplaintCategory = ComplaintCategory
} 
  if (Status && ComplaintCategory) {
   filter.Status = Status,
   filter.ComplaintCategory = ComplaintCategory
 } 
 
if ( ComplaintCategory && Markto) {
  filter.Markto = Markto,
  filter.ComplaintCategory = ComplaintCategory
} 
if (Status && Markto) {
  filter.Markto = Markto,
  filter.Status = Status
} 
if (Status && ComplaintCategory && Markto) {
  filter.Markto = Markto,
  filter.Status = Status,
  filter.ComplaintCategory = ComplaintCategory
} 

 const complain = await complainModel.find(filter);

res.send(complain);
});

module.exports = complainController;
