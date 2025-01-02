import { Schema, model } from "mongoose";

type Company = "PB" | "MEGA";
export interface UserInfoType {
  userName: string;
  userPhone: string; // id
  userBirth: string; // pw
  userCompany: Company;
}

const userSchema = new Schema<UserInfoType>({
  userName: { type: String, required: true},
  userPhone: { type: String, required: true, unique: true},
  userBirth: { type: String, required: true},
  userCompany:  { type: String, required: true},
})

const User = model<UserInfoType>("users", userSchema);
export default User;