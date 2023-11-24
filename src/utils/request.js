/*
 * @Author: qianhua.xiong
 */
import axios from 'axios'
const service = axios.create({
   // baseURL: '/api/v1', //线上环境
    baseURL: '/api/v1/',  //测试环境
    headers: {
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": true,
    },
    timeout: 10000,
    withCredentials: true
});

// 请求拦截
service.interceptors.request.use(config => {
    let JWT = sessionStorage.getItem('JWT');
    if(JWT){
        config.headers["token"] =  JWT;
    }
    return config;
});

// 返回拦截
service.interceptors.response.use((res)=> {
    console.log(res)
    return res.data
}, (err)=> {
    const message = err.response.data && err.response.data.errorMsg || 'unknown error';
    return Promise.reject(message);
});
export default service;
