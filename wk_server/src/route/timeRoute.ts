import { Router } from "express";
import { createWorkTime, deleteWorkTime, getAllUsersTimeByCompanyAndMonth, getUserAllTimeByMonth, getUserTimeBySpecificDate, getUserWorkTimesByMonth, updateWorkTime } from "../controller/timeController";

const timeRouter = Router();

timeRouter.post("/create-worktime", createWorkTime)
timeRouter.post("/update-worktime", updateWorkTime)
timeRouter.post("/delete-worktime", deleteWorkTime)

// 근로자 특정 월 근무 시간 데이터
timeRouter.post("/get-user-time-month", getUserWorkTimesByMonth)
// 모든 근로자 월 근무 시간 데이터
timeRouter.post("/get-alluser-time-month", getAllUsersTimeByCompanyAndMonth)
// 근로자 특정 날짜 근무 시간 데이터
timeRouter.post("/get-user-time-date", getUserTimeBySpecificDate)

// 근로자 특정 월 총 근무 시간
timeRouter.post("/get-user-alltime-month", getUserAllTimeByMonth)

export default timeRouter;