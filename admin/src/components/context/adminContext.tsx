import { createContext, useState, useEffect, SetStateAction } from "react";
import { companyType } from "../../types/apiPayload";

interface AdminContextType {
  currentAdmin: null | string;
  setCurrentAdmin: React.Dispatch<SetStateAction<null | string>>;
  currentCompany: null | companyType;
  setCurrentCompany: React.Dispatch<SetStateAction<null | companyType>>;
}

interface AdminProviderProps {
  children: React.ReactNode;
}

const CurrentAdminContext = createContext<AdminContextType>({
  currentAdmin: null,
  setCurrentAdmin: () => {},
  currentCompany: null,
  setCurrentCompany: () => {},
});

function AdminProvider({ children }: AdminProviderProps) {
  const [currentAdmin, setCurrentAdmin] = useState<null | string>(
    () => localStorage.getItem("currentAdmin") || null
  );
  const [currentCompany, setCurrentCompany] = useState<null | companyType>(
    () => localStorage.getItem("currentCompany") as companyType || null
  );

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem("currentAdmin", currentAdmin);
    } else {
      localStorage.removeItem("currentAdmin");
    }
  }, [currentAdmin]);

  useEffect(() => {
    if (currentCompany) {
      localStorage.setItem("currentCompany", currentCompany);
    } else {
      localStorage.removeItem("currentCompany");
    }
  }, [currentCompany]);

  return (
    <CurrentAdminContext.Provider
      value={{
        currentAdmin,
        setCurrentAdmin,
        currentCompany,
        setCurrentCompany,
      }}
    >
      {children}
    </CurrentAdminContext.Provider>
  );
}

export { CurrentAdminContext, AdminProvider };
