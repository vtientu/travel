import { TourService } from "@/services/API/tour.service";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopicTourCard from "./TopicTourCard";

export default function TopicTour({ topic }) {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await TourService.getTourByTopicId(topic.id);
        setTours(response.data.data.tours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [topic.id]);

  console.log("topic", tours);

  return (
    <div className="bg-transparent">
      <div className="py-10 w-4/5 mx-auto relative p-6 ">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">
            {topic.name}
          </p>
          <p className="text-zinc-900 mt-2">
            {topic.description}
          </p>
          <div className="w-1/5 h-1 bg-red-800 rounded-sm mt-2" />
        </div>

        <div className="flex flex-wrap justify-between gap-12 mt-6 mx-auto">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="relative box-border"
              onClick={() => navigate(`/tour/${tour.id}`)}
            >
              <TopicTourCard {...tour} userId={userId} />
            </div>
          ))}
        </div>
        {/* Nút xem thêm */}
        <div className="text-center mt-6">
          <button
            className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
            onClick={() => navigate("/listTour")}
          >
            Xem thêm Tours
          </button>
        </div>
      </div>
    </div>
  );
}
