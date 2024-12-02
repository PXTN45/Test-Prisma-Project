import axios from 'axios';

const axiosUser = axios.create({
  baseURL: 'http://localhost:3000', // ใส่ URL ที่เป็นต้นทางของ API ของคุณ
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosUser;
