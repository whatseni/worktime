"use client"

import Loading from "@/components/common/Loading";
import { useSession } from "@/context/LoginContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicMain = dynamic(() => import('@/components/WeekList'), {
  ssr: false,
  loading: () => <Loading />
})

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
      <DynamicMain/>
    </>
  )
}