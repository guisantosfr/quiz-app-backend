const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: String,
  question: String,
  answer: String
});

module.exports = mongoose.model('Question', questionSchema);