
import axios from 'axios';

const getOptions = () => {
    const options = {
        baseURL: 'http://localhost:1338/api',
        timeout: 1000,
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
        },
        validateStatus: (status) => {
            return status < 500;
        }
    }
    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${ localStorage.getItem('token') }`;
    }
    return options;
};

const httpClient = axios.create(getOptions());

export default httpClient;