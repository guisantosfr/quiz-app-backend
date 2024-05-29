const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: String,
  topic: String,
  question: String,
  answer: Boolean
});

module.exports = mongoose.model('Question', questionSchema);