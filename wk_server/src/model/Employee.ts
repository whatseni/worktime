import { Schema, model } from "mongoose";

type Company = "PB" | "MEGA";
export interface EmployeeInfoType {
  employeeName: string;
  employeePhone: string; // id
  employeeBirth: string; // pw
  employeeCompany: Company;
}

const employeeSchema = new Schema<EmployeeInfoType>({
  employeeName: { type: String, required: true},
  employeePhone: { type: String, required: true, unique: true},
  employeeBirth: { type: String, required: true},
  employeeCompany:  { type: String, required: true},
})

const Employee = model<EmployeeInfoType>("employees", employeeSchema);
export default Employee;