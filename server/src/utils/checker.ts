export const checkBirth = (value: string) => {

}
export const checkPhone = (value: string) => {

}
export const checkTime = (value: string) => {
  
}
export const formatDate = (input: Date) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}