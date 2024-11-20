import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import sidebarConfig from './sidebarConfig/sidebarConfig';
import sidebarEmployeeConfig from "./sidebarConfig/sidebarEmployeeConfig";

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <MainLayout sidebarConfig={sidebarConfig} />,
      // children: [
      //   { path: 'calendar' },
      //   { path: 'employee' },
      // ]
    },
    {
      path: '/employee',
      element: <MainLayout sidebarConfig={sidebarEmployeeConfig} />
    },
    // {
    //   path: '/',
    //   element: <OtherLayout />,
    //   children: [
    //     { path: 'login' },
    //     { path: '404' },
    //     { path: '/dashboard', element: <Navigate to="/dashboard" /> },
    //     { path: '*', element: <Navigate to="/404" /> }
    //   ]
    // },
    // { path: '*', element: <Navigate to="/404" replace /> }
  ])
}