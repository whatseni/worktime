import { Router } from "express";
import { createEmployee, deleteEmployee, getAllEmployees, loginEmployee, updateEmployee } from "../controller/employeeController";

const employeeRouter = Router();

employeeRouter.get("/get-alluser", getAllEmployees)
employeeRouter.post("/create-employee", createEmployee)
employeeRouter.post("/login-employee", loginEmployee)
employeeRouter.post("/update-employee", updateEmployee)
employeeRouter.post("/delete-employee", deleteEmployee)

export default employeeRouter;