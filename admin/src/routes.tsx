import { useRoutes } from "react-router-dom";

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <MainPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ])
}