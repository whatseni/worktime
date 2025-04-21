"use client"

import PushNotificationManager from "@/components/PushNotificationManger";
import { useSession } from "@/context/LoginContext";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Manage() {
  const router = useRouter();
  const { getCompany, clearSession } = useSession();
  const handleLogout = async () => {
    const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/logout`);
    if (response.data.code === 200) {
      clearSession();
      router.replace('/login');
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white m-4">
      <h1 className="font-medium text-title-sm text-gray-700 text-center mt-4">설정</h1>
      <div className="flex justify-between m-4">
        <span className="text-theme-md text-gray-800">소속</span>
        <span>{getCompany()}</span>
      </div>

      {/* <div className="flex justify-between m-4">
        <span className="text-theme-md text-gray-800">알림</span>
        <PushNotificationManager />
      </div> */}

      <div className="border m-2"></div>

      <div className="flex flex-col items-center justify-center m-5">
        <button className="text-theme-md text-gray-600 border-none">비밀번호 변경</button>
        <button className="text-theme-sm text-gray-600 border-none" onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}
