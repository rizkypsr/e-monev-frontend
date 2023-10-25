export default function formattedDate(date) {
  const rawDate = new Date(date);

  const year = rawDate.getFullYear();
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const day = rawDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
