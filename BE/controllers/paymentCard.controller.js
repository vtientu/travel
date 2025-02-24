const db = require("../models");
const PaymentCard = db.PaymentCard;
const Customer = db.Customer;

//Lấy danh sách tất cả Payment Card
exports.getAllPaymentCards = async (req, res) => {
  try {
    const cards = await PaymentCard.findAll();
    res.status(200).json({
      message: "Get payment cards successfully!",
      data: cards,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment cards",
      error: error.message,
    });
  }
};

// Lấy chi tiết PaymentCard theo ID
exports.getPaymentCardById = async (req, res) => {
  try {
    const card = await PaymentCard.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "PaymentCard not found!" });
    }
    res.status(200).json({
      message: "Get payment card successfully!",
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment card",
      error: error.message,
    });
  }
};

// Tạo PaymentCard mới cho Customer
exports.createPaymentCard = async (req, res) => {
  try {
    const {
      customer_id,
      card_number,
      card_holder_name,
      expiry_date,
      card_type,
    } = req.body;

    // Kiểm tra xem customer có tồn tại không
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    // Tạo mới PaymentCard
    const newCard = await PaymentCard.create({
      customer_id,
      card_number,
      card_holder_name,
      expiry_date,
      card_type,
    });

    res.status(201).json({
      message: "Payment card created successfully!",
      data: newCard,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating payment card",
      error: error.message,
    });
  }
};

// Cập nhật thông tin PaymentCard
exports.updatePaymentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      card_number,
      card_holder_name,
      expiry_date,
      card_type,
      is_default,
    } = req.body;

    const card = await PaymentCard.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: "PaymentCard not found!" });
    }

    if (card_number != undefined)
      card.card_number = card_number || card.card_number;
    if (card_holder_name != undefined)
      card.card_holder_name = card_holder_name || card.card_holder_name;
    if (expiry_date != undefined)
      card.expiry_date = expiry_date || card.expiry_date;
    if (card_type != undefined) card.card_type = card_type || card.card_type;
    if (is_default != undefined)
      card.is_default = is_default !== undefined ? is_default : card.is_default;

    await card.save();

    res.status(200).json({
      message: "Payment card updated successfully!",
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating payment card",
      error: error.message,
    });
  }
};

// Xóa PaymentCard theo ID
exports.deletePaymentCard = async (req, res) => {
  try {
    const id = req.params.id;

    const card = await PaymentCard.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: "PaymentCard not found!" });
    }

    // Xóa PaymentCard
    await card.destroy();

    res.status(200).json({
      message: "Payment card deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting payment card",
      error: error.message,
    });
  }
};
