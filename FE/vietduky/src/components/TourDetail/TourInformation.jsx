import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TourInformation() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [serviceName, setServiceName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/tour/${id}`)
            .then(response => {
                const tourData = response.data.data;
                setTour(tourData);

                if (tourData.service_id) {
                    axios.get(`http://localhost:3000/api/service/${tourData.service_id}`)
                        .then(res => setServiceName(res.data.data.name_service))
                        .catch(error => console.error("Lỗi lấy dịch vụ:", error));
                }
            })
            .catch(error => console.error("Lỗi lấy tour:", error));
    }, [id]);

    if (!tour) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
            <div className="flex justify-between text-gray-700">
                <span><strong>Khởi hành từ:</strong> <span className="text-red-600">{tour?.startLocation?.name_location || "Không xác định"}</span></span>
                <span><strong>Mã Tour:</strong> <span className="text-red-600">{tour?.code_tour || "Chưa có mã"}</span></span>
            </div>
            <h2 className="mt-4 text-lg font-bold">Dịch vụ bao gồm</h2>
            <p className="text-gray-700">✔ {serviceName || "Không có dịch vụ"}</p>
        </div>
    );
}
