import { Dayjs } from "dayjs";

export interface LoginParamsTypes {
  phoneNumber: string | null;
  birth: string | null;
}

export interface LoginReturnTypes {
  userName: string;
  userPhone: string;
  company: string;
}

export interface TimeParamsTypes {
  user: string | null;
  phone: string | null;
  company?: string | null;
  date?: string;
  start?: Dayjs | string | null;
  end?: Dayjs | string | null;
}

export interface EventType {
  title: string;
  start: Date;
  end: Date;
}
