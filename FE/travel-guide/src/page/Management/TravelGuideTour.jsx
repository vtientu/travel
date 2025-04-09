import { useState } from "react";
import TabsTour from "../../components/sn-travel-guide-tour/TabsTour";
import { Loader, Map, BaggageClaim } from "lucide-react";
import LayoutManagement from "../../layouts/LayoutManagement";
import InstructionSchedule from "../../components/sn-travel-guide-tour/InstructionSchedule";
import DepartureSchedulel from "../../components/sn-travel-guide-tour/DepartureSchedule";
import TravelTourPending from "../../components/sn-travel-guide-tour/TravelTourPending";

const TravelGuideTour = () => {
  const [value, setValue] = useState("schedule");

  return (
    <LayoutManagement title="Quản lý tour hướng dẫn">
      <div className="flex flex-col">
        <TabsTour tabs={TABS} value={value} onChange={setValue} />
      </div>
      {value === "schedule" && <InstructionSchedule />}
      {value === "departure" && <DepartureSchedulel />}
      {value === "waiting" && <TravelTourPending />}
    </LayoutManagement>
  );
};

export default TravelGuideTour;

const TABS = [
  {
    icon: <BaggageClaim />,
    label: "Lịch trình hướng dẫn",
    value: "schedule",
  },
  {
    icon: <Map />,
    label: "Danh sách lịch khởi hành",
    value: "departure",
  },
  {
    icon: <Loader />,
    label: "Tour chờ duyệt",
    value: "waiting",
  },
];
