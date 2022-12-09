import dayjs from 'dayjs';

export default function Dateformat(props) {
  return dayjs(props.date).format("DD.MM.YYYY HH:mm");
};