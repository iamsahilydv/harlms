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
  console.log(req.file.filename)
  const {
    author_id, policerange, Designation, rangeDistrictName, policestation, phoneNumber, ComplainantName,
    ComplainantPhoneNumber, alternateNumber, FatherName, Address, Email, State, City, ComplaintCategory, ComplaintShortDescription,
     SectionsofComplaint, Range, SPName, Status, Markto, AddressLine1, Date, Issuedate, trackingId, complainDate, targetDate
  } = req.body;

//const {uploadpdfcomplaint}=req.file.filename;

  const complain = new complainModel({
    author_id,
    uploadpdfcomplaint:req.file.filename,
    uploadevidence:req.file.filename,
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



complainController.get("/adgpfilter1", async (req, res) => {
   const { createdAt, toDate, policestation,
     Status, ComplaintCategory, District, Range, rangeDistrictName } =
     req.query;

      const filter = {}
      
         if (ComplaintCategory) {
          filter.ComplaintCategory = ComplaintCategory
         }
        if (District) {
           filter.District = District
         }
         if (Status) {
          filter.Status = Status
        }
         if(rangeDistrictName){
            filter.rangeDistrictName = rangeDistrictName
         }
         if (Range) {
          filter.Range = Range
        }
        if (policestation) {
          filter.policestation = policestation
        }
         if (rangeDistrictName && ComplaintCategory) {
          filter.rangeDistrictName = rangeDistrictName,
          filter.ComplaintCategory = ComplaintCategory
        }  

        const complain = await complainModel.find(filter);

    res.send(complain);
  })


// filter for adgp compain dashboard
complainController.get("/adgpfilter", async (req, res) => {
  // const { createdAt, toDate, policestation, Status, ComplaintCategory, district, Range } =
  //   req.query;

  if (createdAt && toDate && policestation && Status && ComplaintCategory && district && Range
  ) {
    const complain = await complainModel.find({
      $or: [{ createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } }, { policestation: policestation },
        { Status: Status}, { ComplaintCategory: ComplaintCategory}, { District: district }, { Range: Range },
      ],
    });
    res.send(complain);
  } else if ( createdAt && toDate && policestation && Status&& ComplaintCategory && district
  ) {
    const complain = await complainModel.find({
      $and: [ { createdAt: { $gt: createdAt, $lt: toDate  } }, { policestation: policestation },
         { Status: Status }, { ComplaintCategory: ComplaintCategory }, { District: district },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation && Status && ComplaintCategory) {
    const complain = await complainModel.find({
      $and: [ { createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } }, { policestation: policestation },
        { Status: Status }, { ComplaintCategory: ComplaintCategory},
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation && Status) {
    const complain = await complainModel.find({
      $and: [{ createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } }, { policestation: policestation },
        { Status: Status },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } },{ policestation: policestation },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate) {
    const complain = await complainModel.find({
      $and: [{ createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } }],
    });
    res.send(complain);
  } else {
    const complain = await complainModel.find();
    res.send(complain);
  }
});

// filter for sp compain dashboard
complainController.get("/spfilter", async (req, res) => {
  const {
    createdAt,
    toDate,
    policestation,
    status,
    category,
    district,
    policepost,
  } = req.body;

  if (
    createdAt &&
    toDate &&
    policestation &&
    status &&
    category &&
    district &&
    policepost
  ) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
        { ComplaintCategory: category },
        { District: district },
        { Designation: policepost },
      ],
    });
    res.send(complain);
  } else if (
    createdAt &&
    toDate &&
    policestation &&
    status &&
    category &&
    district
  ) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
        { ComplaintCategory: category },
        { District: district },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation && status && category) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
        { ComplaintCategory: category },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation && status) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate) {
    const complain = await complainModel.find({
      $and: [{ createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } }],
    });
    res.send(complain);
  } else {
    const complain = await complainModel.find();
    res.send(complain);
  }
});

// filter for dsp/asp compain dashboard
complainController.get("/dspfilter", async (req, res) => {
  const { createdAt, toDate, policestation, status, category, policepost } =
    req.body;

  if (createdAt && toDate && policestation && status && category && policepost) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
        { ComplaintCategory: category },
        { Designation: policepost },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation && status && category) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
        { ComplaintCategory: category },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation && status) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
        { Status: status },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate && policestation) {
    const complain = await complainModel.find({
      $and: [
        { createdAt: { $gt: createdAt } },
        { createdAt: { $lt: toDate } },
        { policestation: policestation },
      ],
    });
    res.send(complain);
  } else if (createdAt && toDate) {
    const complain = await complainModel.find({
      $and: [{ createdAt: { $gt: createdAt } }, { createdAt: { $lt: toDate } }],
    });
    res.send(complain);
  } else {
    const complain = await complainModel.find();
    res.send(complain);
  }
});

// filter for sho compain dashboard
complainController.get("/shofilter", async (req, res) => {
  const { complainDate, Status, ComplaintCategory, Markto, io, fir } = req.query;

  const filter = {}
  
 if(complainDate){
    filter.complainDate={ $gte: complainDate },
    filter.complainDate={ $lte: complainDate }
   } 
  if (ComplaintCategory) {
   filter.ComplaintCategory = ComplaintCategory
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
if (Status && ComplaintCategory && io) {
  filter.Status = Status,
  filter.io = io,
  filter.ComplaintCategory = ComplaintCategory
} 
  if (Status && ComplaintCategory) {
   filter.Status = Status,
   filter.ComplaintCategory = ComplaintCategory
 } 
 if (Markto) {
  filter.Markto = Markto
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
