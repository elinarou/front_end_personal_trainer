import moment from "moment/moment";

export default function DateToISO(props) {
  let date = moment(props, "DD.MM.YYYY hh:mm").toISOString();  
  return date;
};