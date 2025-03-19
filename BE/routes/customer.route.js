const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

<<<<<<< Updated upstream
router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/create", customerController.createCustomer);
router.put("/update/:id", customerController.updateCustomer);
=======
router.get("/", authenticateAdmin, customerController.getAllCustomers);
router.get("/profile", authenticateUser, customerController.getCustomerProfile);
router.put("/update-profile", authenticateUser, customerController.updateCustomerProfile);
router.post("/create", authenticateAdmin, customerController.createCustomer);
router.put(
  "/update/:id",
  authenticateUser,
  authenticateAdmin,
  customerController.updateCustomer
);
>>>>>>> Stashed changes

module.exports = router;
