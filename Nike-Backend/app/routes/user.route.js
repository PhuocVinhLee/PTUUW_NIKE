const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();
router.route("/login").post(users.findUser);
router.route("/register").post(users.create);
router.route("/").get(users.cookie);
router.route("/logout").post(users.logout);

module.exports = router;
