<template>
  <div class='mian'>
    <div class="list">
      <div class="item" @click="toUrl(item)" v-for="(item,index) in linkList" :key="index">
        <div class="name">
          {{item.name}}
        </div>
        <img src="@/assets/right.png" alt="">
      </div>
    </div>
    <van-popup position="bottom" close-on-click-overlay round v-model="signOut">
      <div class="sign-out">
        <div class="sure-text">
          确认退出吗？
        </div>
        <div class="sure">
          <span @click="out">退出</span>
        </div>
        <div class="close">
          <span @click="signOut=false">取消</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    jsGoLogin
  } from '@/utils/navigator'
  export default {
    components: {},
    data() {
      return {
        linkList: [
          {
            type: 1,
            name: '关于宁可赚'
          },
          {
            type: 2,
            name: '退出账号'
          }
        ],
        signOut: false
      }
    },
    computed: {},
    watch: {},
    methods: {
      out() {
        jsGoLogin()
        return
      },
      toUrl(item) {
        switch (item.type) {
          case 1:
            this.$router.push({
              name: 'About'
            })
            break;
          case 2:
            this.signOut = true
        }
      },
    },
    created() {},
    mounted() {},
  }
</script>
<style lang='less' scoped>
  .mian {
    padding: 15px;

    .list {
      background-color: #fff;
      border-radius: 10px;

      .item {
        height: 54px;
        display: flex;
        padding: 0 15px;
        align-items: center;
        justify-content: space-between;

        .name {
          font-size: 15px;
          color: #303133;
        }

        img {
          width: 5px;
          height: 12px;
        }
      }
    }

    .sign-out {
      height: 185px;
      background-color: #fff;
      padding: 0 15px;
      font-size: 15px;
      text-align: center;

      .sure-text {
        padding: 20px;
        color: #303133;
        border-bottom: 1px solid #E9E9E9;
      }

      .sure,
      .close {
        padding-top: 20px;
        color: #909399;

        span {
          padding: 5px;
        }
      }

      .sure {
        color: #FF6428;
      }
    }
  }
</style>