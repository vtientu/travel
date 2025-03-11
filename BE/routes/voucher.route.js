const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucher.controller");
const { uploadVoucher } = require("../utils/cloudinary");

router.get("/", voucherController.getAllVouchers);
router.get("/:id", voucherController.getVoucherById);
router.get("/code/:voucher_code", voucherController.getVoucherByCode);
router.post(
  "/create",
  uploadVoucher.single("image"),
  voucherController.createVoucher
);
router.put(
  "/update/:id",
  uploadVoucher.single("image"),
  voucherController.updateVoucher
);
router.delete("/delete/:id", voucherController.deleteVoucher);

module.exports = router;
