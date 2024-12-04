const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
  areaId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  building: { type: String },
});

module.exports = mongoose.model('Area', AreaSchema);
