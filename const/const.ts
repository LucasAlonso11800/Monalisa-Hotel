export const SERVER_URL = 'http://localhost:3005/api';

const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

export const TODAY = today.toISOString().substring(0, 10);
export const NEXT_WEEK = nextWeek.toISOString().substring(0, 10);