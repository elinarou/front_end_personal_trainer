import dayjs from 'dayjs';

export default function ISOToDate(props) {
  return dayjs(props.date).format("DD.MM.YYYY HH:mm");
};