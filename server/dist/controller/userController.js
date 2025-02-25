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
exports.loginUser = exports.getAllUsersName = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../model/User"));
const mongoose_1 = require("mongoose");
const Code_1 = require("../utils/Code");
// 모든 근로자 조회
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { company } = req.body;
        const result = yield User_1.default.find({
            userCompany: company
        });
        res.status(200).json({
            code: Code_1.ReturnCode.SUCCESS,
            message: "All users Success Find",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getAllUsersName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { company } = req.body;
        const result = yield User_1.default.find({
            userCompany: company
        }, {
            _id: false, userName: true, userPhone: true
        });
        res.status(200).json({
            code: Code_1.ReturnCode.SUCCESS,
            message: "All users Success Find",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error.message });
    }
});
exports.getAllUsersName = getAllUsersName;
// 근로자 로그인
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userPhone, userBirth } = req.body;
        const findOne = yield User_1.default.findOne({ userPhone: userPhone, userBirth: userBirth });
        if (findOne) {
            res.status(200).json({
                // 이름과 폰번호 반환
                code: Code_1.ReturnCode.SUCCESS,
                message: "user Access Success",
                data: {
                    userName: findOne.userName,
                    userPhone: findOne.userPhone,
                    company: findOne.userCompany
                }
            });
        }
        else {
            throw new mongoose_1.Error("user Access Failed");
        }
    }
    catch (error) {
        res.status(500).json({ code: Code_1.ReturnCode.ERROR, message: error.message });
    }
});
exports.loginUser = loginUser;
