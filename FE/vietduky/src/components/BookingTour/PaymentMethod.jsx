import { useState } from "react";

const paymentMethods = [
  { id: "cash", label: "Tiền mặt" },
  { id: "credit", label: "Thẻ tín dụng" },
  { id: "zalo", label: "Thanh toán bằng Zalo" },
  { id: "vnpay", label: "Thanh toán VNPAY" },
];

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-xl font-bold text-neutral-900">Các hình thức thanh toán</h2>
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-md border border-gray-400 cursor-pointer"
          onClick={() => setSelectedMethod(method.id)}
        >
          <span className="text-base font-bold text-neutral-900">{method.label}</span>
          <div
            className={`w-6 h-6 rounded-md border border-gray-600 flex items-center justify-center transition-all ${
              selectedMethod === method.id ? "bg-red-500" : "bg-white"
            }`}
          >
            {selectedMethod === method.id && <div className="w-3 h-3 bg-white rounded-full" />}
          </div>
        </div>
      ))}
    </div>
  );
}
