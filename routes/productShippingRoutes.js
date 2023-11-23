const express = require("express");
const productShippingController = require("../controller/productShippingController");

const router = express.Router();

router.post("/create", productShippingController.createProductShipping);
router.get(
  "/product-shipping",
  productShippingController.getAllProductShippings
);
router.put("/update/:id", productShippingController.updateProductShipping);
router.delete("/delete/:id", productShippingController.deleteProductShipping);
router.get(
  "/product-shipping/:id",
  productShippingController.getProductShippingById
);

module.exports = router;
