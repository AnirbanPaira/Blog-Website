const express = require("express");
const Posts = require("../models/Post-model");
const { post } = require("../routers");
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
  async like(request, response) {
    const postId = request.params.id;

    try {
      Posts.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true })
        .then((res) => response.json(res))
        .catch((err) => response.status(500).json(err));
      // // Find the post in the database
      // const post = await Posts.findById(postId);

      // if (!post) {
      //   throw new Error("Post not found");
      // }

      // // Increment the like count
      // post.likes += 1;

      // // Save the updated post
      // const updatedPost = await post.save();

      // response.json({ likes: updatedPost.likes });
    } catch (error) {
      console.log("Error liking post:", error.message);
      response.status(500).json({ error: "Error liking post" });
    }
  }
  async dislike(request, response) {
    try {
      const postId = request.params.id;

      const updatedPost = await Posts.findByIdAndUpdate(
        postId,
        { $inc: { dislikes: 1 } },
        { new: true }
      );

      response.json(updatedPost);
    } catch (error) {
      console.log("Error disliking post:", error.message);
      response.status(500).json({ error: "Error disliking post" });
    }
  }
}
module.exports = PostService;
