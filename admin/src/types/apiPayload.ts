import { Event } from "react-big-calendar";

export interface LoginParamsType {}

export interface UserParamsType {}

export type companyType = "PB" | "MEGA";

export interface GetAllUserParmsType {
  date: Date;
  company: string;
}

export interface RegisterParamsType {}

export interface CalEventType extends Event {
  id?: string | undefined;
}

export interface SelectUserType {
  userName?: string;
  userPhone?: string;
}

export interface UserListType {
  _id: string;
  userName: string;
  userPhone: string;
}

export interface TimesDataType {
  userId: string;
  userName: string;
  userRole: string;
  totalHours: number;
  totalMinutes: number;
}

export interface UsersDataType {
  _id: string;
  userName: string;
  userRole: string;
  isWeek: boolean;
  userPhone: string;
  userBirth: string;
  userBank: string;
  userBankAccount: string;
}