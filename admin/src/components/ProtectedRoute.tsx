// ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../context/AdminContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push("/login");
    }
  }, [id, router]);

  if (!id) {
    return null; // 혹은 로딩 스피너 등을 렌더링할 수 있습니다.
  }

  return <>{children}</>;
};

export default ProtectedRoute;
