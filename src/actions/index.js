import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_WEEKS = 'FETCH_WEEKS';
export const FETCH_WEEK_BY_WEEK_NUMBER = 'FETCH_WEEK_BY_WEEK_NUMBER';

const API_ENDPOINT = 'https://timesheet-staging-aurity.herokuapp.com/api';

export function selectUser(user) {
  return {
    type: 'USER_SElECTED',
    payload: user,
  };
}

export const fetchUsers = () => {
  const request = axios.get(`${API_ENDPOINT}/users`);
  return {
    type: FETCH_USERS,
    payload: request,
  };
}

export const fetchWeeks = (month, userId) => {
  const STATIC_YEAR = 2017;
  const request = axios.get(`${API_ENDPOINT}/training/weeks/${month}/${STATIC_YEAR}/${userId}`);
  return {
    type: FETCH_WEEKS,
    payload: request,
  };
}

export const fetchWeekByWeekNumber = (week) => {
  console.log(week)
  return {
    type: FETCH_WEEK_BY_WEEK_NUMBER,
    payload: week,
  };
}
