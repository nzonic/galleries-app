import axios from 'axios';

class BaseService {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:8000/api',
    });

    this.http.interceptors.request.use(function(request) {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }
      return request;
    });

    this.http.interceptors.response.use(async function(response) {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token && response.status == 401) {
        const { data } = await this.http.post('/refresh');
        localStorage.setItem('token', data.access_token);
      }
      return response;
    }, async function(error) {
      return Promise.reject(error?.response || error);
    });
  }
}

export default BaseService;