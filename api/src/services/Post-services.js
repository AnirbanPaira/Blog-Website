const express = require("express");
const Posts = require("../models/Post-model");
class PostService {
  create(request, response) {
    const createposts = new Posts(request.body); // create new user object
    createposts
      .save() // save user to database
      .then((res) => {
        response.json(res);
      })
      .catch((err) => {
        response.send(err);
      });
  }

  fetch(request, response) {
    Posts.find()
      .then((resp) => {
        response.send(resp);
      })
      .catch((err) => {
        response.send(err);
      });
  }
  update(request, response) {
    console.log("update opened");
    Posts.findByIdAndUpdate(request.params.id, request.body, { new: true })
      .then((resp) => response.send(resp))
      .catch((err) => response.send(err));
  }
  delete(request, response) {
    console.log("delter opened");
    Posts.findByIdAndDelete(request.params.id)
      .then((resp) => response.send(resp))
      .catch((error) => response.send(error));
  }
}
module.exports = PostService;
