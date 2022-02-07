// import store from '@/store'
// import { getToken } from '@/utils/auth'
// import router from '@/router'
import {
  getSystemToken
} from '@/utils/navigator'
// 添加认证信息
export function addAuth() {
  return async config => {
    await new Promise((resolve, reject) => {
      getSystemToken().then(tokenObj => {
        config.headers = Object.assign({}, config.headers, {
          authorization: tokenObj.JwtToken.accessToken || ''
        })
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
    return config
  }
}

// 登录拦截
// const redirectLoginState = false
// export function redirectLogin(to, customErrorTips) {
//   return res => {
//     const {
//       data: { code }
//     } = res
//     if (String(code) === '5510') {
//       if (redirectLoginState) return true
//       redirectLoginState = true
//       store.dispatch('user/resetToken').then(() => {
//         customErrorTips('登录超时，请重新登录！')
//         router.push('/', () => {
//           redirectLoginState = false
//         })
//       })
//       return true
//     }
//     return false
//   }
// }
