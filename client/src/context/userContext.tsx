import { createContext, SetStateAction, useState } from "react";

interface UserContextType {
  currentUser: null | string;
  setCurrentUser: React.Dispatch<SetStateAction<null | string>>
}
interface UserProviderProps {
  children: React.ReactNode;
}
const CurrentUserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => { },
});

function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<null | string>(null);
  const [currentPhone, setCurrentPhone] = useState<null | string>(null);
  const [currentCompany, setCurrentCompany] = useState<null | string>(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, UserProvider };
