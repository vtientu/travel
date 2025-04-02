const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/check", paymentController.checkPayment);
// router.get("/:id", paymentCardController.getPaymentCardById);

module.exports = router;
