import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { baseUrlAPI } from '../utils/constants';
import { useAuthUser } from 'react-auth-kit';

const axiosClient = axios.create({
  baseURL: baseUrlAPI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
