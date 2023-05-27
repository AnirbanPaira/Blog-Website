const express = require("express");
const user = require("../models/User-models");
class UserService {
  create(request, response) {
    const createuser = new user(request.body); // create new user object
    createuser
      .save() // save user to database
      .then((res) => {
        response.json(res);
      })
      .catch((err) => {
        response.send(err);
      });
  }

  fetch(request, response) {
    user
      .find()
      .then((resp) => {
        response.send(resp);
      })
      .catch((err) => {
        response.send(err);
      });
  }
  update(request, response) {
    user
      .findByIdAndUpdate(request.params.id, request.body, { new: true })
      .then((resp) => {
        response.send(resp);
      })
      .catch((err) => {
        response.send(err);
      });
  }

  createdLogin(request, response) {
    console.log("bbbbbbbbbb");
    const { name, password } = request.body;
    console.log(request.body);
    console.log("ccccccccccc");
    console.log(name);
    user
      .findOne({ name })
      .then((res) => {
        if (res) {
          console.log(res);
          console.log("aaaaaaaaaa");
          if (res.password != password) {
            response.status(400).send("Password not match");
          } else {
            response.status(200).send({ res });
          }
        } else {
          response
            .status(401)
            .send({ message: "Invalid username or password" });
        }
      })
      .catch((err) => {
        // handle any errors
        console.error(err);
        response.status(500).send("Internal server error");
      });
  }
}
module.exports = UserService;
