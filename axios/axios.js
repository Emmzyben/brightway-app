import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://gitaalliedtech.com/brightwayApp/admin/api/register.php', 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;
