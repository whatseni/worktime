import { createContext, SetStateAction, useState } from "react";

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
  setCurrentUser: () => { },
  currentPhone: null,
  setCurrentPhone: () => { },
  currentCompany: null,
  setCurrentCompany: () => { }
});

function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<null | string>(null);
  const [currentPhone, setCurrentPhone] = useState<null | string>(null);
  const [currentCompany, setCurrentCompany] = useState<null | string>(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, currentPhone, setCurrentPhone, currentCompany, setCurrentCompany }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, UserProvider };
