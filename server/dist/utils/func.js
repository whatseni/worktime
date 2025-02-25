"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTimeByUser = exports.getAllTime = void 0;
exports.calculateTimeDifference = calculateTimeDifference;
exports.combineDateAndTime = combineDateAndTime;
const getAllTime = (data) => {
    let totalTime = 0;
    for (let obj of data) {
        let [startHour, startMin] = obj.startTime.split(':').map(Number);
        let [endHour, endMin] = obj.endTime.split(':').map(Number);
        totalTime += (endHour * 60 + endMin) - (startHour * 60 + startMin);
    }
    // 시간을 계산
    const hours = Math.floor(totalTime / 60);
    // 분을 계산
    const minutes = totalTime % 60;
    return `${hours}시간 ${minutes}분`;
};
exports.getAllTime = getAllTime;
const getAllTimeByUser = (data) => {
    let result = {};
    for (let obj of data) {
        let [startHour, startMin] = obj.startTime.split(':').map(Number);
        let [endHour, endMin] = obj.endTime.split(':').map(Number);
        let time = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        if (result[obj.userName]) {
            let temp = result[obj.userName];
            result[obj.userName] = temp + time;
        }
        else {
            result[obj.userName] = time;
        }
    }
    return result;
};
exports.getAllTimeByUser = getAllTimeByUser;
// 시간 차이 계산 함수
function calculateTimeDifference(start, end) {
    let [startHour, startMin] = start.split(':').map(Number);
    let [endHour, endMin] = end.split(':').map(Number);
    let diffTime = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    // 시간을 계산
    const hours = Math.floor(diffTime / 60);
    // 분을 계산
    const minutes = diffTime % 60;
    return { hours, minutes };
}
function combineDateAndTime(dateString, timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(dateString);
    date.setUTCHours(hours, minutes, 0, 0);
    return date;
}
