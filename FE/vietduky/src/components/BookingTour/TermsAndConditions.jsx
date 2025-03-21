import { useState } from "react";
import TermsAndConditionsDoc from "./Terms&ConditionsDoc";
import "../../styles/index.css";

const TermsAndConditions = ({ agreed, setAgreed }) => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* <div className="text-xl font-bold text-neutral-900">
        Điều khoản bắt buộc khi đăng ký online
      </div>
      <div className=" h-[342px] p-5 bg-gray-100 rounded-[10px] border border-gray-400 flex justify-center items-center">
        <div className=" h-[300px] overflow-scroll scroll-hidden">
          <TermsAndConditionsDoc />
        </div>
      </div> */}
      <div className="flex items-center gap-2.5">
        <input
          type="checkbox"
          className="w-6 h-6 rounded-md border border-gray-600 cursor-pointer"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <p className="text-sm font-bold text-neutral-900">
          Tôi đồng ý với
          <span className="text-[#a80f21] cursor-pointer"> Chính sách </span>
          bảo vệ dữ liệu cá nhân và
          <span className="text-[#a80f21] cursor-pointer">
            {" "}
            các điều khoản.
          </span>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
