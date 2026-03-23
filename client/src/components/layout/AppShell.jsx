import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppShell;
