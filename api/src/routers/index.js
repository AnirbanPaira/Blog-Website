const router = require("express").Router();
const User = require("../models/User-models");
const UserService = require("../services/User-services");
const UserRouter = require("./User-routes");
const PostRouter = require("./Post-routers");
const userService = new UserService();

router.use("/user/register", UserRouter);
router.use("/user/login", userService.createdLogin);
router.use("/user/posts", PostRouter);

module.exports = router;
