"use client"

import Loading from "@/components/common/Loading";
import { useSession } from "@/context/AdminContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicCalendars = dynamic(() => import('@/components/Calendar'), {
  ssr: false,
  loading: () => <Loading />
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
      <DynamicCalendars />
  )
}