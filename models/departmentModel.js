const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
  },
});

module.exports = mongoose.model('Department', departmentSchema);
