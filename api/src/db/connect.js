const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Blogapi")
  .then(() => {
    console.log(`connection Successful`);
  })
  .catch((err) => {
    console.log(`connection not Successful`);
  });
