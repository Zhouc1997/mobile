<template>
  <div style="padding-top: 10px">
    <div class="set clearfix">
      <div class="list-cell-but b-b">
        <div class="cell-describe-clear">
          <p class="cell-tit">总收益金额（元）</p>
          <p class="cell-num-total">{{ countInfo.AmountTotal }}</p>
        </div>
        <van-row>
          <van-col span="12"><span>已返本金: {{countInfo.SettleAmount }}</span></van-col>
          <van-col span="12"><span>待解锁佣金 {{countInfo.UnLockFanli }}</span></van-col>
        </van-row>
        <div class="arrive-back clearfix">
          <div class="arrive-back-left">我的待返本金共有{{countInfo.UnSettleAmount }}元</div>
          <div class="arrive-back-right">
            <span style="display: inline-block" @click.stop="navTo('/returnPrincipal')">去查看</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="set clearfix">
      <div class="list-cell-but b-b">
        <div class="cell-describe">
          <p class="cell-tit">共完成订单（笔）</p>
          <p class="cell-num">{{ countInfo.OrderCount  }}</p>
        </div>
        <van-button round  class="cell-more" color="#FF6428"  size="small" @click="navTo('/orderInfo')">去查看</van-button>
      </div>
    </div>
    <div class="set clearfix" style="padding-top: 0">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <p class="custom-title">
            <span>佣金信息</span>
          </p>
        </template>
        <template #label>
          <div class="label-height">
            <refresh-list ref="refreshList" >
              <template v-if="list.length > 0">
                <div v-for="item,index in list" :key="index" class="commission">
                  <van-cell center>
                    <template #title>
                      <p>
                        <!--                      <img :src="item.icon" alt="">-->
                        <span style="font-size: 14px">{{item.UserName}}</span>
                      </p>
                    </template>
                    <template #label>
                      <p style="width:200px;">到账时间：<span>{{item.SettleTime}}</span></p>
                    </template>
                    <template #default>
                      <span style="color:#303133;">+{{item.Fanli}}</span>
                    </template>
                  </van-cell>
                </div>
              </template>
              <div v-else class="no-data-img">
                <van-empty
                    :image="noDataImg"
                    description="暂无佣金信息"
                />
              </div>
            </refresh-list>
          </div>

        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import {FanliPage} from '@/api/user.js'
import { refreshList } from '@/components/refreshList.js'
import {AccountInfo} from "../../api/user";
export default {
  mixins:[refreshList],
  data(){
    return{
      countInfo:{},
      noDataImg:require('../../assets/lack.png')
    }
  },
  created() {
    this.getAccountInfo()
  },
  methods:{
    // 收益相关
    async getAccountInfo(){
      const [err,data] = await AccountInfo()
      if(err) return
      this.countInfo = data
      console.log(data)
    },
    // 佣金信息
    async init(callback, isRefresh) {
      const { Page, Limit } = this
      const [err,data] = await FanliPage({
        page: Page,
        limit: Limit,
      })
      if(err) return
      const results = data.rows || []
      this.totalPage = data.total
      this.$nextTick(() => {
        callback && callback(isRefresh, results)
      })
    },
    navTo(url,row){
      console.log(row)
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less" scoped>
.set{
  margin: 0px 20px 10px;
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
.label-height{
  height:calc(100vh - 400px);
  overflow: auto;
}
.commission{
  padding:10px 0;
  img{
    width:16px;
    height:16px;
    margin-right: 5px;
  }
}
/deep/.van-cell{
    padding:0;
}

</style>
