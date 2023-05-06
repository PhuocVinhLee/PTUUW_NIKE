const express = require("express");
const admin = require("../controllers/admin.controller");

const router = express.Router();
router.route("/login").post(admin.findAdmin);
router.route("/register").post(admin.create);
router.route("/").get(admin.cookie);
router.route("/logout").post(admin.logout);

module.exports = router;
