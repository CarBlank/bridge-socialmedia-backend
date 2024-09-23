const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.get("/", UserController.getAll);
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getUsersByName);
router.delete("/:_id", UserController.deleteUser);
router.put("/:_id", UserController.update);

module.exports = router;
