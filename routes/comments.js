const express = require('express')
const router = express.Router()
const CommentController = require ("../controllers/CommentController")
router.post('/', CommentController.create)
router.put ('/posts/:_id', CommentController.insertComment)
router.post ('/',CommentController.update)
router.delete ('/',CommentController.delete)


module.exports = router