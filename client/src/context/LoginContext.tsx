"use client"
import { createContext, useContext, useState } from 'react';

type UserContextType = {
  setSession: (id: string, company: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionStorage = window.sessionStorage;

  const setSession = (id: string, company: string) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('company', company)
  }

  return (
    <UserContext.Provider value={{ setSession }}>
      {children}
    </UserContext.Provider>
  )
}