import { createContext, useState, useEffect, SetStateAction } from "react";

interface UserContextType {
  currentUser: null | string;
  setCurrentUser: React.Dispatch<SetStateAction<null | string>>;
  currentPhone: null | string;
  setCurrentPhone: React.Dispatch<SetStateAction<null | string>>;
  currentCompany: null | string;
  setCurrentCompany: React.Dispatch<SetStateAction<null | string>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const CurrentUserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  currentPhone: null,
  setCurrentPhone: () => {},
  currentCompany: null,
  setCurrentCompany: () => {},
});

function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<null | string>(
    () => localStorage.getItem("currentUser") || null
  );
  const [currentPhone, setCurrentPhone] = useState<null | string>(
    () => localStorage.getItem("currentPhone") || null
  );
  const [currentCompany, setCurrentCompany] = useState<null | string>(
    () => localStorage.getItem("currentCompany") || null
  );

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentPhone) {
      localStorage.setItem("currentPhone", currentPhone);
    } else {
      localStorage.removeItem("currentPhone");
    }
  }, [currentPhone]);

  useEffect(() => {
    if (currentCompany) {
      localStorage.setItem("currentCompany", currentCompany);
    } else {
      localStorage.removeItem("currentCompany");
    }
  }, [currentCompany]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentPhone,
        setCurrentPhone,
        currentCompany,
        setCurrentCompany,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, UserProvider };
