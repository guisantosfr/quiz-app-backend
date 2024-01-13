const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizName: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Quiz', quizSchema);