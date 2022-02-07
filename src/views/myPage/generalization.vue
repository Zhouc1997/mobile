<template>
  <div style="padding-top:15px;">
    <div class="set clearfix">
      <div class="list-cell-but b-b">
        <div class="cell-describe-clear">
          <div class="clearfix">
            <p class="cell-tit" style="float:left;">已获得解锁奖励（元）</p>
            <div class="cell-tit" style="float:right; color: #FF8000" @click.stop="navTo('/specification')">
              <span>说明</span>
              <van-icon style="transform: translateY(3px);margin-left: 3px;" size="16px" name="question-o" />
            </div>
          </div>
          <p class="cell-num-total">{{ countInfo.AlreadyAmount || 0 }}</p>
        </div>
        <van-row>
          <van-col span="12"><span>待获得解锁奖励 {{countInfo.WaitAmount || 0 }}</span></van-col>
          <van-col span="12"><span>可用解锁奖励 {{countInfo.UnLockFanli || 0 }}</span></van-col>
        </van-row>
        <div class="arrive-back clearfix">
          <div class="arrive-back-left">我的邀请码：{{ code }}</div>
          <div class="arrive-back-right">
            <span style="display: inline-block" @click.stop="navTo('/hfDetails')">去推广</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="set-title clearfix">
      <h3>用户列表</h3>
      <p>共推广用户：{{UserCount || 0}} 名</p>
    </div>
    <div style="height:calc(100vh - 290px); overflow: auto">
      <refresh-list ref="refreshList" >
        <template v-if="list.length > 0">
          <div class="set clearfix" style="padding-top: 0" v-for="(item,index) in list" :key="index">
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div class="user-info">
                  <div class="user-info-box">
                    <div class="portrait-box">
                      <img class="portrait" v-if="item.AvatarUrl" :src="item.AvatarUrl" />
                      <img class="portrait" v-else :src="headPhoto" />
                      <div class="username" style="color:#909399;">
                        <p style="color: #303133">{{ item.UserName }}</p>
                        <p class="username-phone">加入时间：{{ item.CreateTime }}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </template>
              <template #label>
                <div class="username">
                  <p>{{ '完成任务金额（元）' }}</p>
                  <p class="principal">{{item.OrderAmount }}</p>
                </div>
              </template>
            </van-cell>
          </div>
        </template>
        <div v-else class="no-data-img">
          <van-empty
              :image="noDataImg"
              description="暂无信息"
          />
        </div>
      </refresh-list>

    </div>
<!--    <div v-else class="no-data-img">-->
<!--      <van-empty-->
<!--          :image="noDataImg"-->
<!--          description="暂无推广信息"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>
<script>
import {ExtendInfo,ExtendInfoPage,refereeCodeInfo,AccountInfo} from '@/api/user.js'
import { refreshList } from '@/components/refreshList.js'
import {
  isWebview,
  goSystemUrl,
} from "@/utils/navigator.js"
export default {
  mixins:[refreshList],
  data(){
    return{
      code:'',
      totalPage:0,
      noOrder:false,
      UserCount:0,
      countInfo:{},
      noDataImg:require('../../assets/lack.png'),
      headImg:require('../../assets/promotion-big.png'),
      headPhoto:require('../../assets/profile-photo.png')
    }
  },
  created() {
    this.getRefereeCodeInfo()
    this.getExtendInfo()
    this.getAccountInfo()
  },
  methods:{
    // 去推广
    navTo(url){
      // 路由跳转
        if (isWebview) {
          const {
            origin
          } = location
          goSystemUrl({
            url: `${origin}/#${url}`
          })
        } else {
          this.$router.push(url)
        }
    },
    // 收益相关
    async getAccountInfo(){
      const [err,data] = await AccountInfo()
      if(err) return
      this.countInfo = data
      console.log(data)
    },
    // 获取用户推荐码 和绑定的推荐码
    async getRefereeCodeInfo(){
      const [err,data] = await refereeCodeInfo()
      if(err) return
      this.code = data.SelfRefereeCode
    },
    // 获取发展用户总人数
   async getExtendInfo(){
      const  [err,data] = await ExtendInfo()
     if(err) return
     this.UserCount = data.UserCount
    },
    // 推广分页信息
    async init(callback, isRefresh) {
      const { Page, Limit } = this
      const [err,data] = await ExtendInfoPage({
        page: Page,
        limit: Limit,
      })
      if(err) return
      const results = data.rows || []
      this.totalPage = data.total
      this.$nextTick(() => {
        callback && callback(isRefresh, results)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.set{
  margin: 0 20px 10px;
  border-radius: 12px;
  background: #fff;
  padding: 15px;
  .list-cell-but{
    line-height: 60px;
    .cell-describe-clear{
      margin-right: 10px;
    }
    .cell-describe{
      float:left;
      margin-right: 10px;
    }
    .cell-more {
      width:70px;
      font-size: 14px;
      color: #909399;
      margin-left: 10px;
      float:right;
      transform: translateY(8px);
    }

    .cell-tit {
      color: #909399;
      font-size:12px;
      line-height: 20px;
    }
    .cell-num{
      color: #606266;
      font-size:20px;
      line-height: 30px;
    }
    .cell-num-total{
      color: #303133;
      font-size:32px;
      line-height: 40px;
    }
    .arrive-back{
      width:100%;
      line-height: 30px;
      padding:3px 10px;
      border-radius: 5px;
      background:#FDECE2;
      &-right{
        float: right;
        color:#FF6428;
      }
      &-left{
        float: left;
        color:#731A00 ;
      }
    }
  }
  .custom-title{
    width:100%;
    border-bottom: 1px solid #E9E9E9;
    span{
      font-size: 18px;
      color:#303133;
      padding-left: 5px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 50px;
    }
  }
}
.set-title{
  margin: 0 20px;
  line-height: 25px;
  padding:10px 5px;
  font-size: 14px;
  h3{
    color: #303133;
  }
  p{
    color: #909399;
  }
}
.custom-title{
  width:100%;
  border-bottom: 1px solid #E9E9E9;
  p{
    font-size: 12px;
    color:#303133;
  }
  span{
    padding-left: 5px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 50px;
  }
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
  font-size: 12px;
  color:#909399;
  line-height: 20px;
  .principal{
    font-size: 20px;
    font-weight: bold;
    color: #303133;
    line-height: 32px;
  }
}
/deep/.van-cell{
  padding:0;
}
.user-section {
  background:url("../../assets/backdrop.png") no-repeat;
  width:100%;
  height:140px;
  background-size:100% 100%;
  position: relative;
  padding: 30px 20px 0;
}
.user-info{
  border-bottom: 1px solid #E9E9E9;
}
.no-data-img{
  height:calc(100vh - 290px);
  width:100%;
  background:#fff;
}
.user-info-box {
  height: 90px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  .portrait-box {
    display: flex;
    align-items: center;

    .portrait {
      width: 50px;
      height: 50px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
    .username {
      font-size:16px;
      color: #fff;
      margin-left: 10px;
      line-height:25px;
      &-phone{
        font-size:12px;
      }
    }
  }
}

</style>
