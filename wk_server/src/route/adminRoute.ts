import { Router } from "express";
import { loginAdmin } from "../controller/adminController";

const adminRouter = Router();

adminRouter.post("/login-admin", loginAdmin)

export default adminRouter;