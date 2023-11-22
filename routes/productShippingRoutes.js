const express = require("express");
const productShippingController = require("../controller/productShippingController");

const router = express.Router();

router.post(
  "/product-shipping",
  productShippingController.createProductShipping
);
router.get(
  "/product-shipping",
  productShippingController.getAllProductShippings
);
router.put(
  "/product-shipping/:id",
  productShippingController.updateProductShipping
);
router.delete(
  "/product-shipping/:id",
  productShippingController.deleteProductShipping
);
router.get(
  "/product-shipping/:id",
  productShippingController.getProductShippingById
);

module.exports = router;
