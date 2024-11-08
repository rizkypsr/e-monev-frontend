/* eslint-disable camelcase */
import moment from "moment";
import 'moment/dist/locale/id';

export default function formattedDate(date, alternative_format = false) {
  // check if date is invalid date
  if (Number.isNaN(Date.parse(date))) {
    return null;
  }

  try {
    const rawDate = new Date(date);

    const year = rawDate.getFullYear();
    const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
    const day = rawDate.getDate().toString().padStart(2, '0');

    // return `${year}-${month}-${day}`;
    return alternative_format ? moment(date)
      .locale('id')
      .format('dddd, DD MMMM YYYY HH:mm (Z)') : `${year}-${month}-${day}`;
  } catch (error) {
    return null;
  }
}
