const db = require("../models");
const Voucher = db.Voucher;

// Hàm tạo mã voucher ngẫu nhiên
const generateVoucherCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Hàm kiểm tra mã voucher tồn tại
const isVoucherCodeExists = async (code) => {
    const existingVoucher = await Voucher.findOne({
        where: {voucher_code: code},
    });
    return existingVoucher !== null;
};

// Lấy danh sách tất cả Tour
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.findAll();
        res.json(vouchers);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving vouchers!",
            error: error.message,
        });
    }
};

//Lấy một Voucher theo ID
exports.getVoucherById = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({
                message: "Voucher not found!",
            });
        }
        res.json(voucher);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving voucher!",
            error: error.message,
        });
    }
};
//Lấy một Voucher theo ID
exports.getVoucherByCode = async (req, res) => {
    try {
        const voucher_code = req.params.voucher_code;
        const voucher = await Voucher.findOne({where: {voucher_code}});
        if (!voucher) {
            return res.status(404).json({
                message: "Voucher not found!",
            });
        }
        res.json(voucher);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving voucher!",
            error: error.message,
        });
    }
};

//Tạo một Voucher mới
exports.createVoucher = async (req, res) => {
    try {
        const {
            voucher_code,
            discount_percentage,
            discount_amount,
            status,
            quantity,
            start_date,
            end_date,
            title,
            sub_title,
            description
        } = req.body;
        const image = req.file ? req.file.path : null;

        if (!status || !quantity) {
            return res.status(400).json({
                message: "Please enter status and quantity!",
            });
        }

        let finalVoucherCode = voucher_code;

        if (!finalVoucherCode) {
            // Tạo mã mới và kiểm tra trùng lặp
            do {
                finalVoucherCode = generateVoucherCode();
            } while (await isVoucherCodeExists(finalVoucherCode));
        } else {
            // Kiểm tra mã voucher được nhập có trùng không
            if (await isVoucherCodeExists(finalVoucherCode)) {
                return res.status(400).json({
                    message: "Voucher code already exists!",
                });
            }
        }

        const data = {
            voucher_code: finalVoucherCode,
            discount_percentage,
            discount_amount,
            status,
            quantity,
            start_date,
            end_date,
            image,
        };

        const voucher = await Voucher.create(data);
        res.json({
            message: "Voucher created successfully!",
            data: voucher,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating voucher!",
            error: error.message,
        });
    }
};

//Xóa một Voucher theo ID
exports.deleteVoucher = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({
                message: "Voucher not found!",
            });
        }
        await voucher.destroy();
        res.json({
            message: "Voucher deleted successfully!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting voucher!",
            error: error.message,
        });
    }
};

//Cập nhật Voucher theo ID
exports.updateVoucher = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({
                message: "Voucher not found!",
            });
        }
        const {
            voucher_code,
            discount_percentage,
            discount_amount,
            status,
            quantity,
            start_date,
            end_date,
        } = req.body;
        const image = req.file ? req.file.path : null;

        if (voucher_code != undefined) voucher.voucher_code = voucher_code;
        if (discount_percentage != undefined)
            voucher.discount_percentage = discount_percentage;
        if (discount_amount != undefined) voucher.discount_amount = discount_amount;
        if (status != undefined) voucher.status = status;
        if (quantity != undefined) voucher.quantity = quantity;
        if (start_date != undefined) voucher.start_date = start_date;
        if (end_date != undefined) voucher.end_date = end_date;
        if (image != null) voucher.image = image;
        await voucher.save();
        res.json({
            message: "Voucher updated successfully!",
            data: voucher,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating voucher!",
            error: error.message,
        });
    }
};
