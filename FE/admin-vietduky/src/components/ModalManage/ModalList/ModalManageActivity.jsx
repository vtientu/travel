import { HiOutlineInbox } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getTravelTourByTourId } from "../../../services/API/travel_tour.service.js";

export default function ModalManageActivity({ tourId, onClose, tours = [] }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [travelTours, setTravelTours] = useState([]);

    useEffect(() => {
        const fetchTravelTours = async () => {
            try {
                const response = await getTravelTourByTourId(tourId);
                const data = response.travelTours || response;
                setTravelTours(Array.isArray(data) ? data : []);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu từ API", error);
                setTravelTours([]);
            }
        };

        fetchTravelTours();
    }, [tourId]);

    const handleWrapperClick = () => {
        onClose();
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleWrapperClick}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-[80%] h-[80%] overflow-auto " onClick={handleModalClick}>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <label className="font-medium">
                                Chương trình Tour
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Thêm chương trình
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="mt-4 mb-4 bg-white">
                            <table className="w-full border-collapse border rounded-lg shadow-md bg-white">
                                <thead>
                                <tr className="text-SmokyGray">
                                    <th className="p-2 ">Tiêu đề</th>
                                    <th className="p-2">Mô tả</th>
                                    <th className="p-2">Mô tả chi tiết</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="5" className="p-6 text-center">
                                        <div className="flex flex-col items-center h-[160px]">
                                            <div className="p-4 bg-gray-100 rounded-full mb-2">
                                                <HiOutlineInbox className="text-4xl text-gray-600" />
                                            </div>
                                            <p className="text-gray-600 text-md">
                                                Chưa có hành trình nào
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/*{isModalOpen && (*/}
                        {/*    <ModalAddProgram*/}
                        {/*        onClose={toggleModal}*/}
                        {/*        onAddTravelTour={handleAddTravelTour}*/}
                        {/*    />*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    );
}