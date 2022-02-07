<template>
  <div id="app">
    <router-view />
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>
<script>
import {
  finishLoadSystem
} from '@/utils/navigator.js'
export default {
  name: 'App',
  mounted() {
    // 通知native h5已经加载完毕 1
    finishLoadSystem().then()
  }
}
</script>
<style lang="less">
#app {
  background: #e7e7e7;
  width: 100%;
  font-size: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
</style>
