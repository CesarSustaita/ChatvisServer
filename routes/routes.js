var express = require("express");
var userController = require("../database/usercontroller");
const router = express.Router();

router.post("/", userController.creaUser);
router.get("/", userController.allUser);
router.post("/login", userController.login);
router.delete("/:id", userController.deleteUser);

module.exports = router;
