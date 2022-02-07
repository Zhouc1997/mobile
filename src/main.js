import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/reset.css"
import 'amfe-flexible'
import dayjs from "dayjs";
import '@/utils/vant' //按需引入vant
// import Vconsolefrom from 'vconsole'
// const vConsole = new Vconsolefrom()
// Vue.use(vConsole)
Vue.config.productionTip = false           
Vue.prototype.dayjs = dayjs;
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
