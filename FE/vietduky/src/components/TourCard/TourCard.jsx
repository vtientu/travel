import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

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
                    Tiết kiệm
                </span>
            </div>

            {/* Nội dung Tour */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                {/* Tiêu đề */}
                <h3 className="text-lg font-semibold text-gray-900">
                    Nha Trang - Biển Nhũ Tiên - Chùa Long Sơn - Làng gốm Bàu Trúc - Làng yến Mai Sinh - Khám phá cao...
                </h3>

                {/* Thông tin Tour */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                    <p><strong>Mã tour:</strong> <span className="font-bold"> NDSGN617</span> </p>
                    <p><strong>Khởi hành:</strong> <span className="text-red-600 font-bold">TP. Hồ Chí Minh</span></p>
                    <p><strong>Thời gian:</strong> <span className="font-bold"> 3N2Đ</span></p>
                    <p><strong>Dịch vụ:</strong> <span className="text-red-600 font-bold">Khách sạn 3*, Nhà h...</span></p>
                </div>

                {/* Ngày khởi hành */}
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm font-semibold">Ngày khởi hành:</span>
                    <div className="flex space-x-2">
                        <AiOutlineArrowLeft className="w-6 h-4 text-gray-600" />
                        <span className="px-2 py-1 border border-red-500 text-red-500 rounded text-xs">28/02</span>
                        <span className="px-2 py-1 border border-red-500 text-red-500 rounded text-xs">05/03</span>
                        <span className="px-2 py-1 border border-red-500 text-red-500 rounded text-xs">07/03</span>
                        <span className="px-2 py-1 border border-red-500 text-red-500 rounded text-xs">12/03</span>
                        <AiOutlineArrowRight className="w-6 h-4 text-gray-600" />
                    </div>
                </div>

                {/* Giá tour */}
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-600">Giá từ: 1.990.000 VNĐ</span>
                    <button className="bg-red-600 text-white text-sm py-2 px-4 rounded hover:bg-red-700">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
}
