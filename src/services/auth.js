import { post } from '../utils/request'
import { initAccount } from '../utils/mock'
/**
 * 用户注册
 * @param {*} user 
 * email, telephone, password, name
 */
export function registerApi(user) {
    return post('/user/register', user)
}
//注释掉后端真实登录
// export function loginApi(user) {
//     return post('/login/jd', user)
// }

// 模拟
export async function loginApi(user) {
    if (!localStorage.getItem('accounts')) {
        initAccount()
    }
    let res = { data: {} }
    res.data.status = "success"
    res.data.data = "token"
    return res
}