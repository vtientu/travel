const express = require("express");
const router = express.Router();
const discountServiceController = require("../controllers/discountService.controller");

router.get("/", discountServiceController.getAllDiscountServices);
router.get("/:id", discountServiceController.getDiscountServiceById);
router.post("/create", discountServiceController.createDiscountService);
router.put("/update/:id", discountServiceController.updateDiscountService);
router.delete("/delete/:id", discountServiceController.deleteDiscountService);

module.exports = router;
