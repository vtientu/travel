const db = require("../models");
const axios = require("axios");

//Lấy danh sách tất cả Payment Card
exports.checkPayment = async (req, res) => {
  const { paymentKey } = req.body;
  const { bookingId } = req.body;
  const { customerId } = req.body;
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
          amount = parseInt(value[2], 10) * 1000;
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

        return res.status(200).json({ message: "Thành công" });
        // return res.status(200).json({message: "Thành công", data: result});
      } else {
        return res.status(500).json({ error: "Không có giao dịch" });
        // .json({error: "Không có giao dịch", data: response.data.values});
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
      .json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
};
