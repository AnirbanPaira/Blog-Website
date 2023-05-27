const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  posts: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
  },
});

module.exports = mongoose.model("Users", schema);
