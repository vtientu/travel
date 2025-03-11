import { useEffect, useState } from "react";

const PassengerInfoForm = ({ passengers }) => {
  const [passengerData, setPassengerData] = useState([]);
  const [assistance, setAssistance] = useState(false);

  const groupedPassengers = passengerData.reduce((acc, passenger) => {
    if (!acc[passenger.type]) {
      acc[passenger.type] = {
        label: passenger.label,
        desc: passenger.desc,
        list: [],
      };
    }
    acc[passenger.type].list.push(passenger);
    return acc;
  }, {});

  useEffect(() => {
    // Check if passengers is valid before updating
    if (passengers && typeof passengers === "object") {
      setPassengerData((prev) => {
        const newPassengers = [];
        Object.entries(passengers).forEach(([type, count]) => {
          for (let i = 0; i < count; i++) {
            newPassengers.push({
              type,
              label:
                type === "adult"
                  ? "Người lớn"
                  : type === "child"
                  ? "Trẻ em"
                  : "Em bé",
              desc:
                type === "adult"
                  ? "Từ 12 trở lên"
                  : type === "child"
                  ? "Từ 5 - 11 tuổi"
                  : "Dưới 2 tuổi",
              name: "",
              phone: "",
              gender: "",
              birthdate: "",
              singleRoom: false,
              note: "",
            });
          }
        });
        return newPassengers;
      });
    }
  }, [passengers]);

  const handleChangeInput = (index, field, value) => {
    setPassengerData((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleAssistanceChange = (e) => {
    setAssistance(e.target.checked);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900">
        Thông tin hành khách
      </h2>
      <div className="p-4 bg-[#ffe8eb] rounded-lg flex items-center gap-2.5">
        <input
          type="checkbox"
          name="assistance"
          checked={assistance}
          onChange={handleAssistanceChange}
          className="w-6 h-6 border border-[#5d5d5d] rounded-md"
        />
        <span className="text-sm font-semibold text-zinc-900/90">
          Tôi cần được nhân viên tư vấn VietDuKy trợ giúp nhập thông tin đăng ký
          dịch vụ
        </span>
      </div>
      <div className="border-b border-[#b1b1b1]" />
      <div className="w-full flex flex-row justify-end gap-4">
        <button
          type="button"
          className="w-1/4 py-2 bg-[#f8f8f8] border border-[#A80F21] font-semibold text-[#A80F21] rounded-md"
        >
          Tải danh sách mẫu
        </button>
        <button
          type="button"
          className="w-1/4 py-2 bg-[#A80F21] text-white rounded-md"
        >
          Thêm danh sách khách hàng
        </button>
      </div>
      {Object.entries(groupedPassengers).map(([type, group]) => (
        <div key={type} className="space-y-4">
          <h3 className="font-bold">
            <span className="font-bold">{group.label}</span>
            <span>({group.desc})</span>
          </h3>

          {group.list.map((passenger, index) => (
            <div key={index} className=" bg-white rounded-md">
              <div className="grid grid-cols-5 gap-4 mt-2 items-center">
                <div className="border-r border-gray-300">
                  <label className="text-sm font-semibold block mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={passenger.name}
                    onChange={(e) =>
                      handleChangeInput(index, "name", e.target.value)
                    }
                    placeholder="Liên hệ"
                    className="w-full p-2 rounded-md text-sm outline-none"
                  />
                </div>

                <div className="border-r border-gray-300">
                  <label className="text-sm font-semibold block mb-1">
                    Điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={passenger.phone}
                    onChange={(e) =>
                      handleChangeInput(index, "phone", e.target.value)
                    }
                    placeholder="Số điện thoại"
                    className="w-full p-2 rounded-md text-sm outline-none"
                  />
                </div>

                <div className="border-r border-gray-300">
                  <label className="text-sm font-semibold block mb-1">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) =>
                      handleChangeInput(index, "gender", e.target.value)
                    }
                    className="w-full p-2 text-sm outline-none focus:border-black transition-all bg-transparent appearance-none pr-6 bg-no-repeat bg-right text-gray-400"
                    style={{ appearance: "none" }}
                  >
                    <option value="" disabled hidden>
                      Chọn giới tính
                    </option>
                    <option value="male" className="text-black">
                      Nam
                    </option>
                    <option value="female" className="text-black">
                      Nữ
                    </option>
                  </select>
                </div>

                <div className="border-r border-gray-300">
                  <label className="text-sm font-semibold block mb-1">
                    Ngày sinh
                  </label>
                  <input
                    type="text"
                    name="birthdate"
                    value={passenger.birthdate}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={(e) =>
                      handleChangeInput(index, "birthdate", e.target.value)
                    }
                    placeholder="Chọn ngày sinh"
                    className="w-full p-2 text-sm outline-none focus:border-black transition-all bg-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Phòng đơn</label>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="singleRoom"
                      checked={passenger.singleRoom}
                      onChange={(e) =>
                        handleChangeInput(index, "singleRoom", e.target.checked)
                      }
                      className="hidden"
                      id={`singleRoomToggle-${index}`}
                    />
                    <label
                      htmlFor={`singleRoomToggle-${index}`}
                      className={`relative cursor-pointer w-10 h-5 rounded-full flex items-center transition-all ${
                        passenger.singleRoom ? "bg-red-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute w-4 h-4 bg-white rounded-full transition-all ${
                          passenger.singleRoom
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      ></span>
                    </label>

                    <span
                      className={`text-sm font-semibold ${
                        passenger.singleRoom ? "text-red-500" : "text-black"
                      }`}
                    >
                      240.000 ₫
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="border-b border-[#b1b1b1]" />
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Ghi chú</h3>
        <p className="text-base text-neutral-900">
          Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi
        </p>
        <textarea
          name="note"
          value={passengerData.note}
          onChange={handleChangeInput}
          placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
          className="p-4 w-full h-24 border rounded-md bg-[#f8f8f8]"
        />
      </div>
    </div>
  );
};

export default PassengerInfoForm;
