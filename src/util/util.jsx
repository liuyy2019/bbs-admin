/* 获取登录信息 */
export function getToken() {
    return JSON.parse(sessionStorage.getItem("user"));
}

/* 将登陆信息存储到本地 */
export function setToken(user) {
    // 目前所有的浏览器中都会把localStorage的值类型限定为string类型
    sessionStorage.setItem("user",JSON.stringify(user))
}

/* 判断用户是否登录 */
export function isLogin() {
    if(sessionStorage.getItem("user")){
        return true;
    }
     return false;
}

/* 用户退出，登录信息移除*/
export function removeToken() {
    sessionStorage.removeItem("user")
}