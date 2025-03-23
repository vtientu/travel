import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TourService } from "@/services/API/tour.service";

export default function ExperienceOnTour({ id }) {

    const [tour, setTour] = useState(null);
    
    useEffect(() => {
        TourService.getTour(id)
          .then((response) => {
            setTour(response.data.data);
          })
          .catch((error) => console.error("Error fetching tour data:", error));
      }, [id]);
    
    if (!tour) return <p>Đang tải dữ liệu...</p>;
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
                <li>{tour.activity_description || "Chưa có mô tả"}.</li>
            </ul>
         </div>
    );
}
