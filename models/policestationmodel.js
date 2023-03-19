const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema({
  policeStationName: { type: String },
  phoneNumber: { type: Number },
  policeStationDistrict: { type: String },
  email: { type: String },
  policeStationRange: { type: String },
  Status: { type: Boolean },
});

const policeStationModel = mongoose.model("policeStation", policeStationSchema);

module.exports = policeStationModel;
