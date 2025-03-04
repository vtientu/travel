import Header from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import RatingSection from "../../src/components/RatingSection/RatingSection";
import TourCard from "../../src/components/TourCard/TourCard";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import { ChevronDown } from "lucide-react";

export default function ListTour() {
  const [budget, setBudget] = useState(null);
  const [departure, setDeparture] = useState("Tất cả");
  const [destination, setDestination] = useState("Tất cả");
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState(null);
  const [sortOption, setSortOption] = useState("Ngày khởi hành gần nhất");

  return (
      <div className="bg-white" style={{backgroundImage: "url('/Image/Background.png')", backgroundSize: "cover", backgroundPosition: "center", width: "100%", minHeight: "100vh",}}>

        {/* Header */}
        <Header/>

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

        {/* Nội dung chính */}
        <div className="container mx-auto px-4 py-6">
        {/* Đánh giá + mô tả */}
        {/*<RatingSection />*/}

        {/* Bộ lọc tìm kiếm */}
        <h2 className="text-2xl font-bold bg-transparent text-gray-900 mb-4">
            Bộ lọc tìm kiếm
          </h2>
        <div className="flex flex-col md:flex-row gap-6 mt-6">

          {/* Bộ lọc bên trái */}
          <Card className="p-4 w-80 bg-white shadow-lg bg-opacity-60 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ngân sách:</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {["Dưới 5 triệu", "Từ 5 - 10 triệu", "Từ 10 - 20 triệu", "Trên 20 triệu"].map((item) => (
                  <Button
                      key={item}
                      variant={budget === item ? "default" : "outline"}
                      className="border rounded-lg px-4 py-2 whitespace-nowrap"
                      onClick={() => setBudget(item)}
                  >
                    {item}
                  </Button>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-2">Điểm khởi hành</h3>
            <select
                className="w-full p-2 border rounded"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            </select>

            <h3 className="text-lg font-semibold mb-2 mt-4">Điểm đến</h3>
            <select
                className="w-full p-2 border rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Nha Trang">Nha Trang</option>
            </select>

            <h3 className="text-lg font-semibold mb-2 mt-4">Ngày đi</h3>
            <input type="date" className="w-full p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} />

            <h3 className="text-lg font-semibold mb-2 mt-4">Dòng Tour</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {["Cao cấp", "Tiêu chuẩn", "Tiết kiệm", "Giá tốt"].map((item) => (
                  <Button
                      key={item}
                      variant={tourType === item ? "default" : "outline"}
                      className="border rounded-lg px-4 py-2"
                      onClick={() => setTourType(item)}
                  >
                    {item}
                  </Button>
              ))}
            </div>

            <Button className="w-full bg-red-600 text-white text-lg py-3 rounded-lg">Áp dụng</Button>
          </Card>

          {/* Danh sách Tour */}
          <div className="w-full md:w-3/4">
            <div className="flex items-center justify-between bg-transparent">
              {/* Ô tìm kiếm */}
              <input
                  type="text"
                  placeholder="Tìm kiếm bằng từ khóa"
                  className="p-2 border rounded-md w-1/2 outline-none focus:ring-2 focus:ring-gray-600"
              />

              {/* Bộ lọc sắp xếp */}
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-gray-600">Sắp xếp theo:</span>
                <button className="flex items-center gap-1 px-3 py-2 border rounded-md bg-white hover:bg-gray-200">
                  {sortOption} <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Danh sách Tour */}
            <div className="mt-4 space-y-4">
              <div className="text-lg font-medium text-gray-800">
                Chúng tôi tìm thấy{" "}
                <span className="font-bold text-red-600">100</span>{" "}
                chương trình tour cho quý khách
              </div>
              <TourCard />
              <TourCard />
            </div>

            {/* Nút Xem thêm */}
            <div className="text-center mt-6">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                XEM NHIỀU HƠN
              </button>
            </div>
          </div>

        </div>
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  );
}
