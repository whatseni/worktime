import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import sidebarConfig from './sidebarConfig/sidebarConfig';
import Page404 from "./page/Page404";

import { useSession } from "./component/context/sessionContext";
import User from "./page/User";
import Main from "./page/Main";
import Money from "./page/Money";
import Login from "./page/Login";

export default function Router() {
  const { getSessionEmail } = useSession();
  const account = getSessionEmail();
  const root_path_el = account === null ? <Login /> : <Navigate to="/dashboard/main" />;

  return useRoutes([
    {
      path: '/dashboard',
      element: <MainLayout sidebarConfig={sidebarConfig} />,
      children: [
        { element: <Navigate to="/dashboard/main" replace /> },
        { path: 'main', element: <Main /> },
        { path: 'money', element: <Money /> },
        { path: 'user', element: <User />}
      ]
    },
    {
      path: '/',
      element: <OtherLayout />,
      children: [
        { path: '/', element: root_path_el },
        { path: 'login', element: <Login /> },
        { path: '404', element: <Page404 /> },
        { path: '/dashboard', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}