const express = require("express");
const product = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
  //.get(users.findEmail);
  .post(product.create)
  .get(product.findAll);


  router.route("/:id")
  .get(product.findOne)
  .put(product.update)
  .delete(product.delete);


  router.route("/category/:id")
  .get(product.findCategory);

module.exports = router;
/*
router.route("/")
   //.get(users.findEmail);
   .get(contacts.findAll)
   .post(contacts.create)
   .delete(contacts.deleteAll)

router.route("/favorite")
  .get(contacts.findAllFavorite);

router.route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.delete);
*/