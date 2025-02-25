"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkTime = exports.deleteWorkTime = exports.updateWorkTime = exports.getUserAllTimeByMonth = exports.getUserTimeBySpecificDate = exports.getTimeByMonth = void 0;
const Time_1 = __importDefault(require("../model/Time"));
const func_1 = require("../utils/func");
const Code_1 = require("../utils/Code");
// 특정 회사의 특정 근로자가 한달동안 근무한 데이터 조회
const getTimeByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPhone, date } = req.body;
        // 선택된 월의 첫 번째 날
        const selectDate = new Date(date);
        let startMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1));
        // 다음 달의 첫 번째 날
        let endMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1));
        const result = yield Time_1.default.find({ userName: userName, userPhone: userPhone,
            workDate: {
                $gte: startMonth,
                $lt: endMonth
            }
        }, { _id: true, workDate: true, startTime: true, endTime: true });
        const transformedResult = result.map((entry) => {
            const start = (0, func_1.combineDateAndTime)(entry.workDate, entry.startTime);
            const end = (0, func_1.combineDateAndTime)(entry.workDate, entry.endTime);
            const { hours, minutes } = (0, func_1.calculateTimeDifference)(entry.startTime, entry.endTime);
            return {
                id: entry._id,
                title: `${hours}h ${minutes}m`,
                start: start,
                end: end
            };
        });
        res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: transformedResult });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.getTimeByMonth = getTimeByMonth;
// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 조회
const getUserTimeBySpecificDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPhone, date } = req.body;
        const result = yield Time_1.default.findOne({ userName: userName, userPhone: userPhone, workDate: new Date(date) });
        if (result)
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, isWorked: true, startTime: result.startTime, endTime: result.endTime });
        else
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, isWorked: false });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.getUserTimeBySpecificDate = getUserTimeBySpecificDate;
// 특정 회사의 특정 근로자가 한달동안 총 근무한 시간 데이터 조회
const getUserAllTimeByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPhone, date } = req.body;
        // 선택된 월의 첫 번째 날
        const selectDate = new Date(date);
        let startMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1));
        // 다음 달의 첫 번째 날
        let endMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1));
        const result = yield Time_1.default.find({ userName: userName, userPhone: userPhone, workDate: {
                $gte: startMonth,
                $lt: endMonth
            } });
        if (result) {
            const response = (0, func_1.getAllTime)(result);
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: {
                    'allTime': response
                } });
        }
        else {
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: {
                    'allTime': 0
                } });
        }
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.getUserAllTimeByMonth = getUserAllTimeByMonth;
// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 수정
const updateWorkTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, workDate, startTime, endTime } = req.body;
        // 타임 기록이 없다면 삽입 있다면 업데이트
        const updateTimeResult = yield Time_1.default.findOneAndUpdate({
            _id: id,
            workDate: new Date(workDate),
        }, {
            $set: {
                startTime: startTime,
                endTime: endTime,
            }
        }, {
            new: true, // 업데이트된 문서를 반환
            upsert: false // 문서가 없으면 새로 추가
        });
        res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: updateTimeResult === null || updateTimeResult === void 0 ? void 0 : updateTimeResult.workDate });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.updateWorkTime = updateWorkTime;
// 특정 회사의 특정 근로자가 해당 날짜 근무한 데이터 삭제
const deleteWorkTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const deleteTimeResult = yield Time_1.default.findOneAndDelete({ _id: id });
        if (deleteTimeResult) {
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: deleteTimeResult === null || deleteTimeResult === void 0 ? void 0 : deleteTimeResult.workDate });
        }
        else {
            throw new Error('Delete Failed');
        }
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.deleteWorkTime = deleteWorkTime;
// 특정 회사의 특정 근로자가 특정 날짜에 근무한 데이터 생성
const createWorkTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPhone, workDate, startTime, endTime, company } = req.body;
        const result = yield Time_1.default.create({
            userName: userName,
            userPhone: userPhone,
            workDate: new Date(workDate),
            startTime: startTime,
            endTime: endTime,
            company: company,
        });
        if (result)
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: result });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.createWorkTime = createWorkTime;
