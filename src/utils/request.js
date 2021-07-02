import axios from 'axios'
import qs from 'qs'
import { getToken, getToken2 } from './auth';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000
});

const formInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const formInstance2 = axios.create({
    baseURL: 'http://211.151.11.130:31970',
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded;'
    }
});

instance.interceptors.request.use(
    function (config) {
        config.headers["authorization"] = getToken2();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)


instance.interceptors.request.use(
    function (config) {
        config.headers["authorization"] = getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(res => {
    return res.data;
}, error => { return Promise.reject(error) })

formInstance.interceptors.request.use(
    function (config) {
        config.headers["authorization"] = getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)


export function get(url, params) {
    return instance.get(url, { params })
}

export function post(url, data) {
    return formInstance.post(url, qs.stringify(data));
}

export function put(url, data) {
    return instance.put(url, data);
}

export function del(url) {
    return axios.delete(url);
}
