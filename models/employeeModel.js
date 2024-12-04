const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeNumber: { type: Number, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  department1: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  department2: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  department3: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
