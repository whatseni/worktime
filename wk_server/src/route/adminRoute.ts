import { Router } from "express";
import { createUser, deleteUser, getAllUsersAllTimeByCompanyAndMonth, getAllUsersTimeByCompanyAndMonth, loginAdmin, updateUser } from "../controller/adminController";
import {
  getAllUsers,
  getAllUsersName,
} from "../controller/userController";

const adminRouter = Router();

adminRouter.post("/login-admin", loginAdmin);

// 유저 관련
adminRouter.post("/update-user", updateUser);
adminRouter.post("/delete-user", deleteUser);
adminRouter.post("/get-alluser-info", getAllUsers);
adminRouter.post("/get-alluser-name", getAllUsersName);
adminRouter.post("/create-user", createUser);

// 타임 관련
// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
adminRouter.post("/get-alluser-time-month", getAllUsersTimeByCompanyAndMonth);

// 특정 회사의 모든 근로자의 한달 총 근로 시간 데이터 조회
adminRouter.post(
  "/get-alluser-alltime-month",
  getAllUsersAllTimeByCompanyAndMonth
);

export default adminRouter;
