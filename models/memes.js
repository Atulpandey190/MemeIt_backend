const mongoose = require("mongoose");

// creating schema for our collection
const memeSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  tags: [String],
  memeImage: {
    type: String,
    required: true,
  }
});
//creating a new collection
const Meme = new mongoose.model("Meme", memeSchema);
module.exports = Meme;
