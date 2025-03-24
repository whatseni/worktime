export function calculateTime(start: any, end: any) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)

  const hour = Number(((eh * 60 + em) - (sh * 60 + sm)) / 60);
  const min = Number(((eh * 60 + em) - (sh * 60 + sm)) % 60);

  return `${hour}h ${min}m`
}