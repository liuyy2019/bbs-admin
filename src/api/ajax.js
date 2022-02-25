/**
 * 能够发送异步Ajax请求的函数模块
 * 函数的返回值是promise对象
 */
import axios from 'axios'
axios.defaults.timeout = 2500;


export default function ajax(url,data={}, type='GET'){
    console.log("====start: url: ", url);
    const tempType = type.toUpperCase();
    // 以mock开头的接口，数据进行处理
    if (url.indexOf('/mock') === 0) {
        if (tempType === 'GET'){
            return axios.get(url,{ params: data}).then(res => {
                if (res.data.code === '100000') {
                    return res.data.data;
                } else {
                    return Promise.reject('请求失败！')
                }
            }, rej => Promise.reject(rej));
        } else if(tempType === 'POST') {
            return axios.post(url,data).then(res => {
                if (res.data.code === '100000') {
                    return res.data.data;
                } else {
                    return Promise.reject('请求失败！')
                }
            }, rej => Promise.reject(rej));
        } else if (tempType === 'DELETE'){
            return axios.delete(url);
        } else if(tempType === 'PUT') {
            return axios.put(url, data);
        }
    } else {
        if (tempType === 'GET'){ // 请求方式get
            // 返回的是promise对象
            return axios.get(url,{
                /*params: { // 请求参数
                    id: 1
                }*/
                params: data
            })
        } else if(tempType === 'POST') {
            return axios.post(url,data);
        } else if (tempType === 'delete'){
            return axios.delete(url);
        }else if(tempType === 'PUT') {
            return axios.put(url, data);
        }
    }

}
