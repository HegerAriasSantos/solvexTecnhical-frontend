import axios from 'axios';
import { SERVER_ENDPOINT } from '~/lib/ServerRoutes';

export const API = axios.create({
  baseURL: SERVER_ENDPOINT,
});
