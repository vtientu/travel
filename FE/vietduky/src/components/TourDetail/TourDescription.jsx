import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TourDescription() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/tour/${id}`)
            .then(response => {
                const tourData = response.data.data;
                setTour(tourData);
            })
            .catch(error => console.error("Lỗi lấy thông tin tour:", error));
    }, [id]);
    if (!tour) return <p>Đang tải dữ liệu...</p>;

    return (
            <div>
                {/* Breadcrumb */}
                <nav className="text-lg text-gray-500 mb-4">
                    Việt Du Ký / Du lịch Việt Du Ký / <span className="text-red-600 font-bold ">{tour.name_tour || "Không có tên tour"} {tour.day_number || "Chưa cập nhật"}N{tour.day_number-1 || "Chưa cập nhật"}Đ: {tour.activity_description || "Chưa có mô tả"}</span>
                </nav>

                {/* Tiêu đề Tour */}
                <h1 className="text-4xl font-bold text-red-600 ">{tour.name_tour || "Không có tên tour"} {tour.day_number || "Chưa cập nhật"}N{tour.day_number-1 || "Chưa cập nhật"}Đ : {tour.activity_description || "Chưa có mô tả"}</h1>
            </div>
    );

}
