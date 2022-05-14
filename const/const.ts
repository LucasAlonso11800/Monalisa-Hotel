import moment from "moment";
export const SERVER_URL = 'http://localhost:3005/api';

const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

export const TODAY = moment(today).local().format('YYYY-MM-DD');
export const NEXT_WEEK = moment(nextWeek).local().format('YYYY-MM-DD');