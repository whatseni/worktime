import { Schema, model, Document } from "mongoose";


type Company = "PB" | "MEGA"
export interface UserInfoType {
  userName: string;
  userId: string;
  userPassword: string;
  userCompany: Company;
}

const userSchema = new Schema<UserInfoType>({
  userName: { type: String, required: true},
  userId: { type: String, required: true, unique: true},
  userPassword: { type: String, required: true},
  userCompany:  { type: String, required: true},
})

const User = model<UserInfoType>("User", userSchema);
export default User;

