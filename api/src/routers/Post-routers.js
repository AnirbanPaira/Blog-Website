const router = require("express").Router();

const PostService = require("../services/Post-services");
const postService = new PostService();

router.post("/", postService.create);

router.get("/", postService.fetch);
router.patch("/:id", postService.update);
router.delete("/:id", postService.delete);

module.exports = router;
