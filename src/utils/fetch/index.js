import axios from 'axios'
import { Toast } from 'vant'
// redirectLogin
import { addAuth } from './interceptor'
import {jsGoLogin} from '@/utils/navigator'
/**
 *  异步处理 无需try-catch
 * @param {Promise} promise
 */
function to(promise) {
  return promise.then(res => [null, res]).catch(err => [err, null])
}
// 在respCodeWhiteList没有配置错误code时 会默认调用该函数处理错误信息
const customErrorTips = message =>
  Toast.fail(
    message
  )
  // customErrorTips(111)
/**
 *
 * @param  respSuccCode 响应成功code
 * @param  respErrCodeWhiteList  在此配置code后 不会主动弹出错误提示框 将错误处理权交给页面
 * @param  baseURL 基础url
 * @returns  {instance, get, post, put,delete}
 */
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
function genMethods(respSuccCode, respErrCodeWhiteList, baseURL) {
  // create an axios instance
  const instance = axios.create({
    baseURL,
    timeout: 10000 // request timeout  10S

  })
  // 添加请求拦截器
  // instance.defaults.header['Content-Type'] = 'application/x-www-form-urlencoded';
  instance.interceptors.request.use(addAuth())

  // 添加响应拦截器
  instance.interceptors.response.use(
    async res => {
      const {
        status,
        data,
        config: { url, responseType }
      } = res
      // 1.网络错误
      if (status !== 200) {
        customErrorTips(`${status} 网络错误`)
        return to(
          Promise.reject(new Error(`${url} 请求错误 res.status = ${status}`))
        )
      }
      // 2.请求类型为blob 且请求没有返回code
      if (responseType === 'blob' && !data.code) { return res }
      // 3.业务请求异常
      if (!respSuccCode.includes(String(data.code))) {
        // 登录拦截
        // if (redirectLogin(to, customErrorTips)(res)) return [data]
        // 如果错误白名单包含，不弹窗提示错误
        if (respErrCodeWhiteList.includes(String(data.code))) {
          console.error(
            `request error url = ${url} data = ${JSON.stringify(
              data
            )}} respCodeWhiteList call`
          )
          return to(Promise.reject(data))
        }
        // 如果错误白名单不包含，弹窗提示错误
        customErrorTips(data.msg)

        console.error(
          `request error url = ${url} data = ${JSON.stringify(data)}}`
        )
        if(data.code===401){
          console.log("token过期");
          jsGoLogin()
          return to(Promise.reject(data))
        }
        return to(Promise.reject(data))
      }
      return to(Promise.resolve(data.data))
    },
    error => {
      // console.log(String(error),"2222222222222222");
      if(String(error).includes('401')){
        customErrorTips(`登录已过期`)
        jsGoLogin()
        return to(Promise.reject(error))
      }
      console.error(`request error `, error)
      customErrorTips(`网络错误`)
      // jsGoLogin()
      return to(Promise.reject(error))
    }
  )

  const withoutDataMethod = (method, url, params, config = {}) =>
    instance[method.toLowerCase()](url, {
      params,
      ...config
    })

  const withDataMethod = (method, url, data, config = {}) =>
    instance[method.toLowerCase()](url, data, config)

  const result = {
    instance,
    GET: (...rest) => withoutDataMethod('GET', ...rest),
    DELETE: (...rest) => withoutDataMethod('DELETE', ...rest),
    PUT: (...rest) => withDataMethod('PUT', ...rest),
    POST: (...rest) => withDataMethod('POST', ...rest)
  }
  return result
}
const { GET, POST, DELETE, PUT } = genMethods(
  ['0'],
  [],
  process.env.VUE_APP_BASE_API
)
export { GET, POST, DELETE, PUT }
