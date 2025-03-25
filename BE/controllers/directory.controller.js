const db = require("../models");
const Directory = db.Directory;
const Article = db.Article;

//Lấy ra tất cả các danh mục
exports.getAllDirectories = async (req, res) => {
  try {
    const directories = await Directory.findAll();
    res.status(200).json({
      message: "Get all directories successfully!",
      data: directories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving directories!",
      error: error.message,
    });
  }
};

//Thêm một danh mục mới
exports.createDirectory = async (req, res) => {
  try {
    const { name_directory, alias } = req.body;
    const directory = await Directory.create({
      name_directory,
      alias,
    });
    res.status(201).json({
      message: "Create directory successfully!",
      data: directory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating directory!",
      error: error.message,
    });
  }
};

//Cập nhật một danh mục
exports.updateDirectory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name_directory, alias } = req.body;
    const directory = await Directory.findByPk(id);
    if (!directory) {
      return res.status(404).json({
        message: "Directory not found!",
      });
    }
    if (name_directory != undefined) directory.name_directory = name_directory;
    if (alias != undefined) directory.alias = alias;
    await directory.save();
    res.status(200).json({
      message: "Update directory successfully!",
      data: directory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating directory!",
      error: error.message,
    });
  }
};

//Xóa một danh mục
exports.deleteDirectory = async (req, res) => {
  try {
    const id = req.params.id;
    const directory = await Directory.findByPk(id);
    if (!directory) {
      return res.status(404).json({
        message: "Directory not found!",
      });
    }
    await directory.destroy();
    res.status(200).json({
      message: "Delete directory successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting directory!",
      error: error.message,
    });
  }
};
