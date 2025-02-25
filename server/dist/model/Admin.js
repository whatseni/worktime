"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String, required: true },
});
const Admin = (0, mongoose_1.model)("admin", adminSchema);
exports.default = Admin;
