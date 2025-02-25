const express = require("express");
const router = express.Router();
const programDiscountController = require("../controllers/programDiscount.controller");

router.get("/", programDiscountController.getAllProgramDiscounts);
router.get("/:id", programDiscountController.getProgramDiscountById);
router.post("/create", programDiscountController.createProgramDiscount);
router.put("/update/:id", programDiscountController.updateProgramDiscount);
router.delete("/delete/:id", programDiscountController.deleteProgramDiscount);

module.exports = router;
