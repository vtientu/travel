const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", authenticateUser, authenticateAdmin, customerController.getAllCustomers);
router.get("/profile", authenticateUser, customerController.getCustomerProfile);
router.put("/update-profile", authenticateUser, customerController.updateCustomerProfile);
router.post("/create", authenticateUser, customerController.createCustomer);
router.put(
  "/update/:id",
  authenticateUser,
  customerController.updateCustomer
);

module.exports = router;
