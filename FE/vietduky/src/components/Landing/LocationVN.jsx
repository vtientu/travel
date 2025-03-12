import {useState, useEffect} from "react";


export default function LocationVN() {
    const [discounts, setDiscounts] = useState([]);
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

    const destinations = [
        { name: "Đà Lạt", image: "/images/dalat.jpg", trips: 120 },
        { name: "Huế", image: "/images/hue.jpg", trips: 50 },
        { name: "Phú Quốc", image: "/images/phuquoc.jpg", trips: 30 },
        { name: "Hội An", image: "/images/hoian.jpg", trips: 15 },
        { name: "Cần Thơ", image: "/images/cantho.jpg", trips: 10 }
    ];

    return (

        <div className="bg-[#fdf6e3] py-10 px-5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800">Các điểm du lịch phổ biến</h2>
                <p className="text-red-500 font-medium mt-1">Bao La Thế Giới Bốn Bể Là Nhà</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
                    {destinations.map((place, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg">
                            <img
                                src={place.image}
                                alt={place.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                                <h3 className="text-white text-lg font-semibold">{place.name}</h3>
                                <p className="text-white text-sm">{place.trips} Hành Trình</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
