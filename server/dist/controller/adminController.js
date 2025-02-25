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
exports.deleteUsers = exports.createOrUpdateUser = exports.getAllUsersAllTimeByCompanyAndMonth = exports.getAllUsersTimeByCompanyAndMonth = exports.loginAdmin = void 0;
const Admin_1 = __importDefault(require("../model/Admin"));
const Code_1 = require("../utils/Code");
const Time_1 = __importDefault(require("../model/Time"));
const func_1 = require("../utils/func");
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = require("bcrypt");
const saltRounds = 12;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password } = req.body;
        const user = yield Admin_1.default.findOne({ id: id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const match = yield (0, bcrypt_1.compare)(password, user.password);
        if (match) {
            res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: {
                    id: user.id,
                    company: user.company
                } });
        }
        else {
            res.status(401).json({ code: Code_1.ReturnCode.SUCCESS, data: match });
        }
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error.message });
    }
});
exports.loginAdmin = loginAdmin;
// 특정 회사의 모든 근로자가 특정 월에 근무한 데이터 조회
const getAllUsersTimeByCompanyAndMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, company } = req.body;
        const selectDate = new Date(date);
        const startMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1));
        const endMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1));
        // MongoDB aggregate로 Time과 User 조인
        const result = yield Time_1.default.aggregate([
            {
                $match: {
                    company: company,
                    workDate: {
                        $gte: startMonth,
                        $lt: endMonth,
                    },
                },
            },
            {
                $lookup: {
                    from: "users", // users 컬렉션 이름
                    localField: "userName", // Time 컬렉션에서 조인할 필드
                    foreignField: "userName", // User 컬렉션의 연결 필드
                    as: "userInfo", // 조인 결과를 저장할 필드
                },
            },
            {
                $unwind: "$userInfo", // userInfo를 평탄화
            },
        ]);
        // 데이터를 변환하여 응답 형식에 맞게 처리
        const transformedResult = result.map((entry) => {
            const start = (0, func_1.combineDateAndTime)(entry.workDate, entry.startTime);
            const end = (0, func_1.combineDateAndTime)(entry.workDate, entry.endTime);
            const { hours, minutes } = (0, func_1.calculateTimeDifference)(entry.startTime, entry.endTime);
            return {
                id: entry._id,
                title: `${entry.userInfo.userName} ${hours}h ${minutes}m`,
                start: start,
                end: end,
            };
        });
        res.status(200).json({ code: Code_1.ReturnCode.SUCCESS, data: transformedResult });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.getAllUsersTimeByCompanyAndMonth = getAllUsersTimeByCompanyAndMonth;
const getAllUsersAllTimeByCompanyAndMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, company } = req.body;
        // 선택된 월의 첫 번째 날과 다음 달의 첫 번째 날
        const selectDate = new Date(date);
        const startMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth(), 1));
        const endMonth = new Date(Date.UTC(selectDate.getFullYear(), selectDate.getMonth() + 1, 1));
        const result = yield Time_1.default.aggregate([
            {
                $match: {
                    company: company,
                    workDate: { $gte: startMonth, $lt: endMonth },
                },
            },
            {
                $lookup: {
                    from: "users", // User 컬렉션 이름
                    localField: "userName", // Time 컬렉션에서 연결할 필드
                    foreignField: "userName", // User 컬렉션에서 연결할 필드
                    as: "userInfo", // 조인 결과를 저장할 필드
                },
            },
            {
                $unwind: "$userInfo", // 조인 결과를 평탄화
            },
            {
                $project: {
                    userName: 1,
                    userRole: "$userInfo.userRole", // User의 userRole 추가
                    userId: "$userInfo._id", // User의 _id 추가
                    workDuration: {
                        $subtract: [
                            {
                                $dateFromString: {
                                    dateString: {
                                        $concat: [
                                            {
                                                $dateToString: {
                                                    format: "%Y-%m-%d",
                                                    date: "$workDate",
                                                },
                                            },
                                            "T",
                                            "$endTime",
                                            "Z",
                                        ],
                                    },
                                },
                            },
                            {
                                $dateFromString: {
                                    dateString: {
                                        $concat: [
                                            {
                                                $dateToString: {
                                                    format: "%Y-%m-%d",
                                                    date: "$workDate",
                                                },
                                            },
                                            "T",
                                            "$startTime",
                                            "Z",
                                        ],
                                    },
                                },
                            },
                        ],
                    }, // 각 작업 시간 차이 계산
                },
            },
            {
                $group: {
                    _id: "$userName", // 사용자별로 그룹화
                    userId: { $first: "$userId" }, // 그룹의 첫 번째 userId 유지
                    userRole: { $first: "$userRole" }, // 그룹의 첫 번째 userRole 유지
                    totalMilliseconds: { $sum: "$workDuration" }, // 모든 작업 시간 합산
                },
            },
            {
                $project: {
                    _id: false,
                    userName: "$_id",
                    userId: 1,
                    userRole: 1,
                    totalHours: { $floor: { $divide: ["$totalMilliseconds", 3600000] } }, // 총 시간
                    totalMinutes: {
                        $floor: {
                            $mod: [{ $divide: ["$totalMilliseconds", 60000] }, 60],
                        },
                    }, // 총 분
                },
            },
        ]);
        if (result) {
            // const response = getAllTimeByUser(result);
            res.status(200).json({
                code: Code_1.ReturnCode.SUCCESS,
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error });
    }
});
exports.getAllUsersAllTimeByCompanyAndMonth = getAllUsersAllTimeByCompanyAndMonth;
// 생성 또는 수정
const createOrUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userPhone, // 고유 필드, 사용자 식별
        userName, userBirth, isWeek, userRole, userBank, userBankAccount, userCompany, id } = req.body;
        // `findOneAndUpdate`와 `upsert` 옵션 사용
        const user = yield User_1.default.findOneAndUpdate({ _id: id }, // 조건: userPhone 기준으로 사용자 검색
        {
            $set: {
                userName,
                userBirth,
                isWeek,
                userRole,
                userBank,
                userBankAccount,
                userCompany,
            },
        }, {
            new: true, // 업데이트된 문서를 반환
            upsert: true, // 없으면 새로 생성
        });
        res.status(200).json({
            code: Code_1.ReturnCode.SUCCESS,
            message: user ? "User updated successfully" : "User created successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error.message });
    }
});
exports.createOrUpdateUser = createOrUpdateUser;
// 특정 사용자 삭제
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selected } = req.body; // selected 배열: 삭제할 사용자들의 _id 값
        if (!Array.isArray(selected) || selected.length === 0) {
            return res.status(400).json({
                code: Code_1.ReturnCode.ERROR,
                message: "Invalid input: 'selected' should be a non-empty array.",
            });
        }
        // MongoDB의 $in 연산자를 사용해 배열의 모든 _id에 해당하는 문서 삭제
        const deleteResult = yield User_1.default.deleteMany({ _id: { $in: selected } });
        if (deleteResult.deletedCount > 0) {
            res.status(200).json({
                code: Code_1.ReturnCode.SUCCESS,
                message: `${deleteResult.deletedCount} users deleted successfully.`,
            });
        }
        else {
            res.status(404).json({
                code: Code_1.ReturnCode.ERROR,
                message: "No users found for deletion.",
            });
        }
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error.message });
    }
});
exports.deleteUsers = deleteUsers;
