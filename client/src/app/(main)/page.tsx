"use client"

import WeekList from "@/src/components/WeekList";
import { useSession } from "@/src/context/LoginContext";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Home() {
  const { isLogin } = useSession();

  const handleLogout = async () => {
    const response = await axios('http://localhost:3000/api/logout');
    // router.replace('/login');
  }

  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.replace('/login')
  //   }
  // }, [])
  return (
    <>
      <WeekList/>
      <div onClick={handleLogout}>로그아웃</div>
    </>
  )
}