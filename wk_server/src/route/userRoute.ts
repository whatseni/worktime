import { Router } from "express";
import { createUser, deleteUser, getAllUsers, loginUser, updateUser } from "../controller/userController";

const userRouter = Router();

userRouter.post("/get-alluser", getAllUsers)
userRouter.post("/create-user", createUser)
userRouter.post("/login-user", loginUser)
userRouter.post("/update-user", updateUser)
userRouter.post("/delete-user", deleteUser)

export default userRouter;