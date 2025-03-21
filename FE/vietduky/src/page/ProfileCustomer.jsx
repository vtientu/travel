import BreadCrumbProfile from "@/components/BreadCrumb/BreadCrumbProfile";
import ProfileDetail from "@/components/ProfileDetail/ProfileDetail";
import SidebarProfile from "@/components/Sidebar/SidebarProfile";
import Layout from "@/layouts/LayoutAccountService";

const ProfileCustomer = () => {
  return (
    <Layout>
      <div className=" mx-auto p-5 flex flex-col md:flex-row gap-6">
        <SidebarProfile />
        <div className="flex-1 space-y-6">
          <BreadCrumbProfile />
          <ProfileDetail />
        </div>
      </div>
    </Layout>
  );
};

export default ProfileCustomer;
