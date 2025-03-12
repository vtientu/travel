export default function ExperienceOnTour() {

    return (
        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
            <div className="mt-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Trải nghiệm thú vị trong tour</h1>
                <div className="flex gap-2 mb-8 ">
                    <button className="bg-[#7300FF] text-white px-3 py-1.5 rounded-md shadow-md flex items-center text-sm font-medium">
                        <i className="fa fa-thumbs-up mr-2"></i> Like
                    </button>
                    <button className="bg-[#7300FF] text-white px-3 py-1.5 rounded-md shadow-md flex items-center text-sm font-medium">
                        <i className="fa fa-share mr-2"></i> Share
                    </button>
                </div>
            </div>
            <ul className="space-y-3 text-gray-700">
                <li>✅ <strong>Bà Nà Hills</strong> - Tiên cảnh chốn nhân gian: Check-in Cầu Vàng, trải nghiệm cáp treo và dạo bước trong khu làng Pháp.</li>
                <li>🏮 <strong>Phố cổ Hội An</strong> huyền bí: Ngắm đèn lồng lung linh, tham quan Chùa Cầu và những ngôi nhà cổ độc đáo.</li>
                <li>🛕 <strong>Sơn Trà - Linh Ứng Tự</strong>: Chiêm ngưỡng tượng Phật Quan Âm cao nhất Việt Nam, tận hưởng không khí trong lành.</li>
                <li>⛰️ <strong>Động Thiên Đường</strong>: Khám phá ‘Hoàng cung lòng đất’ với thạch nhũ tráng lệ và không gian huyền ảo.</li>
                <li>🌿 <strong>Làng hương Thủy Xuân</strong>: Trải nghiệm làm hương truyền thống, check-in cùng sắc màu rực rỡ.</li>
            </ul>
         </div>
    );
}
