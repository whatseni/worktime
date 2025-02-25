"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeController_1 = require("../controller/timeController");
const timeRouter = (0, express_1.Router)();
// 특정 회사의 특정 근로자가 한달동안 근무한 데이터 조회
timeRouter.post("/get-user-time-month", timeController_1.getTimeByMonth);
// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 조회
timeRouter.post("/get-user-time-date", timeController_1.getUserTimeBySpecificDate);
// 특정 회사의 특정 근로자가 한달동안 총 근무한 시간 데이터 조회
timeRouter.post("/get-user-alltime-month", timeController_1.getUserAllTimeByMonth);
// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 수정
timeRouter.post("/update-worktime", timeController_1.updateWorkTime);
// 특정 회사의 특정 근로자가 특정 날짜 근무한 데이터 삭제
timeRouter.post("/delete-worktime", timeController_1.deleteWorkTime);
// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 생성
timeRouter.post("/create-worktime", timeController_1.createWorkTime);
exports.default = timeRouter;
