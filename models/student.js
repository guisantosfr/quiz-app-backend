const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  matricula: Number,
  name: String,
  email: String
});

module.exports = mongoose.model('Student', studentSchema);