import { Router } from "express";
import {
  deleteWorkTime,
  getUserAllTimeByMonth,
  getUserTimeBySpecificDate,
  getTimeByMonth,
  updateWorkTime,
  createWorkTime,
} from "../controller/timeController";

const timeRouter = Router();

// 특정 회사의 특정 근로자가 한달동안 근무한 데이터 조회
timeRouter.post("/get-user-time-month", getTimeByMonth);

// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 조회
timeRouter.post("/get-user-time-date", getUserTimeBySpecificDate);

// 특정 회사의 특정 근로자가 한달동안 총 근무한 시간 데이터 조회
timeRouter.post("/get-user-alltime-month", getUserAllTimeByMonth);

// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 수정
timeRouter.post("/update-worktime", updateWorkTime);

// 특정 회사의 특정 근로자가 특정 날짜 근무한 데이터 삭제
timeRouter.post("/delete-worktime", deleteWorkTime);

// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 생성
timeRouter.post("/create-worktime", createWorkTime);

export default timeRouter;
