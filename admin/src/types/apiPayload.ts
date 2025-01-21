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