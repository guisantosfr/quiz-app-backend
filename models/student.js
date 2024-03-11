const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String
});

module.exports = mongoose.model('Student', studentSchema);