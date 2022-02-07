<template>
  <div class="user">
    <div class="set clearfix" style="padding-top: 0;margin-bottom: 15px;"  v-for="item,index in setList" :key="index">
      <van-cell :class="getBg(item.title)">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="custom-title clearfix">
            <van-row class="van-row-style">
              <van-col span="16">
                <h3>{{item.title}}</h3>
              </van-col>
              <van-col span="8">
                <p @click="navTo(item.url,item)"> <span>{{item.content}}</span><van-icon class="icon-name" name="arrow" /></p>
              </van-col>
            </van-row>
          </div>
        </template>
        <template #label>
          <van-row class="van-row-style">
            <van-col span="12">
              <div class="Order-describe" v-if="item.title !== '我的押金' && item.title !== '推荐人邀请码'">
                <p>{{item.details}}</p>
                <span>{{item.num || 0}}</span>
              </div>
              <div class="Order-describe" v-else-if="item.title === '我的押金'">
                <div v-if="item.num">
                  <p>{{item.details}}</p>
                  <span>{{item.num}}</span>
                </div>
                <p style="font-size: 20px;line-height: 60px" v-else>{{ '暂未开通业务'}}</p>
              </div>
              <div class="default-style"  v-else-if="item.title === '推荐人邀请码'">
                <p>{{ item.num ||  '暂未填写'}}</p>
              </div>
            </van-col>
            <van-col span="12" v-if="item.sentDetails">
              <div class="Order-describe">
                <p>{{item.sentDetails}}</p>
                <span>{{item.sentNum || 0}}</span>
              </div>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import {TaskAmount, ExtendInfo, refereeCodeInfo, OrderListPage} from "../../api/user";
import {
  GetDepositInfo,
} from '@/api/wallet.js'
// 背景 图
function getPageBg(item){
  let backClass
  switch (item) {
    case '推荐人邀请码':
      backClass = 'set-cell-illustration'
      break;
    case '我的押金':
      backClass = 'set-cell-cash'
      break;
    case '任务金额':
      backClass = 'set-cell-task'
      break;
    case '奖励金额':
      backClass = 'set-cell-award'
      break;
    case '订单':
      backClass = 'set-cell-order'
      break;
    case '我的推广':
      backClass = 'set-cell-promotion'
      break;
  }
  return backClass
}
export default {

  data() {
    return {
      setList:[
        {
          title: '推荐人邀请码',
          url: '/invitationCode',
          content: '查看详情',
          details:'',
          default:'',
          num:''
        },
        {
          title: '我的押金',
          url: '/wallet/deposit/detail',
          content: '查看详情',
          default:'暂未开通业务',
          details:'话费充值押金（元）',
          num:'0'
        },
        {
          title: '订单',
          url: '/orderInfotwo',
          content: '查看详情',
          default:"",
          details:'已完成订单（笔）',
          num:'0'
        },
        {
          title: '任务金额',
          url: '/taskInfo',
          content: '查看详情',
          default:'暂未开通业务',
          details:'待结算（元）',
          sentDetails:'已结算（元）',
          sentNum:'0.00',
          num:'0.00'
        },
        {
          title: '奖励金额',
          url: '/awardInfo',
          content: '查看详情',
          default:'暂未开通业务',
          details:'待获得（元）',
          sentDetails:'已获得（元）',
          sentNum:'0.00',
          num:'0.00'
        },
        {
          title: '我的推广',
          url: '/generalization',
          content: '查看详情',
          default:'暂未开通业务',
          details:'已推广用户（人）',
          num:'0'
        },
      ]
    }
  },
  created() {
    this.getList()
    this.getExtendInfo()
    this.getUserState()
    this.getCodeInfo()
    this.getAccountInfo()
  },
  methods:{
    //
    getBg(item){
      return getPageBg(item)
    },
    // 路由 跳转
    navTo(url,item){
      this.$router.push({
        path:url,
        query:item
      })
    },
    // 获取订单数
    async getAccountInfo(){
      const [err,data] = await OrderListPage({
        page: 1,
        limit: 1,
      })
      if(err) return
      this.setList = this.setList.map(item => {
        if(item.title === '订单'){
          return{
            ...item,
            num:data.total
          }
        }else{
          return{
            ...item,
          }
        }
      })
    },
    // 获取押金
    async getList() {
      const [err, data] = await GetDepositInfo()
      if(err) return
      console.log(data)
      this.setList = this.setList.map(item => {
        if(item.title === '我的押金'){
          return{
            ...item,
            num:data.list.Amount
          }
        }else{
          return{
            ...item,
          }
        }
      })
    },
    // 获取发展用户总人数
    async getExtendInfo(){
      const  [err,data] = await ExtendInfo()
      if(err) return
      this.setList = this.setList.map(item => {
        if(item.title === '我的推广'){
          return{
            ...item,
            num:data.UserCount
          }
        }else{
          return{
            ...item,
          }
        }
      })
    },
    // 获取用户推荐码 和绑定的推荐码
    async getCodeInfo(){
      const [err,data] = await refereeCodeInfo()
      if(err) return
      if(data.RefereeCode){
        this.setList = this.setList.map(item => {
          if(item.title === '推荐人邀请码'){
            return{
              ...item,
              num:data.RefereeCode
            }
          }else{
            return{
              ...item,
            }
          }
        })
      }
    },
    // 判断 是否开通
   async getUserState(){
     const [err,data] = await TaskAmount()
     if(err) return
     this.setList = this.setList.map(item => {
       if(item.title === '任务金额'){
         return{
           ...item,
           num:data.TaskUnSettle,
           sentNum:data.TaskSettle
         }
       }else if(item.title === '奖励金额'){
         return{
           ...item,
           num:data.PrizeUnSettle,
           sentNum:data.PrizeSettle
         }
       }else{
         return{
           ...item,
         }
       }
     })
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  .set{
    margin: 10px 20px;
    border-radius: 12px;
    background: #fff;
    .set-cell-illustration{
      padding: 0 15px 15px ;
      background: url("../../assets/illustration.png") no-repeat right bottom;
      background-size:40% ;
    }
    .set-cell-cash{
      padding: 0 15px 15px ;
      background: url("../../assets/cash-pledge.png") no-repeat right bottom;
      background-size:40% ;
    }
    .set-cell-task{
      padding: 0 15px 15px ;
      background: url("../../assets/task-icon.png") no-repeat right bottom;
      background-size:40% ;
    }
    .set-cell-award{
      padding: 0 15px 15px ;
      background: url("../../assets/award-icon.png") no-repeat right bottom;
      background-size:40% ;
    }
    .set-cell-order{
      padding: 0 15px 15px ;
      background: url("../../assets/order-bg-icon.png") no-repeat right bottom;
      background-size:40% ;
    }
    .set-cell-promotion{
      padding: 0 15px 15px ;
      background: url("../../assets/promotion-icon.png") no-repeat right bottom;
      background-size:40% ;
    }
  }
  .Order-describe{
    padding:5px 0;
    p{
      font-size:12px;
      line-height: 20px;
      padding:10px 0;
      color:#909399;
    }
    span{
      font-size: 20px;
      color:#303133;
      font-weight: bold;
    }
  }
  .custom-title{
    width:100%;
    height:50px;
    line-height: 50px;
    border-bottom: 1px solid #E9E9E9;
    h3{
      text-align: left;
    }
    p{
      text-align: right;
      font-size: 12px;
      color:#FF6428;
      .icon-name{
        padding-left: 5px;
        transform: translateY(2px);
      }
    }
  }
  ///* 清除浮动 */
  //.clearfix:after {
  //  visibility: hidden;
  //  clear: both;
  //  display: block;
  //  content: ".";
  //  height: 0;
  //}
  .van-row-style{
    height:80px;
    width:100%;
  }
  .default-style{
    line-height:60px;
    font-size:20px;
    font-weight: 400;
    color:#909399;
  }
  .commission{
    padding:10px 0;
    img{
      width:16px;
      height:16px;
      margin-right: 5px;
    }
  }
  .username{
    padding:10px 0px;
    font-size: 14px;
    color:#303133;
    line-height: 20px;
    .principal{
      font-size: 20px;
      font-weight: bold;
      color: #303133;
      line-height: 32px;
    }
  }
  .article-steps{
    position: relative;
    &-steps{
      height:8px;
      width:100%;

      border-radius: 5px;
    }
  }
}
/deep/.van-cell{
  padding:0;
}
</style>

