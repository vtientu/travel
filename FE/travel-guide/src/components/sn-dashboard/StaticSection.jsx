import { TrendingUp } from "lucide-react";

const StaticSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">Thống kê tổng quan</h2>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl py-4 px-5 lg:px-10 flex flex-col gap-2">
          <h3 className="text-lg font-medium">Lịch trình hiện có</h3>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">100</h2>
            <div className="border border-green-800 bg-green-50 rounded-full px-1 text-green-800 flex flex-row gap-2 items-center">
              <p className="text-sm font-medium">+10 Tour</p>
              <TrendingUp width={15} height={15} strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 px-5 lg:px-10 flex flex-col gap-2">
          <h3 className="text-lg font-medium">Lịch trình hiện có</h3>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">100</h2>
            <div className="border border-green-800 bg-green-50 rounded-full px-1 text-green-800 flex flex-row gap-2 items-center">
              <p className="text-sm font-medium">+10 Tour</p>
              <TrendingUp width={15} height={15} strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 px-5 lg:px-10 flex flex-col gap-2">
          <h3 className="text-lg font-medium">Lịch trình hiện có</h3>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">100</h2>
            <div className="border border-green-800 bg-green-50 rounded-full px-1 text-green-800 flex flex-row gap-2 items-center">
              <p className="text-sm font-medium">+10 Tour</p>
              <TrendingUp width={15} height={15} strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 px-5 lg:px-10 flex flex-col gap-2">
          <h3 className="text-lg font-medium">Lịch trình hiện có</h3>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">100</h2>
            <div className="border border-green-800 bg-green-50 rounded-full px-1 text-green-800 flex flex-row gap-2 items-center">
              <p className="text-sm font-medium">+10 Tour</p>
              <TrendingUp width={15} height={15} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticSection;
