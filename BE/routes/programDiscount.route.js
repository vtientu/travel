const express = require("express");
const router = express.Router();
const programDiscountController = require("../controllers/programDiscount.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", programDiscountController.getAllProgramDiscounts);
router.get("/:id", programDiscountController.getProgramDiscountById);
router.post(
  "/create",
  authenticateAdmin,
  authenticateStaff,
  programDiscountController.createProgramDiscount
);
router.put(
  "/update/:id",
  authenticateAdmin,
  authenticateStaff,
  programDiscountController.updateProgramDiscount
);
router.delete(
  "/delete/:id",
  authenticateAdmin,
  authenticateStaff,
  programDiscountController.deleteProgramDiscount
);

module.exports = router;
