"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timeSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    workDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    company: { type: String, required: true },
});
const Time = (0, mongoose_1.model)("times", timeSchema);
exports.default = Time;
