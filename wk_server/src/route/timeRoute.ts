import { Router } from "express";
import { createWorkTime, deleteWorkTime, getAllUsersTimeByCompanyAndMonth, getUserWorkTimesByMonth, updateWorkTime } from "../controller/timeController";

const timeRouter = Router();

timeRouter.post("/create-worktime", createWorkTime)
timeRouter.post("/update-worktime", updateWorkTime)
timeRouter.post("/delete-worktime", deleteWorkTime)
timeRouter.post("/get-user-time-month", getUserWorkTimesByMonth)
timeRouter.post("/get-alluser-time-month", getAllUsersTimeByCompanyAndMonth)

export default timeRouter;