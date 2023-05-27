const router = require("express").Router();

const UserService = require("../services/User-services");
const userService = new UserService();

router.post("/", userService.create);

router.get("/", userService.fetch);
router.patch("/:id", userService.update);

module.exports = router;
