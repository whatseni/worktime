import { Router } from "express";
import { loginAdmin } from "../controller/adminController";
import userRouter from "./userRoute";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controller/userController";
import timeRouter from "./timeRoute";
import {
  getAllUsersAllTimeByCompanyAndMonth,
  getAllUsersTimeByCompanyAndMonth,
} from "../controller/timeController";

const adminRouter = Router();

adminRouter.post("/login-admin", loginAdmin);

// 유저 관련
userRouter.post("/update-user", updateUser);
userRouter.post("/delete-user", deleteUser);
userRouter.post("/get-alluser", getAllUsers);
userRouter.post("/create-user", createUser);

// 타임 관련
// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
timeRouter.post("/get-alluser-time-month", getAllUsersTimeByCompanyAndMonth);

// 특정 회사의 모든 근로자의 한달 총 근로 시간 데이터 조회
timeRouter.post(
  "/get-alluser-alltime-month",
  getAllUsersAllTimeByCompanyAndMonth
);

export default adminRouter;
