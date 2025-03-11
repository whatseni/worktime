import { Router } from "express";
import {
  createAdmin,
  createOrUpdateUser,
  deleteUsers,
  getAllUsersAllTimeByCompanyAndMonth,
  getAllUsersTimeByCompanyAndMonth,
  loginAdmin,
} from "../controller/adminController";
import { getAllUsers, getAllUsersName } from "../controller/userController";

const adminRouter = Router();

adminRouter.post("/login-admin", loginAdmin);
adminRouter.post("/create-admin", createAdmin);

// 유저 관련
adminRouter.post("/delete-user", deleteUsers);
adminRouter.post("/get-alluser-info", getAllUsers);
adminRouter.post("/get-alluser-name", getAllUsersName);
adminRouter.post("/create-or-update-user", createOrUpdateUser);

// 타임 관련
// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
adminRouter.post("/get-alluser-time-month", getAllUsersTimeByCompanyAndMonth);

// 특정 회사의 모든 근로자의 한달 총 근로 시간 데이터 조회
adminRouter.post(
  "/get-alluser-alltime-month",
  getAllUsersAllTimeByCompanyAndMonth
);

export default adminRouter;
