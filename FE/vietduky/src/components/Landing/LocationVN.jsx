import {useState, useRef, useEffect} from "react";


export default function LocationVN() {
    const [discounts, setDiscounts] = useState([]);
    const scrollRefs = useRef([]);
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [discountRes, tourRes, locationRes] = await Promise.all([
                    fetch("http://localhost:3000/api/discount-service/").then((res) => res.json()),
                    fetch("http://localhost:3000/api/tour").then((res) => res.json()),
                    fetch("http://localhost:3000/api/location/").then((res) => res.json()),
                ]);

                if (discountRes?.data) {
                    setDiscounts(discountRes.data);
                }

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
            {/* Khám phá địa điểm vui chơi ở Việt Nam */}
            <div className="p-6 relative w-3/5 mx-auto scrollbar-hide">
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-bold">
                        Khám phá địa điểm vui chơi ở Việt Nam
                    </h2>
                    <a href="#" className="text-red-600 hover:underline">
                        Xem tất cả
                    </a>
                </div>
                <div className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab" style={{ scrollbarWidth: "none" }} ref={(el) => (scrollRefs.current[4] = el)} onMouseDown={(e) => handleMouseDown(4, e)}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                            <img src="/Image/Div [afa2c-box] (1).png" alt="Khuyến mãi" className="rounded-lg pointer-events-none" style={{ display: "block", margin: "0 auto" }}/>
                            <p style={{marginTop: "8px", fontSize: "1rem", fontWeight: "500", textAlign: "center",}}>
                                Hồ Chí Minh
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
