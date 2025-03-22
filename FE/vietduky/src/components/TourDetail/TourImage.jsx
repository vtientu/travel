import { TourService } from "@/services/API/tour.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TourImage({ id }) {
    const [tourImage, setTourImage] = useState(null);

    useEffect(() => {
        TourService.getTour(id)
            .then((response) => {
                const tourData = response.data.data;
                setTourImage(tourData.image);
            })
            .catch((error) => console.error("Error fetching tour data:", error));
    }, [id]);

    return (
        <div>
            <img
                src={tourImage || "/Image/Overlay+Shadow.png"}
                alt="Ảnh Tour"
                className="w-full rounded-lg shadow-lg object-cover"
            />
        </div>
    );
}
