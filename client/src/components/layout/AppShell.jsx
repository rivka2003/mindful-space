import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <footer className="site-footer"><span>Mindful Space</span><p>A little more present. A little more you.</p><span>One moment at a time.</span></footer>
    </div>
  );
}

export default AppShell;
