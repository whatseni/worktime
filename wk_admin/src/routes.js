import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";

import { Suspense } from "react";
import MainLayout from "./layout";
import Users from "./pages/Users";
export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </MainLayout>
      ),
      children: [
        { element: <Navigate to="/calendar" replace /> },
        { path: 'calendar', element: <Calendar />},
        { path: 'users', element: <Users />}
      ]
    },
    {
      path: 'login',
      element: <Login/>
    },
  ])
}