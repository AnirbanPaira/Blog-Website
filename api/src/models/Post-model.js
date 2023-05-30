const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  likes: { type: Number, default: 0 },
  dislikes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("posts", schema);
