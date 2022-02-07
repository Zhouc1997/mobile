import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet'),
    meta: {
      title: '我的钱包',
      keepAlive: false,
    }
  },
  {
    path: '/wallet/bill',
    name: 'Bill',
    component: () => import('../views/Wallet/bill'),
    meta: {
      title: '全部账单',
      keepAlive: false,
    }
  },
  // {
  //   path: '/wallet/deposit',
  //   name: 'Deposit',
  //   component: () => import('../views/Wallet/deposit'),
  //   meta: {
  //     title: '我的押金',
  //     keepAlive: false,
  //   }
  // },
  {
    path: '/wallet/deposit/detail',
    name: 'DepositDetail',
    component: () => import('../views/Wallet/depositDetail'),
    meta: {
      title: '我的押金',
      keepAlive: false,
    }
  },
  {
    // path: '/home',
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/home.vue'),
    meta: {
      keepAlive: false,
      title: '首页'
    },

  },
  {
    path: '/specification',
    name: 'specification',
    component: () => import('../views/myPage/specification.vue'),
    meta: {
      keepAlive: false,
      title: '说明'
    },

  },
  {
    path: '/hfDetails',
    name: 'hfDetails',
    component: () => import('../views/Home/hfDetails'),
    meta: {
      keepAlive: false,
      title: '业务详情'
    }
  },
  {
    path: '/hfShare',
    name: 'hfShare',
    component: () => import('../views/Home/hfShare'),
    meta: {
      keepAlive: false,
      title: '推广说明'
    }
  },
  // 任务
  {
    path: '/task',
    name: 'Task',
    component: () => import('../views/task/task.vue'),
    meta: {
      keepAlive: false,
      title: '任务'
    }
  },
  {
    path: '/task1',
    name: 'Task1',
    component: () => import('../views/task/task1.vue'),
    meta: {
      keepAlive: false,
      title: '任务'
    }
  },
  // 帮助
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/task/help.vue'),
    meta: {
      keepAlive: false,
      title: '任务说明'
    }
  },
  //设置工作时间
  {
    path: '/workTime',
    name: 'workTime',
    component: () => import('../views/task/workTime.vue'),
    meta: {
      keepAlive: false,
      title: '工作时间'
    }
  },
  //设置工作时间
  {
    path: '/editWorkTime',
    name: 'editWorkTime',
    component: () => import('../views/task/editWorkTime.vue'),
    meta: {
      keepAlive: false,
      title: '添加工作时间'
    }
  },
  // 业务合作
  {
    path: '/code',
    name: 'Code',
    component: () => import('../views/task/code.vue'),
    meta: {
      keepAlive: false,
      title: '业务合作协议'
    }
  },
  // 极速话充中转页
  {
    path: '/transferPage',
    name: 'transferPage',
    component: () => import('../views/task/transferPage.vue'),
    meta: {
      keepAlive: false,
      title: ''
    }
  },
  // 上传凭证
  {
    path: '/imgUpload',
    name: 'ImgUpload',
    component: () => import('../views/task/imgUpload.vue'),
    meta: {
      keepAlive: false,
      title: '上传凭证'
    }
  },
  // 上传凭证
  {
    path: '/myPage/imgUpload',
    name: 'ImgUpload',
    component: () => import('../views/myPage/imgUpload.vue'),
    meta: {
      keepAlive: false,
      title: '上传凭证'
    }
  },
  // 上传凭证
  {
    path: '/helpCenter',
    name: 'help',
    component: () => import('../views/myPage/help.vue'),
    meta: {
      keepAlive: false,
      title: '帮助'
    }
  },
  {
    path: '/myPage/helpDetails/:id?',
    name: 'help',
    component: () => import('../views/myPage/helpDetails.vue'),
    meta: {
      keepAlive: false,
      title: '帮助中心'
    }
  },
  // 我的 页面
  {
    path: '/myPage',
    name: 'myPage',
    component: () => import('../views/myPage/index'),
    meta: {
      keepAlive: true,
      title: '我的'
    }
  },
  // 话冲
  {
    path: '/telephone',
    name: 'telephone',
    component: () => import('../views/myPage/telephone'),
    meta: {
      keepAlive: true,
      title: '话充相关'
    }
  },
  // 推广
  {
    path: '/generalization',
    name: 'generalization',
    component: () => import('../views/myPage/generalization'),
    meta: {
      keepAlive: true,
      title: '我的推广'
    }
  },
  // {
  //   path: '/deposit',
  //   name: 'deposit',
  //   component: () => import('../views/myPage/deposit'),
  //   meta: {
  //     keepAlive: false,
  //     title: '我的押金'
  //   }
  // },
  {
    path: '/taskInfo',
    name: 'taskInfo',
    component: () => import('../views/myPage/taskInfo'),
    meta: {
      keepAlive: false,
      title: '任务信息'
    }
  },
  {
    path: '/orderInfotwo',
    name: 'orderInfotwo',
    component: () => import('../views/myPage/orderInfotwo'),
    meta: {
      keepAlive: false,
      title: '订单信息'
    }
  },
  {
    path: '/awardInfo',
    name: 'awardInfo',
    component: () => import('../views/myPage/awardInfo'),
    meta: {
      keepAlive: false,
      title: '奖励信息'
    }
  },
  // 系统设置
  {
    path: '/systemSet',
    name: 'systemSet',
    component: () => import('../views/myPage/systemSet'),
    meta: {
      keepAlive: true,
      title: '系统设置'
    }
  },
  // 录入邀请码
  {
    path: '/invitationCode',
    name: 'invitationCode',
    component: () => import('../views/myPage/invitationCode'),
    meta: {
      keepAlive: true,
      title: '录入邀请码'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/myPage/about'),
    meta: {
      keepAlive: true,
      title: '关于宁可赚'
    }
  },
  //  订单信息
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('../views/myPage/orderInfo'),
    meta: {
      keepAlive: true,
      title: '订单信息'
    }
  },
  //  订单详情
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: () => import('../views/myPage/orderDetails'),
    meta: {
      keepAlive: true,
      title: '订单详情'
    }
  },
  //  待返本金
  {
    path: '/returnPrincipal',
    name: 'returnPrincipal',
    component: () => import('../views/myPage/returnPrincipal'),
    meta: {
      keepAlive: true,
      title: '待返本金'
    }
  },
  //  待返本金
  {
    path: '/prepaidRefill',
    name: 'prepaidRefill',
    component: () => import('../views/myPage/prepaidRefill'),
    meta: {
      keepAlive: true,
      title: '话费充值'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
