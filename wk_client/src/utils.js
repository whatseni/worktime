export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export const formatRequest = (year, month) => {
  return `${year}-${String(month).padStart(2, '0')}`
}

export const RetureCode = {
  SUCCESS: 0,
  ERROR: 1
}