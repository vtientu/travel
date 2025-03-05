
import {useState} from "react";
import { ChevronDown } from "lucide-react";

export default function SearchBar() {

    const [sortOption, setSortOption] = useState("Ngày khởi hành gần nhất");

    return (
        <div>
            <div className="flex items-center justify-between bg-transparent">
                <input
                    type="text"
                    placeholder="Tìm kiếm bằng từ khóa"
                    className="p-2 border rounded-md w-1/2 outline-none focus:ring-2 focus:ring-gray-600"
                />

                {/* Bộ lọc sắp xếp */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-gray-600">Sắp xếp theo:</span>
                    <button className="flex items-center gap-1 px-3 py-2 border rounded-md bg-white hover:bg-gray-200">
                        {sortOption} <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            {/* Danh sách Tour */}
            <div className="mt-4 space-y-4">
                <div className="text-lg font-medium text-gray-800">
                    Chúng tôi tìm thấy{" "}
                    <span className="font-bold text-red-600">100</span>{" "}
                    chương trình tour cho quý khách
                </div>
            </div>
        </div>
    );
}
