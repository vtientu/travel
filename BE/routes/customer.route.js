const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", authenticateAdmin, customerController.getAllCustomers);
router.get(
  "/:id",
  authenticateUser,
  authenticateAdmin,
  customerController.getCustomerById
);
router.post("/create", authenticateAdmin, customerController.createCustomer);
router.put(
  "/update/:id",
  authenticateUser,
  authenticateAdmin,
  customerController.updateCustomer
);

module.exports = router;
