const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/create", customerController.createCustomer);
router.put("/update/:id", customerController.updateCustomer);

module.exports = router;
