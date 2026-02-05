import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import "../styles/theme.css";
import "../styles/layout.css";

export default function MainLayout() {
  return (
    <div className="appShell">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
