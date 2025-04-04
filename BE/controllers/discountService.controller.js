const db = require("../models");
const DiscountService = db.DiscountService;
const ProgramDiscount = db.ProgramDiscount;
const TravelTour = db.TravelTour;

// Lấy tất cả dịch vụ giảm giá
exports.getAllDiscountServices = async (req, res) => {
  try {
    const discountServices = await DiscountService.findAll({
      include: [
        { model: ProgramDiscount, as: "programDiscount" },
        { model: TravelTour, as: "travelTour" },
      ],
    });
    res.status(200).json({
      message: "Lấy danh sách dịch vụ giảm giá thành công",
      data: discountServices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách dịch vụ giảm giá",
      error: error.message,
    });
  }
};

// Lấy dịch vụ giảm giá theo ID
exports.getDiscountServiceById = async (req, res) => {
  try {
    const discountServiceId = req.params.id;
    const discountService = await DiscountService.findByPk(discountServiceId, {
      include: [
        { model: ProgramDiscount, as: "programDiscount" },
        { model: TravelTour, as: "travelTour" },
      ],
    });
    if (!discountService) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dịch vụ giảm giá!" });
    }
    res.status(200).json({
      message: "Lấy dịch vụ giảm giá thành công",
      data: discountService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy dịch vụ giảm giá",
      error: error.message,
    });
  }
};

// Tạo dịch vụ giảm giá mới
exports.createDiscountService = async (req, res) => {
  try {
    const { travel_tour_id, program_discount_id } = req.body;

    const newDiscountService = await DiscountService.create({
      travel_tour_id,
      program_discount_id,
    });

    res.status(201).json({
      message: "Tạo dịch vụ giảm giá thành công!",
      data: newDiscountService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo dịch vụ giảm giá",
      error: error.message,
    });
  }
};

// Cập nhật dịch vụ giảm giá
exports.updateDiscountService = async (req, res) => {
  try {
    const discountServiceId = req.params.id;
    const { travel_tour_id, program_discount_id } = req.body;

    const discountService = await DiscountService.findByPk(discountServiceId);
    if (!discountService) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dịch vụ giảm giá!" });
    }

    discountService.travel_tour_id =
      travel_tour_id || discountService.travel_tour_id;
    discountService.program_discount_id =
      program_discount_id || discountService.program_discount_id;

    await discountService.save();

    res.status(200).json({
      message: "Cập nhật dịch vụ giảm giá thành công!",
      data: discountService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật dịch vụ giảm giá",
      error: error.message,
    });
  }
};

// Xóa dịch vụ giảm giá
exports.deleteDiscountService = async (req, res) => {
  try {
    const discountServiceId = req.params.id;

    const discountService = await DiscountService.findByPk(discountServiceId);
    if (!discountService) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dịch vụ giảm giá!" });
    }

    await discountService.destroy();

    res.status(200).json({
      message: "Xóa dịch vụ giảm giá thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa dịch vụ giảm giá",
      error: error.message,
    });
  }
};
