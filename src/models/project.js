const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  //userId: { type: String, required: true, index: true },
  title: { type: String, required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
