"use client"

import WeekList from "@/src/components/WeekList";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Home() {
  const handleLogout = async () => {
    const res = await axios('http://localhost:3000/api/logout')
    redirect('/login')
  }
  return (
    <>
      {/* <WeekList/> */}
      <div onClick={handleLogout}>로그아웃</div>
    </>
  )
}