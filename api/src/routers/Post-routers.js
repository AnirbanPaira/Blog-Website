const router = require("express").Router();

const PostService = require("../services/Post-services");
const postService = new PostService();

router.post("/", postService.create);

router.get("/", postService.fetch);
router.patch("/:id", postService.update);
router.delete("/:id", postService.delete);
// Route for liking a post
router.post("/:id/like", postService.like.bind(postService));
//route for disliing a post
console.log("hhhhhhhhhhhhhhhh");
router.post(":/id/dislike", postService.dislike.bind(postService));
module.exports = router;
