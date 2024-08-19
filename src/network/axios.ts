import axios from 'axios';
import { API_PATH } from '../constants/api';
import { MOVIEDB_API_ACCESS_TOKEN } from '../constants/move_db';

// default export for normal api requests
export default axios.create({
  baseURL: API_PATH,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${MOVIEDB_API_ACCESS_TOKEN}`,
  },
});
