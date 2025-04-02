"use client"

import { createContext, useContext, useEffect, useState } from 'react';

type AdminContextType = {
  setSession: (id: string, company: string) => void;
  clearSession: () => void;
  getId: () => string | null;
  getCompany: () => string | null;
  isLogin: () => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useSession must be used within a UserProvider");
  }
  return context;
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);

  // 클라이언트 사이드에서만 sessionStorage 사용
  useEffect(() => {
    const storedId = sessionStorage.getItem('id');
    const storedCompany = sessionStorage.getItem('company');
    if (storedId && storedCompany) {
      setSessionId(storedId);
      setCompany(storedCompany);
    }
    setReady(true);
  }, []); // 최초 한 번만 실행

  const setSession = (id: string, company: string) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('company', company);
    setSessionId(id);
    setCompany(company);
  }

  const clearSession = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('company');
    setSessionId(null);
    setCompany(null);
  }

  const getId = () => sessionId;

  const getCompany = () => company;

  const isLogin = () => !!sessionId && !!company;

  if (!ready) return null; // 로딩 중이면 null 반환

  return (
    <AdminContext.Provider value={{ setSession, clearSession, getId, getCompany, isLogin }}>
      {children}
    </AdminContext.Provider>
  )
}
