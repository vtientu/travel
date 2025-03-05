import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";


export default function LayoutLandingPage() {
    const scrollRefs = useRef([]);
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [activeTab, setActiveTab] = useState("Tất cả");
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [discountRes, tourRes, locationRes] = await Promise.all([
                    fetch("http://localhost:3000/api/discount-service/").then((res) => res.json()),
                    fetch("http://localhost:3000/api/tour").then((res) => res.json()),
                    fetch("http://localhost:3000/api/location/").then((res) => res.json()),
                ]);

                setTours(tourRes);
                setFilteredTours(tourRes);

                const cityList = ["Tất cả", ...locationRes.map((location) => location.name_location)];
                setCities(cityList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (activeTab === "Tất cả") {
            setFilteredTours(tours);
            return;
        }

        const fetchToursByLocation = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/tour/get-by-location-id/${activeTab}`);
                const data = await res.json();
                console.log(`Dữ liệu tour cho locationId (${activeTab}):`, data);

                if (Array.isArray(data)) {
                    setFilteredTours(data);
                } else {
                    setFilteredTours([]);
                }
            } catch (error) {
                console.error(`Lỗi khi fetch tour cho locationId (${activeTab}):`, error);
                setFilteredTours([]);
            }
        };

        fetchToursByLocation();
    }, [activeTab, tours]);

    const handleMouseDown = (index, e) => {
        if (!scrollRefs.current[index]) return;

        e.preventDefault(); // Ngăn chặn hành vi kéo thả mặc định
        const startX = e.clientX;
        const scrollLeft = scrollRefs.current[index].scrollLeft;

        const onMouseMove = (moveEvent) => {
            const x = moveEvent.clientX;
            const walk = (x - startX) * 2; // Điều chỉnh tốc độ cuộn
            scrollRefs.current[index].scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div>
            {/* Tour trong nước nổi bật */}
            <div className="p-6 relative w-3/5 mx-auto scrollbar-hide">
                <h2 className="text-xl font-bold">Tour trong nước nổi bật</h2>

                <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex space-x-6">
                        {cities.map((city) => (
                            <button
                                key={city}
                                className={`px-4 py-2 text-sm font-medium ${
                                    activeTab === city ? "text-red-700 border-b-2 border-red-700" : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab(city)}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                    <p className="text-red-600 font-medium cursor-pointer"
                       onClick={() => navigate("/listTour")}>
                        Xem tất cả chuyến đi ({activeTab})
                    </p>
                </div>

                {/* Danh sách tour với scroll ngang */}
                <div
                    className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab "
                    style={{ maxWidth: "72rem", scrollbarWidth: "none" }} // 4 thẻ ~ 72rem
                    ref={(el) => (scrollRefs.current[2] = el)}
                    onMouseDown={(e) => handleMouseDown(2, e)}
                >
                    {filteredTours.map((tour) => (
                        <div
                            key={tour.id}
                            className="w-72 bg-white shadow-lg rounded-lg overflow-hidden snap-center flex-shrink-0"
                        >
                            <img
                                src={tour.image || "/Image/Image [sc-fFubgz] (1).png"}
                                alt={tour.name_tour}
                                width={300}
                                height={200}
                                className="w-full"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{tour.name_tour}</h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-500 text-xs">📍 {tour.endLocation.name_location}</p>
                                </div>
                                <p className="text-gray-400 text-xs">{tour.activity_description}</p>
                                <p className="text-red-600 font-bold">VND: {tour.price_tour.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
