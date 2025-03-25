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
  authenticateUser,
  authenticateAdmin,
  programDiscountController.createProgramDiscount
);
router.put(
  "/update/:id",
  authenticateUser,
  authenticateAdmin,
  programDiscountController.updateProgramDiscount
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  programDiscountController.deleteProgramDiscount
);

module.exports = router;
