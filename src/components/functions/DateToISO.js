import moment from "moment/moment";

export default function DateToISO(props) {
  let date = moment(props).toISOString();  
  return date;
};