import { Router } from "express";
import { loginUser } from "../controller/userController";

const userRouter = Router();

userRouter.post("/login-user", loginUser);

export default userRouter;
