import {useState} from "react";

export default function Note() {
    const notes = [
        { title: "Giá tour bao gồm", content: "Các dịch vụ, ăn uống, khách sạn..." },
        { title: "Giá tour không bao gồm", content: "Chi phí cá nhân, vé tham quan..." },
        { title: "Lưu ý giá trẻ em", content: "Giá trẻ em áp dụng theo quy định..." },
        { title: "Điều kiện thanh toán", content: "Thanh toán 50% khi đặt tour..." },
        { title: "Điều kiện đăng ký", content: "Đăng ký trước 7 ngày..." },
        { title: "Lưu ý về chuyển hoặc hủy tour", content: "Hủy trước 5 ngày sẽ mất 30%..." },
        { title: "Các điều kiện hủy tour đối với ngày thường", content: "Hủy trước 3 ngày..." },
        { title: "Các điều kiện hủy tour đối với ngày lễ, Tết", content: "Hủy trước 7 ngày..." },
        { title: "Trường hợp bất khả kháng", content: "Trời mưa, thiên tai..." },
        { title: "Liên hệ", content: "Hotline: 0123 456 789" },
    ];
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
            <h2 className="text-center text-lg font-bold mb-4">Những thông tin cần lưu ý</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700">{note.title}</h3>
                            <span className="text-gray-500">{openIndex === index ? "▲" : "▼"}</span>
                        </div>
                        {openIndex === index && <p className="mt-2 text-gray-600">{note.content}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
