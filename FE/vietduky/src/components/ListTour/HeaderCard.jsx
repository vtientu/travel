import {Card} from "react-bootstrap";

export default function HeaderCard() {
    return (
            <Card className="p-6 w-full bg-transparent shadow-none">
                <nav className="text-sm text-gray-500 mb-2 text-left">
                    <span>Việt Du Ký</span> / <span className="text-red-600 font-semibold">Du lịch Việt Du Ký</span>
                </nav>
                <h1 className="text-2xl font-bold text-red-700 mb-4 text-center">DU LỊCH TOUR TRỌN GÓI</h1>
                <p className="text-gray-800 text-center w-4/5 mx-auto">
                    Tour du lịch <strong>[ĐỊA ĐIỂM]</strong> là hành trình lý tưởng để khám phá vẻ đẹp độc đáo của vùng đất này.
                    Với sự kết hợp hài hòa giữa cảnh quan thiên nhiên, di sản văn hóa và nhịp sống sôi động, tour mang đến cho
                    du khách những trải nghiệm đáng nhớ. Từ các điểm tham quan nổi tiếng, nền ẩm thực đặc sắc đến những hoạt động thú vị,
                    hành trình này hứa hẹn sẽ giúp du khách tận hưởng trọn vẹn vẻ đẹp và bản sắc riêng của <strong>[ĐỊA ĐIỂM]</strong>.
                </p>
            </Card>
    );
}
