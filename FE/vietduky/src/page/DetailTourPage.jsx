import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import DatePicker from "react-datepicker";
import {useState} from "react";
import Note from "../components/TourDetail/Note.jsx";
import Feedback from "../components/TourDetail/Feedback.jsx";
import RelatedTours from "../components/TourDetail/RelatedTours.jsx";
import DepartureSchedule from "../components/TourDetail/DepartureSchedule.jsx";
import TourProgram from "../components/TourDetail/TourProgram.jsx";
import ExperienceOnTour from "../components/TourDetail/ExperienceOnTour.jsx";
import TourImage from "../components/TourDetail/TourImage.jsx";
import TourInformation from "../components/TourDetail/TourInformation.jsx";

export default function DetailTourPage() {
    const [selectedDate, setSelectedDate] = useState("2025-02-28");
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white" style={{ backgroundImage: "url('/Image/Background.png')", backgroundSize: "cover", backgroundPosition: "center", width: "100%", minHeight: "100vh" }}>
            <Header />
            <div className="container mx-auto py-8 px-4">
                {/* Breadcrumb */}
                <nav className="text-lg text-gray-500 mb-4">
                    Việt Du Ký / Du lịch Việt Du Ký / <span className="text-red-600 font-bold ">Tour Đà Nẵng 4N3Đ: HCM - Đà Nẵng - KDL Bà Nà - Sơn Trà - Hội An - Động Thiên Đường - Làng hương Thủy Xuân</span>
                </nav>

                {/* Tiêu đề Tour */}
                <h1 className="text-4xl font-bold text-red-600 ">Tour Đà Nẵng 4N3Đ: HCM - Đà Nẵng - KDL Bà Nà - Sơn Trà - Hội An - Động Thiên Đường - Làng hương Thủy Xuân</h1>

                {/* Thông tin Tour */}
                <div className="grid grid-cols-9 gap-6 mt-6">
                    <div className=" col-span-6 ">
                        {/*Ảnh Tour*/}
                       <TourImage/>

                        {/*Thông tin dịch vụ trong Tour*/}
                        <TourInformation/>

                        {/*Trải nghiệm trong Tour*/}
                        <ExperienceOnTour/>

                        {/*Chương trình Tour*/}
                        <TourProgram/>

                        {/* lịch khởi hành và giá */}
                        <DepartureSchedule/>

                        {/*Những thông tin cần lưu ý*/}
                        <Note/>
                    </div>

                    {/* Bảng giá và Lịch trình */}
                     <div className="p-4 rounded-lg col-span-3" style={{ height: "600px", backgroundColor: "#FEEEC7" }}>
                        <h2 className="text-lg font-bold text-red-600">Lịch Trình và Giá Tour</h2>
                        <p className="text-sm text-gray-600">Chọn Lịch Trình và Xem Giá:</p>
                        <div className="mt-2 flex gap-2">
                            <button className="bg-white px-4 py-2 rounded shadow border">28/02</button>
                            <button className="bg-white px-4 py-2 rounded shadow border">02/03</button>
                            <button className="bg-white px-4 py-2 rounded shadow border">07/03</button>
                            <div className="relative inline-block">
                                    {/* Nút mở dropdown */}
                                    <button
                                        className="bg-white px-4 py-2 rounded shadow border flex items-center"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <i className="fas fa-calendar"></i> Tất cả
                                    </button>

                                    {/* Dropdown lịch */}
                                    {isOpen && (
                                        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded p-2 z-50">
                                            <DatePicker
                                                inline
                                                selected={selectedDate}
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    setIsOpen(false);
                                                }}
                                            />
                                        </div>
                                    )}
                            </div>

                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Người lớn (11 tuổi) </span>
                                <span className="text-red-600 font-bold">x 7.990.000</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">2</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Trẻ em (5 - 11 tuổi)</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">0</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Trẻ em (2 - 4 tuổi)</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">0</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Trẻ nhỏ (2 tuổi)</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">0</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-right text-red-600 font-bold text-xl">Tổng Giá Tour: 15.980.000 VNĐ</p>
                        <button className="bg-yellow-500 w-full mt-4 py-2 rounded text-white font-bold">Đặt Tour</button>
                    </div>
                </div>

                {/*Feedback*/}
                <Feedback/>
                {/*Tour liên quan */}
                <RelatedTours/>
            </div>
            <Footer />
        </div>
    );
}
