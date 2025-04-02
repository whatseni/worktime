"use client"

import WeekList from "@/src/components/WeekList";
import { useSession } from "@/src/context/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLogin } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!isLogin()) {
      router.replace('/login')
    }
  }, [])
  return (
    <>
      <WeekList/>
    </>
  )
}