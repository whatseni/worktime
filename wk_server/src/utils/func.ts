export const getAllTime = (data: any) => {
  let totalTime = 0;
  for(let obj of data) {
    let [startHour, startMin] = obj.startTime.split(':').map(Number)
    let [endHour, endMin] = obj.endTime.split(':').map(Number)

    totalTime += (endHour * 60 + endMin) - (startHour * 60 + startMin)
  }
  return totalTime;
}
export const getAllTimeByUser = (data: any) => {
  let result: any = {};

  for(let obj of data) {
    let [startHour, startMin] = obj.startTime.split(':').map(Number)
    let [endHour, endMin] = obj.endTime.split(':').map(Number)

    let time = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    if (result[obj.userName]) {
      let temp = result[obj.userName];
      result[obj.userName] = temp + time;
    } else {
      result[obj.userName] = time
    }
  }
  return result;
}