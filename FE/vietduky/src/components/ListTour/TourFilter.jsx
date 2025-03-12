
import {useState} from "react";
import {Button, Card} from "react-bootstrap";

export default function TourFilter() {
    const [budget, setBudget] = useState(null);
    const [departure, setDeparture] = useState("Tất cả");
    const [destination, setDestination] = useState("Tất cả");
    const [date, setDate] = useState("");
    const [tourType, setTourType] = useState(null);
    return (
        <div>
                {/* Bộ lọc tìm kiếm */}
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

                        <h3 className="text-lg font-semibold mb-2 mt-4">Tour theo chủ đề</h3>
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
                </div>
    );
}
