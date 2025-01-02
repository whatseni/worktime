import { createContext, useContext } from "react";

export const SessionContext = createContext({
  sessionStorage: undefined,
  setSession() {},
  clearSession() {},
  getSessionEmail() {},
  getSessionCompany() {},
  getMaskedSession() {}
})

export const useSession = () => useContext(SessionContext)
export const SessionProvider = ({children}) => {
  const sessionStorage = window.sessionStorage;
    
  const setSession = (email, company) =>{
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('company', company);
  }

  const clearSession = () =>{
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('company');
  }

  const getSessionEmail = () => {
    return sessionStorage.getItem("email");
  }

  const getSessionCompany = () => {
    return sessionStorage.getItem("company");
  }

  const getMaskedSession = () => {
      const originEmail =  sessionStorage.getItem("email");
      if(originEmail === null) return null;

      var domain = originEmail.split('@')[1];

      // @ 뒤의 부분을 *로 대체
      var maskedDomain = '*'.repeat(domain.length);
  
      // 새로운 이메일 주소 생성
      var maskedEmail = originEmail.split('@')[0] + '@' + maskedDomain;
  
      return maskedEmail;
  }

  const initialValue = {
      sessionStorage,
      setSession,
      clearSession,
      getSessionEmail,
      getSessionCompany,
      getMaskedSession
  }
  
  return (
      <SessionContext.Provider value={initialValue}>{children}</SessionContext.Provider>
  )
}