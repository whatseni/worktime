"use client"

import ProtectedRoute from "@/src/components/ProtectedRoute";
import { useSession } from "@/src/context/AdminContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Calendars = dynamic(() => import('@/src/components/Calendar'), {
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
    <ProtectedRoute>
      <Calendars />
    </ProtectedRoute>
  )
}