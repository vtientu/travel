export default function TourCard() {
    return (
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {/* Hình ảnh Tour */}
            <div className="w-1/3 relative">
                <img
                    src="https://i2.ex-cdn.com/crystalbay.com/files/content/2024/09/26/song-gianh-1-1724.jpg"
                    alt="Tour Image"
                    className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                    Từ Hồ Chí Minh
                </span>
            </div>

            {/* Nội dung Tour */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                {/* Tiêu đề */}
                <h3 className="text-lg font-semibold text-gray-900">
                    Du lịch Tây Bắc mùa Xuân - Hà Nội - Sapa - Bản Cát Cát - Chinh Phục Đỉnh Fansipan từ Sài Gòn 2025
                </h3>

                {/* Hành trình */}
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Hành trình:</span> Hà Nội - Sapa - Bản Cát Cát - Chinh Phục Đỉnh Fansipan
                </p>

                {/* Thông tin thời gian */}
                <div className="flex items-center space-x-2 mt-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded">
                        Thời gian
                    </span>
                    <span className="bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded">
                        3 ngày 2 đêm
                    </span>
                </div>

                {/* Khách sạn */}
                <p className="text-sm text-red-500 mt-2">Khách sạn 3*</p>

                {/* Ngày khởi hành */}
                <p className="text-xs text-gray-500">
                    05,12/01; 09,16,23/02; 02,09,16,23,30/03/2025
                </p>

                {/* Giá tour */}
                <div className="text-right text-red-600 font-bold text-xl mt-2">
                    7,199,000 đ
                </div>
            </div>
        </div>
    );
}
