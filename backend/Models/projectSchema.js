const mongoose = require("mongoose");

const descriptionPhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
});

const projectSchema = new mongoose.Schema({
  projectName: { 
      type: String, 
      required: true },
  category: {
    type: String,
    enum: ['home', 'commercial', 'hospitality'], 
    required: true
  },
  mainPhoto: { 
    type: String, 
    required: true },
  description: { 
    type: String, 
    required: true },
  descriptionPhotos: {
    type: [descriptionPhotoSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
