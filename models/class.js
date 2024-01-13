const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Class', classSchema);