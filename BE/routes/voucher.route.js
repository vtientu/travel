const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucher.controller");

router.get("/", voucherController.getAllVouchers);
router.get("/:id", voucherController.getVoucherById);
router.get("/code/:voucher_code", voucherController.getVoucherByCode);
router.post("/create", voucherController.createVoucher);
router.put("/update/:id", voucherController.updateVoucher);
router.delete("/delete/:id", voucherController.deleteVoucher);

module.exports = router;
