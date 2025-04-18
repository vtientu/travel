const db = require("../models");
const axios = require("axios");
const Booking = db.Booking;
const Payment = db.Payment;

//Lấy danh sách tất cả Payment Card
exports.checkPayment = async (req, res) => {
    const {paymentKey} = req.body;
    const {bookingId} = req.body;
    const {customerId} = req.body;
    const sheetId = "1XsZJdXUnFyGUk8QwLMT7BCDuRSNOjDiNB9UDn-bjArM";
    const apiKey = process.env.GOOGLE_API;
    const range = "Payment!A2:F100";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    console.log(url);
    try {
        const response = await axios.get(url);

        console.log("Data from Google Sheets API:", response.data);

        if (response.status === 200 && response.data.values) {
            let message = false;
            let amount = 0;

            response.data.values.forEach((value) => {
                const matches = value[1].toLowerCase().match(/start(.*?)end/i);
                if (matches && paymentKey.toLowerCase() === matches[1].trim()) {
                    message = true;
                    amount = parseInt(value[2]) * 1000;
                }
            });

            if (message) {
                // Cập nhật tất cả các fines có _id trong mảng fineId
                // const result = await Fines.updateMany(
                //     {_id: {$in: Array.isArray(fineId) ? fineId : [fineId]}},
                //     {
                //         status: "Paid",
                //         paymentMethod: "Casso",
                //         paymentDate: new Date(),
                //     }
                // );
                const booking = await Booking.findOne({
                    where: {
                        id: bookingId,
                    },
                });
                const existingPayment = await Payment.findOne({
                    where: {
                        booking_id: bookingId,
                    },
                });
                if (existingPayment) {
                    totalPayment = existingPayment.amount + amount;
                }
                if (totalPayment === booking.total_price) {
                    booking.status = 2;
                } else {
                    booking.status = 1;
                }
                await booking.save();
                const payment = await Payment.create({
                    customer_id: customerId,
                    booking_id: bookingId,
                    transactionCode: paymentKey,
                    amount: amount,
                });

                return res.status(200).json({message: "OK", data: payment});
            } else {
                return res
                    .status(500)
                    .json({error: "Không có giao dịch"});
            }
        }

        return res.status(500).json({
            error: "Không thể lấy dữ liệu từ Google Sheets",
            data: response.data.values,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res
            .status(500)
            .json({error: "Đã xảy ra lỗi trong quá trình xử lý"});
    }
};
exports.getPayment = async (req, res) => {
    const {paymentId} = req.body;
    const payment = await Payment.findOne({
        where: {
            id: paymentId,
        },
    });
    return res.status(200).json({message: "OK", data: payment});
};
exports.getPaymentByBookingId = async (req, res) => {
    const {bookingId} = req.body;
    const payment = await Payment.findOne({
        where: {
            booking_id: bookingId,
        },
    });
    return res.status(200).json({message: "OK", data: payment});
};
exports.getPaymentByCustomerId = async (req, res) => {
    const {customerId} = req.body;
    const payment = await Payment.findOne({
        where: {
            customer_id: customerId,
        },
    });
    return res.status(200).json({message: "OK", data: payment});
};
exports.getAllPayment = async (req, res) => {
    const payment = await Payment.findAll();
    return res.status(200).json({message: "OK", data: payment});
};