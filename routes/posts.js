const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication, isAuthor } = require("../middlewares/authentication");

router.post("/", authentication, PostController.create);
router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.get("/title/:title", PostController.getPostsByTitle);
router.delete("/:_id", authentication, PostController.deletePost);
router.put("/:_id", authentication, isAuthor, PostController.update);
router.put ('/comments/:_id', authentication, PostController.insertComment)

router.get ('/', PostController.getAllPages)
router.get ('/name/:name', PostController.getPostsByTitle)
router.get ('/id/:_id',PostController.getById)

module.exports = router;
