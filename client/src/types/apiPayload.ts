export interface LoginParamsTypes {
  phoneNumber: string | null;
  birth: string | null;
}

export interface LoginReturnTypes {
  userName: string;
  userPhone: string;
  company: string;
}
