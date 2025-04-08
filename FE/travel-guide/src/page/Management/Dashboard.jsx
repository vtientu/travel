import CalendarTravelTour from "../../components/ModalManage/ModalTour/CalendarTravelTour";
import StaticSection from "../../components/sn-dashboard/StaticSection";
import LayoutManagement from "../../layouts/LayoutManagement";

const Dashboard = () => {
  return (
    <LayoutManagement>
      <div className="h-full w-full p-5 gap-5 flex flex-col">
        <StaticSection />
        <CalendarTravelTour />
      </div>
    </LayoutManagement>
  );
};

export default Dashboard;
