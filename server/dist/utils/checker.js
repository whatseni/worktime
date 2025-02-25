"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.checkTime = exports.checkPhone = exports.checkBirth = void 0;
const checkBirth = (value) => {
};
exports.checkBirth = checkBirth;
const checkPhone = (value) => {
};
exports.checkPhone = checkPhone;
const checkTime = (value) => {
};
exports.checkTime = checkTime;
const formatDate = (input) => {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
exports.formatDate = formatDate;
