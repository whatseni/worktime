import { Outlet, useNavigate } from "react-router-dom";

export default function OtherLayout() {
  const navigate = useNavigate();
  return (
    <>
      <Outlet />
    </>
  )
}