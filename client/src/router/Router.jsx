import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import useAuth from "../hooks/useAuth";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import ContentPage from "../pages/ContentPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

function AdminRoute({ children }) {
  const { isAdmin, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <p className="status-text">Loading...</p>;
  }

  if (!isAdmin) {
    return <Navigate replace to="/" />;
  }

  return children;
}

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<AuthPage />} path="auth" />
        <Route element={<ContentPage />} path=":contentType" />
        <Route element={<ProfilePage />} path="profile" />
        <Route
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
          path="admin"
        />
      </Route>
    </Routes>
  );
}

export default AppRouter;
