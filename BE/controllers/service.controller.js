const db = require("../models");
const Service = db.Service;

// Lấy tất cả dữ liệu từ bảng Service
module.exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json({
      message: "Get all services successfully!",
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get all services failed!",
      error: error.message,
    });
  }
};

//Lấy dữ liệu từ bảng Service theo id
module.exports.getServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({
      message: "Get service by id successfully!",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get service by id failed!",
      error: error.message,
    });
  }
};

//Tạo mới dữ liệu trong bảng Service
module.exports.createService = async (req, res) => {
  try {
    const { name_service, price_service, description_service } = req.body;
    if (!name_service || !price_service || !description_service) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const newService = await Service.create({
      name_service,
      price_service,
      description_service,
    });
    res.status(201).json({
      message: "Create service successfully!",
      data: newService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create service failed!",
      error: error.message,
    });
  }
};

//Xóa dữ liệu trong bảng Service theo id
module.exports.deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    await service.destroy();
    res.json({
      message: "Delete service successfully!",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete service failed!",
      error: error.message,
    });
  }
};

//Cập nhật dữ liệu trong bảng Service theo id
module.exports.updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { name_service, price_service, description_service } = req.body;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (name_service !== undefined) service.name_service = name_service;
    if (price_service !== undefined) service.price_service = price_service;
    if (description_service !== undefined)
      service.description_service = description_service;

    await service.save();
    res.json({
      message: "Update service successfully!",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update service failed!",
      error: error.message,
    });
  }
};
