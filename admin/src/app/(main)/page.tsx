"use client"

import { useSession } from "@/context/AdminContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Calendars = dynamic(() => import('@/components/Calendar'), {
  ssr: false,
  loading: () => <>loading...</>
})

export default function Main() {
  const { isLogin } = useSession();
  const router = useRouter();
  useEffect(() => {
    if(!isLogin()) {
      router.replace('/login')
    }
  }, [])
  return (
      <Calendars />
  )
}