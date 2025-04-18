import Icons from "../Icons/Icon";
import { excelDateToJSDate, formatDate } from "@/utils/dateUtil";
import { exportTemplate } from "@/utils/excelUtils";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const PassengerInfoForm = ({ passengers, onPassengerDataChange, setPassengers, roomCost, setRoomCost }) => {
  const [passengerData, setPassengerData] = useState([]);
  const [assistance, setAssistance] = useState(false);
  const [manualPassenger, setManualPassenger] = useState([false]);

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
    const newPassengers = [];

    ["adult", "toddler", "children", "infant"].forEach((type) => {
      const count = passengers[type] || 0;
      const existingPassengers = passengerData.filter((p) => p.type === type);

      for (let i = 0; i < count; i++) {
        if (existingPassengers[i]) {
          newPassengers.push(existingPassengers[i]);
        } else {
          newPassengers.push({
            id: `${type}-${i}-${Date.now()}`,
            type,
            label:
              type === "adult"
                ? "Người lớn"
                : type === "toddler"
                ? "Trẻ nhỏ"
                : type === "children"
                ? "Trẻ em"
                : "Em bé",
            desc:
              type === "adult"
                ? "Từ 12 trở lên"
                : type === "toddler"
                ? "Từ 2 - 4 tuổi"
                : type === "children"
                ? "Từ 5 - 11 tuổi"
                : "Dưới 2 tuổi",
            name: "",
            phone: "",
            gender: "",
            birthdate: "",
            passport: "",
            singleRoom: false,
          });
        }
      }
    });

    // Chỉ cập nhật state nếu dữ liệu thay đổi
    if (JSON.stringify(passengerData) !== JSON.stringify(newPassengers)) {
      setPassengerData(newPassengers);
      onPassengerDataChange(newPassengers);
    }
  }, [passengers]);

  useEffect(() => {
    onPassengerDataChange(passengerData);
    calculateRoomCost();
  }, [passengerData]);

  const handleChangeInput = (passengerId, field, value) => {
    setPassengerData((prev) => {
      const updatedPassengers = prev.map((p) => {
        if (p.id === passengerId) {
          return { ...p, [field]: value };
        }
        return p;
      });

      onPassengerDataChange(updatedPassengers);
      return updatedPassengers;
    });
  };

  const calculateRoomCost = () => {
    const roomCost = 240000; // Giá phòng đơn
    const totalRoomCost = passengerData.reduce((acc, passenger) => {
      if (passenger.type === "adult" && passenger.singleRoom) {
        acc += roomCost; // Cộng giá nếu là người lớn và có phòng đơn
      }
      return acc;
    }, 0);
    setRoomCost(totalRoomCost); // Cập nhật roomCost
  };

  const handleAssistanceChange = (e) => {
    setAssistance(e.target.checked);
  };

  const calculateAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const formattedData = data.map((row, index) => {
        const birthdate = row["Ngày sinh"]
          ? excelDateToJSDate(row["Ngày sinh"])
          : "";
        const age = birthdate ? calculateAge(birthdate) : null;

        let type = "adult"; // Mặc định là người lớn
        if (age !== null) {
          if (age < 2) type = "infant";
          else if (age < 5) type = "toddler";
          else if (age < 12) type = "children";
        }

        return {
          id: `${type}-${index}-${Date.now()}`, // Đảm bảo id là duy nhất
          name: row["Họ tên"] || "",
          phone: row["Số điện thoại"] || "",
          gender: row["Giới tính"]?.toLowerCase() === "nữ" ? "false" : "true",
          passport: row["CCCD/Hộ chiếu"] || "",
          birthdate,
          age,
          type,
          label:
            type === "adult"
              ? "Người lớn"
              : type === "toddler"
              ? "Trẻ nhỏ"
              : type === "children"
              ? "Trẻ em"
              : "Em bé",
          desc:
            type === "adult"
              ? "Từ 12 trở lên"
              : type === "toddler"
              ? "Từ 2 - 4 tuổi"
              : type === "children"
              ? "Từ 5 - 11 tuổi"
              : "Dưới 2 tuổi",
          singleRoom: false,
        };
      });

      // Cập nhật passengerData
      setPassengerData((prev) => {
        const combinedPassengers = [...prev, ...formattedData];

        // Tính toán số lượng hành khách cho từng loại
        const passengerCounts = {
          adult: combinedPassengers.filter((p) => p.type === "adult").length,
          toddler: combinedPassengers.filter((p) => p.type === "toddler").length,
          children: combinedPassengers.filter((p) => p.type === "children").length,
          infant: combinedPassengers.filter((p) => p.type === "infant").length,
        };

        // Cập nhật state passengers
        setPassengers(passengerCounts);
        onPassengerDataChange(passengerCounts);

        console.log("passengerCounts", passengerCounts);
        

        return combinedPassengers;
      });
    };
  };  

  console.log("Dữ liệu hành khách:", passengerData);

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
          onClick={exportTemplate}
          className="w-1/4 py-2 bg-[#f8f8f8] border border-[#A80F21] font-semibold text-[#A80F21] rounded-md flex items-center justify-center gap-2"
        >
          <img src={Icons.FileDown} alt="FileDown" className="w-4 h-4" />
          Tải danh sách mẫu
        </button>

        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="w-1/4 py-2 bg-[#A80F21] text-white text-center rounded-md cursor-pointer"
        >
          Thêm danh sách khách hàng
        </label>
      </div>

      {Object.entries(groupedPassengers).map(([type, group]) => (
        <div key={type} className="space-y-4">
          <h3>
            <span className="font-bold">{group.label}</span>{" "}
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
                      handleChangeInput(passenger.id, "name", e.target.value)
                    }
                    placeholder="Liên hệ"
                    className="w-full p-2 rounded-md text-sm outline-none"
                    required
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
                      handleChangeInput(passenger.id, "phone", e.target.value)
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
                      handleChangeInput(passenger.id, "gender", e.target.value)
                    }
                    className="w-full p-2 text-sm outline-none focus:border-black transition-all bg-transparent appearance-none pr-6 bg-no-repeat bg-right text-gray-400"
                    style={{ appearance: "none" }}
                    required
                  >
                    <option value="" disabled hidden>
                      Chọn giới tính
                    </option>
                    <option value="true" className="text-black">
                      Nam
                    </option>
                    <option value="false" className="text-black">
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
                      handleChangeInput(
                        passenger.id,
                        "birthdate",
                        e.target.value
                      )
                    }
                    placeholder="Chọn ngày sinh"
                    className="w-full p-2 text-sm outline-none focus:border-black transition-all bg-transparent"
                    required
                  />
                </div>

                {/* <div className="border-gray-300">
                  <label className="text-sm font-semibold block mb-1">
                    CCCD/Passport
                  </label>
                  <input
                    type="text"
                    name="passport"
                    value={passenger.passport}
                    onChange={(e) =>
                      handleChangeInput(passenger.id, "passport", e.target.value)
                    }
                    placeholder="CCCD/Passport"
                    className="w-full p-2 rounded-md text-sm outline-none"
                    required
                  />
                </div> */}

                {type === "adult" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Phòng đơn</label>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="singleRoom"
                        checked={passenger.singleRoom}
                        onChange={(e) =>
                          handleChangeInput(
                            passenger.id,
                            "singleRoom",
                            e.target.checked
                          )
                        }
                        className="hidden"
                        id={`singleRoomToggle-${passenger.id}`}
                      />
                      <label
                        htmlFor={`singleRoomToggle-${passenger.id}`}
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
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PassengerInfoForm;
