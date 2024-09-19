import { Router } from "express";
import { createWorkTime, deleteWorkTime, getAllUsersTimeByCompanyAndMonth, getUserTimeBySpecificDate, getUserWorkTimesByMonth, updateWorkTime } from "../controller/timeController";

const timeRouter = Router();

timeRouter.post("/create-worktime", createWorkTime)
timeRouter.post("/update-worktime", updateWorkTime)
timeRouter.post("/delete-worktime", deleteWorkTime)
timeRouter.post("/get-user-time-month", getUserWorkTimesByMonth)
timeRouter.post("/get-alluser-time-month", getAllUsersTimeByCompanyAndMonth)
timeRouter.post("/get-user-time-date", getUserTimeBySpecificDate)

export default timeRouter;