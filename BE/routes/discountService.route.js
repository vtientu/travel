const express = require("express");
const router = express.Router();
const discountServiceController = require("../controllers/discountService.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", discountServiceController.getAllDiscountServices);
router.get(
  "/:id",
  authenticateUser,
  discountServiceController.getDiscountServiceById
);
router.post(
  "/create",
  authenticateStaff,
  authenticateAdmin,
  discountServiceController.createDiscountService
);
router.put(
  "/update/:id",
  authenticateStaff,
  authenticateAdmin,
  discountServiceController.updateDiscountService
);
router.delete(
  "/delete/:id",
  authenticateStaff,
  authenticateAdmin,
  discountServiceController.deleteDiscountService
);

module.exports = router;
