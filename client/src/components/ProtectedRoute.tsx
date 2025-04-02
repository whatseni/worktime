"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../context/LoginContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getId } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!getId()) {
      router.push("/login");
    }
  }, [getId(), router]);

  return <>{children}</>;
};

export default ProtectedRoute;
