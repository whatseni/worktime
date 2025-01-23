import { Navigate, useRoutes } from "react-router-dom";

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { useContext } from "react";
import { CurrentAdminContext } from "./components/context/adminContext";
import NotFound from "./pages/NotFound";

export default function Router() {
  const { currentAdmin, currentCompany } = useContext(CurrentAdminContext);
  const root_path_el = currentAdmin === null && currentCompany === null ? <LoginPage /> : <Navigate to="/app" />;
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "/", element: root_path_el},
        { path: "login", element: <LoginPage />},
        { path: "app", element: <MainPage />},
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: "*", element: <Navigate to="/404" replace />
    }
  ])
}