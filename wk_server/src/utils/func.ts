export const getAllTime = (data: any) => {
  let totalTime = 0;
  for(let obj of data) {
    let [startHour, startMin] = obj.startTime.split(':').map(Number)
    let [endHour, endMin] = obj.endTime.split(':').map(Number)

    totalTime += (endHour * 60 + endMin) - (startHour * 60 + startMin)
  }
  return totalTime;
}