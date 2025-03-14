import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TourImage() {
    const { id } = useParams();
    const [tourImage, setTourImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/tour/${id}`)
            .then(response => {
                const tourData = response.data.data;
                setTourImage(tourData.image);
            })
            .catch(error => console.error("Lỗi lấy ảnh tour:", error));
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
