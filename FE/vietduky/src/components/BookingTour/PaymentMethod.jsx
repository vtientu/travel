import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import CreditCardForm from "../CreditCard/CreditCardForm";

const paymentMethods = [
  { id: "bank-transfer", label: "Chuyển khoản", details: "Thông tin chuyển khoản chi tiết..." },
  { id: "credit", label: "Thẻ tín dụng", details: < CreditCardForm /> },
  { id: "qrpay", label: "Thanh toán QR", details: "Quét mã QR để thanh toán..." },
];

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-xl font-bold text-neutral-900">Các hình thức thanh toán</h2>
      
      {paymentMethods.map((method) => {
        const isSelected = selectedMethod === method.id;

        return (
          <div key={method.id} className="flex flex-col gap-2">
            <div
              className={`flex justify-between items-center p-4 rounded border cursor-pointer transition-all ${
                isSelected ? "border-red-500 bg-red-100" : "border-gray-400 bg-gray-100"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <span className="text-base font-bold text-neutral-900">{method.label}</span>
              <div
                className={`w-6 h-6 rounded-sm border flex items-center justify-center transition-all ${
                  isSelected ? "bg-[#A80F21] border-[#A80F21]" : "bg-white border-gray-600"
                }`}
              >
                {isSelected && <IoMdCheckmark className="text-white text-lg" />}
              </div>
            </div>

            {/* Nội dung chi tiết khi chọn phương thức */}
            {isSelected && (
              <div className="p-4 border border-red-500 bg-red-50 rounded">
                <p className="text-gray-700">{method.details}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
