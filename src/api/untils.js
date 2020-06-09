/* 工具类接口：发送邮件等*/

// 动态获取枚举码信息列表（不分页）
import ajax from "./ajax";

/**
 * post方式调用邮件接口
 * @param data
 * @param callback
 * @returns {Q.Promise<any> | * | void | Promise<T | never>}
 */
export const emailSend = (data, callback)=>ajax('/v1/email/send',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});


/* 发送邮件 */
export const sendEmail = (callback)=>ajax('/v1/email/submit',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});