const HOUR_MONEY = 10030;
export const calculatePay = (hour: number, min: number) => {
  let total = hour * HOUR_MONEY + (min / hour * HOUR_MONEY).toFixed(2);
  return total;
}
export const calculatePayTax = (hour: number, min: number) => {
  let pay: any = calculatePay(hour, min)
  return (pay * 96.7).toFixed(2)
}
export const calculateRealPay = () => {
  
}