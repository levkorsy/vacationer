var express = require("express");
var router = express.Router();
var UserController = require("../controllers/usersController");

/* POST NEW USER. */
router.post("/addnew", UserController.addNewUser);

router.post("/login", UserController.loginUser);

module.exports = router;
