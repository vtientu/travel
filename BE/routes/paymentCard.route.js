const express = require("express");
const router = express.Router();
const paymentCardController = require("../controllers/paymentCard.controller");

router.get("/", paymentCardController.getAllPaymentCards);
router.get("/:id", paymentCardController.getPaymentCardById);
router.post("/create", paymentCardController.createPaymentCard);
router.put("/update/:id", paymentCardController.updatePaymentCard);
router.delete("/delete/:id", paymentCardController.deletePaymentCard);

module.exports = router;
