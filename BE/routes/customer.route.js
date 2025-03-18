const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/", customerController.getAllCustomers);
router.get("/profile", authenticateUser, customerController.getCustomerProfile);
router.put("/update-profile", authenticateUser, customerController.updateCustomerProfile);
router.get("/:id", customerController.getCustomerById);
router.post("/create", customerController.createCustomer);
router.put("/update/:id", customerController.updateCustomer);

module.exports = router;
