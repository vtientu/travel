export default function TourInformation() {

    return (
            <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
                <div className="flex justify-between text-gray-700 ">
                    <span><strong>Khởi hành từ:</strong> <span className="text-red-600">Hồ Chí Minh</span></span>
                    <span><strong>Mã Tour:</strong> <span className="text-red-600">TO4479</span></span>
                </div>
                <h2 className="mt-4 text-lg font-bold">Tour Trọn Gói Bao Gồm</h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <span>✔ Vé máy bay</span>
                    <span>✔ Xe tham quan</span>
                    <span>✔ Bảo hiểm du lịch</span>
                    <span>✔ Khách sạn 4*</span>
                    <span>✔ Vé tham quan</span>
                    <span>✔ Bữa ăn</span>
                    <span>✔ Hướng dẫn viên</span>
                </div>
        </div>
    );
}
