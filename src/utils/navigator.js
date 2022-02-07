// 判断机型
const u = navigator.userAgent

// 申明交互 这段代码固定必须有
function setupWebViewJavascriptBridge(callback) {
  // android使用
  if (!/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    console.log('安卓')
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function() {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
  } else {
    // ios使用
    console.log('ios')
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    // WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}

// 注册回调函数，第一次链接时调用 初始化函数
// bridge.init 只有android须要调用初始化，可使用Object.keys(bridge) 打开查看对象，ios没有init方法
setupWebViewJavascriptBridge(function(bridge) {
  if (/(iPhone|iPad|iPod|iOS)/i.test(u)) return
  try {
    bridge.init(function(message, responseCallback) {
      console.log('JS got a message', message)
      var data = {
        'Javascript Responds': 'CMYH!'
      }
      console.log('JS responding with', data)
      responseCallback(data)
    })
  } catch (e) {
    console.error('bridge.init error', e)
  }
})
// callhandler调用原生那边的方法
const callhandler = (name, data, callback) => {
  if (typeof data === 'function') {
    callback = data
    data = {}
  }
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(name, data, callback)
  })
}
// registerhandler前端提供方法，原生使用
const registerhandler = (name, callback) => {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler(name, function(data, responseCallback) {
      callback(data, responseCallback)
    })
  })
}

const parseJSON = (param) => {
  if (!param || typeof param !== 'string') return param
  try {
    return JSON.parse(param)
  } catch (e) {
    console.error('parseJSON error ', e)
  }
}

const addTimeStamp = (url) => {
  const time = Date.now()
  const prefix = url.includes('?', url.indexOf('#')) ? '&t=' : '?t='
  return url + prefix + time
}

// ===================== 以上都是辅助方法 ==================

// 是否在webview中
const isWebview =
  u.indexOf('HorizenApp/ios') > -1 || u.indexOf('HorizenApp/android') > -1

// android终端
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

// ios终端
const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

/**
 * 获取token
 * @returns {Promise} {token:'XXX',jwtToken:{accessToken:'xxx'}}
 */
const getSystemToken = () => {
  return new Promise((resolve, reject) => {
    if (!isWebview) {
      resolve({
        Token:'69527a089e694a26b878ebdc45d5d7a4',
        JwtToken: {
          accessToken:
            'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MDY1Njc3NTg3MjExMTU1MTY5IiwiaXNzIjoiaHR0cHM6Ly93d3cuYmFpZHUuY29tIiwidW0iOiJ0ZXN0bG9naW4iLCJvaWQiOiIiLCJzY3AiOltdLCJjY2lkIjoiYXV0aC1jZW50ZXItdXNlciIsImFpZCI6IjIwMDAxIiwiZGlmIjoyLCJhdHAiOiIzIiwic2VuIjoiNTNmYzEwZDM0ZjBiNDAxZWIxNGJkZjA1NzIxNmFiYTkiLCJpYXQiOjE2NDI5OTMzMDR9.U2xTKNcfuiTbQ2rITTRqYtUwSxzhqTQZirZkmAJoC4hzniQLia09hPGK8-Z2MIQCVxvo570GcOfdq4eWpftrD_33w9YMJhY20Eu057dzdj5yBZHWM9gJMygYjUloNpap_yOcJv7v_Res7-T_IF27WrCJLfAD2tRsEWe2iqHLEAI'
        }
      })
      return
    }
    callhandler('getSystemToken', (param) => {
      if (param) {
        const tokenObj = parseJSON(param)
        tokenObj.JwtToken = parseJSON(tokenObj.JwtToken)
        console.log('getSystemToken获取的token1111111111=========================',tokenObj);
        resolve(tokenObj)
      } else {
        reject(new Error('getSystemToken error'))
      }
    })
  })
}

/**
 * 获取系统状态栏高度
 * @returns {Promise} { "barHeight":25, }
 */
const getStatusBarHeight = () => {
  // 非webview不需要获取状态栏高度
  if (!isWebview) return Promise.resolve({ barHeight: '0' })
  return new Promise((resolve, reject) => {
    callhandler('getStatusBarHeight', (param) => {
      if (param) {
        const barHeightObj = parseJSON(param)
        if (barHeightObj.barHeight) {
          barHeightObj.barHeight =
            Number.parseInt(
              isAndroid
                ? barHeightObj.barHeight / window.devicePixelRatio
                : barHeightObj.barHeight
            )
        }
        resolve(barHeightObj)
      } else {
        console.error('getStatusBarHeight error', param)
        reject(new Error('getStatusBarHeight error'))
      }
    })
  })
}

/**
 * 获取APP信息
 * @returns {Promise} { "versionCode":25, "package":25,...}
 */
const getAppDeviceInfo = () => {
  return new Promise((resolve, reject) => {
    callhandler('getAppDeviceInfo', (param) => {
      if (param) {
        resolve(parseJSON(param))
      } else {
        console.error('getAppDeviceInfo error', param)
        reject(new Error('getAppDeviceInfo error'))
      }
    })
  })
}

/**
 * 通知native h5已经加载完毕
 * @returns {Promise} {xxx} 上一个系统传递的数据
 */
const finishLoadSystem = () => {
  return new Promise((resolve) => {
    if (!isWebview) {
      return resolve({})
    }
    callhandler('finishLoadSystem', (param) => {
      resolve(parseJSON(param || '{}'))
    })
  })
}

/**
 * H5页面跳转其他系统
 * @param {Object} param
 * {
    url String   必选 跳转地址URL
    data String  可选 json数据   传递给下个页面数据，页面加载完成后，调用setData把上个页面数据，传递给H5
    dataFunction String 可选  回调方法名称，data不为空，需要设置回调方法
    appBar  boolean 可选 是否使用原生导航栏 默认false
    titleBar boolean 可选 是否使用标题栏  默认 true
    titleName  String  可选  标题 默认使用页面Title
    titleCloseBtn  boolean 可选 标题栏是否显示关闭按钮	默认true
    titleProgess boolean 可选 标题栏是否显示进度条 默认 false
    closeRefresh  boolean 可选 关闭页面后是否需要刷新当前页 默认 false
    closeCurrent boolean 可选 打开新的系统后，是否关闭当前系统 默认 false
    goBack int 可选 当前页面回退层数 默认 0
  }
 * @param {Function} callback 当前系统重新激活时的回调，此时其他系统可能会将数据回调给当前系统
 */
const goSystemUrl = (param, callback = () => {}) => {
  const funName = 'goSystemUrl_' + Date.now()
  param.dataFunction = funName
  // url追加时间戳，x5内核缓存问题
  param.url = addTimeStamp(param.url)
  // 提前注册回调
  registerhandler(funName, (param) => {
    console.log('goSystemUrl:: callback', param)
    callback(parseJSON(param))
    // 清空当前函数
    registerhandler(funName, () => {})
  })
  callhandler('goSystemUrl', param)
}

/**
 * 切换到指定的tabbar页面
 * @param {*} type 0 首页 1 慧眼商城 2 时间交易 3 个人中心
 * @param {*} data 传递给tabbar页面的数据
 */
const goTabBar = (type, data) => callhandler('goTabBar', { type, data })
goTabBar.HOME = 0
goTabBar.TASK = 1
goTabBar.MINE = 2
/**
 * 跳转原生页面
 * @param {*} type 0 设备激活 1 遥控起（新） 2 遥控起（旧） 3 申请售后
 */
const goNativeFunction = type => callhandler('goNativeFunction', { type })
goNativeFunction.ACTIVATION = 0
goNativeFunction.CONTROL_NEW = 1
goNativeFunction.CONTROL_OLD = 2
goNativeFunction.AFTER_SALE = 3
/**
 * 关闭当前系统
 * @param {Object} param 传递给前一个系统的数据
 */
const closeSystem = (param = {}) => callhandler('closeSystem', param)

/**
 * 拦截用户后退操作
 * @param {Function} callback 用户点击后退时会执行callback，同时接收{type 0:返回事件；1:关闭按钮} 参数, callback 返回true代表拦截系统后退，返回false代表不拦截
 * @returns clearNativeFuncion 清空事件函数，在组件的destroyed生命周期中执行下，就像清空定时器一样
 * const clearNativeFuncion = setNativeKeyFunction(()=>{})
    destroyed(){
      clearNativeFuncion()
    }
 */
const setNativeKeyFunction = (callback) => {
  const functionName = 'setNativeKey_' + Date.now()
  // 提前注册回调
  registerhandler(functionName, (param, responseCallback) => {
    const result = callback(parseJSON(param))
    // 将拦截结果返回给native
    responseCallback({
      isIntercept: !!result
    })
  })
  callhandler('setNativeKeyFunction', { functionName })
  // 清空回调函数
  return () =>
    registerhandler(functionName, (_, responseCallback) =>
      responseCallback({ isIntercept: false })
    )
}

/**
 * 退出登录
 */
const jsGoLogin = () => callhandler('jsGoLogin')

/**
 * 拨打电话
 * @param {Object} param  {phoneNumber:10010}
 */
const callSysCustomer = (phoneNumber) =>
  callhandler('callSysCustomer', { phoneNumber })

/**
 * APP升级
 */
const appUpdate = () => callhandler('appUpdate')

/**
 * 原生隐私政策页面
 */
const goPrivacy = () => callhandler('goPrivacy')

/**
 * 原生话费业务协议页面
 */
 const goCallRecharge = () => callhandler('goCallRecharge')
/**
 * 原生关于页面
 */
const goAbout = () => callhandler('goAbout')
// 分享
const goShare = (param = {}) => callhandler('goShare', param)

/**
 * 系统激活时触发，会接收到goTabBar中传递的数据（主要用于app的tabbar页面
 * @param {Funcation} callback
 */
const onSystemPageShow = (callback = () => {}) => {
  registerhandler('onSystemPageShow', (param) => {
    console.log('onSystemPageShow registerhandler', param)
    callback(parseJSON(param || '{}'))
  })
}
export {
  isWebview,
  isAndroid,
  isIos,
  goShare,
  getSystemToken,
  goSystemUrl,
  closeSystem,
  setNativeKeyFunction,
  getStatusBarHeight,
  getAppDeviceInfo,
  jsGoLogin,
  callSysCustomer,
  appUpdate,
  finishLoadSystem,
  goPrivacy,
  goAbout,
  onSystemPageShow,
  goTabBar,
  goNativeFunction,
  goCallRecharge
}
