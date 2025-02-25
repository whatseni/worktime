"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const userController_1 = require("../controller/userController");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/login-admin", adminController_1.loginAdmin);
// 유저 관련
adminRouter.post("/delete-user", adminController_1.deleteUsers);
adminRouter.post("/get-alluser-info", userController_1.getAllUsers);
adminRouter.post("/get-alluser-name", userController_1.getAllUsersName);
adminRouter.post("/create-or-update-user", adminController_1.createOrUpdateUser);
// 타임 관련
// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
adminRouter.post("/get-alluser-time-month", adminController_1.getAllUsersTimeByCompanyAndMonth);
// 특정 회사의 모든 근로자의 한달 총 근로 시간 데이터 조회
adminRouter.post("/get-alluser-alltime-month", adminController_1.getAllUsersAllTimeByCompanyAndMonth);
exports.default = adminRouter;
