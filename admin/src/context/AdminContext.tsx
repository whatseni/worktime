"use client"
import { createContext, useContext, useState } from "react";

type AdminContextType = {
  id: string;
  company: string;
  login: (id: string, company: string) => void;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState("");
  const [company, setCompany] = useState("");

  const login = (id: string, company: string) => {
    setId(id);
    setCompany(company);
  };

  const logout = () => {
    setId("");
    setCompany("");
  };

  return (
    <AdminContext.Provider value={{ id, company, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
