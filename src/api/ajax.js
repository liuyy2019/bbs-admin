/**
 * 能够发送异步Ajax请求的函数模块
 * 函数的返回值是promise对象
 */
import axios from 'axios'

export default function ajax(url,data={}, type='GET'){
    if (type === 'GET'){ // 请求方式get
        // 返回的是promise对象
        return axios.get(url,{
            /*params: { // 请求参数
                id: 1
            }*/
            params: data
        })
    } else if(type === 'POST') {
        return axios.post(url,data);
    } else if (type === 'delete'){
        return axios.delete(url);
    }else if(type === 'PUT') {
        return axios.put(url, data);
    }
}