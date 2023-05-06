const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .post(orders.add_list_order)
   .get(orders.findAll)
   router.route("/:id")
   .get(orders.findOne)
   .put(orders.update)

module.exports = router;
