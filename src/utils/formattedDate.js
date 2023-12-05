export default function formattedDate(date) {
  // check if date is invalid date
  if (Number.isNaN(Date.parse(date))) {
    return null;
  }

  try {
    const rawDate = new Date(date);

    const year = rawDate.getFullYear();
    const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
    const day = rawDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    return null;
  }
}
