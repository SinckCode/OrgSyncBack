const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  managerId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Manager', managerSchema);
