import { Schema, model } from "mongoose";

type Company = "PB" | "MEGA";
export interface UserInfoType {
  userName: string;
  userPhone: string; // id
  userBirth: string; // pw
  userCompany: Company;
  userRole: string;
  userBank: string;
  userBankAccount: string;
  isWeek: boolean; // 주휴
}

const userSchema = new Schema<UserInfoType>({
  userName: { type: String, required: true},
  userPhone: { type: String, required: true, unique: true},
  userBirth: { type: String, required: true},
  userCompany:  { type: String, required: true},
  userRole:  { type: String, required: true},
  userBank:  { type: String, required: true},
  userBankAccount:  { type: String, required: true},
  isWeek: { type: Boolean, required: true}
})

const User = model<UserInfoType>("users", userSchema);
export default User;