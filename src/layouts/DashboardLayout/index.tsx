import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Menus/Sidebar";
import { TopBar } from "../../components/Menus/TopBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 max-h-screen overflow-y-scroll ms-18`}
      >
        <TopBar />
        <main className="flex-1 p-3 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
