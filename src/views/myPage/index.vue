<template>
<div class="user">
    <!--头部-->
    <div class="user-section clearfix">
      <!--用户信息-->
      <div class="user-info-box" style="float:left;">
        <div class="portrait-box">
          <img class="portrait" :src="userInfo.AvatarUrl ? userInfo.AvatarUrl : handImg" />
          <div class="username">
            <p>{{ userInfo.UserName }}</p>
            <p class="username-phone">{{ userInfo.Mobile }}</p>
          </div>
        </div>
      </div>
<!--      <div style="float: right;">-->
<!--        <span style="font-size: 14px; color: #FFFFFF;" @click="navTo('/myPage/help')">帮助</span>-->
<!--      </div>-->
    </div>
    <!-- 个人资料 -->
<!--    <div class="set set-height">-->
<!--      <div-->
<!--          v-for="item in setList2"-->
<!--          :key="item.title"-->
<!--          class="list-cell-but b-b"-->
<!--          :class="{ 'm-t': item.class === 'mT' }"-->
<!--      >-->
<!--        <img class="img-size" :src="item.icon" alt="">-->
<!--        <span class="cell-tit">{{ item.title }}</span>-->
<!--        <van-button round  class="cell-more" color="#FF6428"  size="small" @click="navTo(item.url)">{{butLabel}}</van-button>-->
<!--      </div>-->
<!--    </div>-->
    <div class="set m-t">
      <div
          v-for="item in setList"
          :key="item.title"
          class="list-cell b-b"
          :class="{ 'm-t': item.class === 'mT' }"
          @click="navTo(item.url)"
      >
        <img style="height:24px; width:24px; margin:0 5px; transform: translateY(5px)" :src="item.icon" alt="">
        <span class="cell-tit">{{ item.title }}</span>
        <van-icon v-if="!item.content" name="arrow" class="cell-more"/>
        <span v-else class="cell-tit" style="text-align: right;color: #909399">{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>
<script>
 import {
    goSystemUrl,
    isWebview

  } from '@/utils/navigator'
import {GetUserInfo} from '@/api/user.js'
 import {callSysCustomer,onSystemPageShow} from '@/utils/navigator.js'
export default {
  data() {
    return {
      setList: [
        {
          icon:require('../../assets/wallet-icon.png'),
          title: '我的钱包',
          url: '/wallet',
          content: '',
        },
        // {
        //   icon:require('../../assets/telephone-icon.png'),
        //   title: '话费充值',
        //   url: '/telephone',
        //   content: '',
        // },
        {
          icon:require('../../assets/telephone-icon.png'),
          title: '话费充值',
          url: '/prepaidRefill',
          content: '',
        },
        {
          icon:require('../../assets/help-icon.png'),
          title: '帮助中心',
          url: '/helpCenter',
          content: ''
        },
        {
          icon:require('../../assets/service-icon.png'),
          title: '客服电话',
          url: '',
          content: '0531-96718'
        },
        {
          icon:require('../../assets/set-icon.png'),
          title: '系统设置',
          url: '/systemSet',
          content: ''
        }
      ],
      handImg:require('../../assets/default-avatar.png'),
      userInfo:{
        AvatarUrl:'',
        UserName:'',
        Mobile:''
      }
    }
  },
  async created() {
    // 初始化数据
    this.getUserInfo()
  },
  mounted(){
    onSystemPageShow((param) => {
        console.log(param);
        this.getUserInfo()
      })
  },
  methods: {
    navTo(url){
      console.log('isWebview',isWebview)
      console.log('url',url)
      if(url){
        if (isWebview) {
          const {origin} = location
          goSystemUrl({
            url:`${origin}/#${url}`
          })
        } else {
          this.$router.push(url)
        }
      }else{
        this.handleClick('0531-96718')
      }
    },
    // 获取 个人信息
    async getUserInfo(){
      const [err,data] = await GetUserInfo()
      if(err) return
      this.userInfo = data
    },
    // 拨打电话
    handleClick(type) {
      callSysCustomer(type)
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  .promotion-center {
    background: #fff;
    margin-bottom: 10px;

    /*分类列表*/
    .category-list {
      width: 100%;
      padding: 0 0 15px 0;
      border-bottom: solid 1px #f6f6f6;
      display: flex;
      flex-wrap: wrap;

      .category {
        width: 33.3%;
        margin-top: 25px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .img {
          width: 100%;
          display: flex;
          justify-content: center;

          .iconfont {
            font-size: 16px + 12px;
          }
        }

        .text {
          width: 100%;
          display: flex;
          justify-content: center;
          font-size: 12px;
          color: #3c3c3c;
        }

        .share-btn {
          height: 35px;
          text-align: left;
          background: none;
          padding: 0;
          margin: 0;
        }

        .share-btn:after {
          border: none;
          border-radius: none;
        }
      }
    }
  }

  .set {
    height:100%;
    width:auto;
    border-radius: 12px;
    margin: 0 20px;
    background: #fff;
    transform: translateY(-60px);
  }
  .set-height{
    height:80px;
  }
  .m-t {
    margin-top: 16px;
  }

  .user-section {
    background:url("../../assets/personal-bg.png") no-repeat;
    width:100%;
    height:210px;
    background-size:100% 100%;
    position: relative;
    padding: 55px 20px 0;
    .user-info-box {
      height: 90px;
      //display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
      justify-content: space-between;
      .portrait-box {
        display: flex;
        align-items: center;

        .portrait {
          width: 65px;
          height: 65px;
          border: 2px solid #fff;
          border-radius: 50%;
        }

        .username {
          font-size:20px;
          color: #fff;
          margin-left: 10px;
          line-height:30px;
          &-phone{
            font-size:14px;
          }
        }
      }
    }
  }
  .service-tel{
    position: absolute;
    bottom: 20px;
    width:85%;
    margin: 0 20px;
    height:40px;
    line-height: 40px;
    font-size: 14px;
    color: #909399;
    &-info{
      text-align: center;
    }
    .dial{
      color:#FF6428;
      margin-left: 10px;
    }
  }
}
.list-cell-but{
   display: flex;
   align-items: baseline;
   padding: 10px 15px;
   line-height: 60px;
   position: relative;
  font-size: 30px;
   justify-content: center;
   &.log-out-btn {
     margin: 20px 0;
     .cell-tit {
       text-align: center;
       margin-right: 0;
     }
   }

   &.cell-hover {
     background: #fafafa;
   }

   &.b-b:after {
     left: 15px;
   }

   &.m-t {
     margin-top: 16px;
   }
  .img-size{
    height:30px;
    width:30px;
    margin:0 5px;
    transform: translateY(7px)
  }

   .cell-more {
     width:70px;
     align-self: baseline;
     font-size: 14px;
     color: #909399;
     margin-left: 10px;
     transform: translateY(-8px)
   }

   .cell-tit {
     flex: 1;
     color: #303133;
     font-size:18px;
     margin-right: 10px;
   }

   .cell-tip {
     font-size: 14px;
     color: #909399;
   }

   switch {
     transform: translateX(16px) scale(0.84);
   }
 }
.list-cell {
  display: flex;
  align-items: baseline;
  padding: 10px 15px;
  line-height: 30px;
  position: relative;
  justify-content: center;
  &.log-out-btn {
    margin: 20px 0;
    .cell-tit {
      text-align: center;
      margin-right: 0;
    }
  }

  &.cell-hover {
    background: #fafafa;
  }

  &.b-b:after {
    left: 15px;
  }

  &.m-t {
    margin-top: 16px;
  }

  .img-size{
    height:24px;
    width:24px;
    margin:0 5px;
    transform: translateY(5px)
  }
  .cell-more {
    align-self: baseline;
    font-size: 16px;
    color: #909399;
    margin-left: 10px;
  }

  .cell-tit {
    flex: 1;
    font-size: 14px + 2px;
    margin-right: 10px;
  }

  .cell-tip {
    font-size: 14px;
    color: #909399;
  }

  switch {
    transform: translateX(16px) scale(0.84);
  }
}
</style>
