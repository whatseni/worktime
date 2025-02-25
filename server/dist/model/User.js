"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    userPhone: { type: String, required: true, unique: true },
    userBirth: { type: String, required: true },
    userCompany: { type: String, required: true },
    userRole: { type: String, required: true },
    userBank: { type: String, required: true },
    userBankAccount: { type: String, required: true },
    isWeek: { type: Boolean, required: true }
});
const User = (0, mongoose_1.model)("users", userSchema);
exports.default = User;
