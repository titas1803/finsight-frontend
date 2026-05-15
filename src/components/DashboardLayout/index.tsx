import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Menus/Sidebar";
import { TopBar } from "../Menus/TopBar";
import { useIsMobile } from "../../hooks/useIsMobile";
const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { windowWidth } = useIsMobile();

  useEffect(() => {
    if (windowWidth < 992) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [windowWidth]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((p) => !p)}
      />
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 max-h-screen overflow-y-scroll`}
        style={{ marginLeft: sidebarCollapsed ? "72px" : "240px" }}
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
