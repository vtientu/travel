const db = require("../models");
const Customer = db.Customer;
const User = db.User;

//Lấy danh sách tất cả Customer
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json({
      message: "Retrieve all customers successfully!",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving customers!",
      error: error.message,
    });
  }
};

//Lấy một Customer theo ID
exports.getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found!",
      });
    }
    res.json({
      message: "Retrieve customer successfully!",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving customer!",
      error: error.message,
    });
  }
};

//Tạo một Customer mới (id, user_id, first_name, last_name, email, gender, birth_date, number_phone)
exports.createCustomer = async (req, res) => {
  try {
    const { user_id, first_name, last_name, email } = req.body;
    if (!user_id || !first_name || !last_name || !email) {
      return res.status(400).json({
        message: "Please enter full information of customer!",
      });
    }

    //Kiểm tra xem user_id có tồn tại trong bảng User không
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const data = { user_id, first_name, last_name, email };
    const customer = await Customer.create(data);
    res.json({
      message: "Customer created successfully!",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating customer!",
      error: error.message,
    });
  }
};

//Cập nhật thông tin một Customer theo ID
exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      user_id,
      first_name,
      last_name,
      email,
      gender,
      birth_date,
      number_phone,
    } = req.body;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found!",
      });
    }

    if (user_id != undefined && user_id != customer.user_id) {
      customer.user_id = user_id;
    }
    if (first_name != undefined) {
      customer.first_name = first_name;
    }
    if (last_name != undefined) {
      customer.last_name = last_name;
    }
    if (email != undefined) {
      customer.email = email;
    }
    if (gender != undefined) {
      customer.gender = gender;
    }
    if (birth_date != undefined) {
      customer.birth_date = birth_date;
    }
    if (number_phone != undefined) {
      customer.number_phone = number_phone;
    }
    await customer.save();
    res.json({
      message: "Customer updated successfully!",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating customer!",
      error: error.message,
    });
  }
};
