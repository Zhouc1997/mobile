<template>
  <div>
    <div class="user-section">
      <!--用户信息-->
      <div class="user-info-box">
        <div class="portrait-box">
          <img class="portrait" :src="headImg" />
          <div class="username">
            <p>当前{{ countInfo.Total }}笔订单本金待返</p>
            <p class="username-phone">{{ countInfo.Amount }}元</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height:calc(100vh - 140px); overflow: auto">
      <refresh-list ref="refreshList" >
      <template v-if="list.length > 0">
        <div class="set clearfix" style="padding-top: 0;margin-bottom: 15px;"  v-for="item,index in list" :key="index">
          <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="custom-title">
                <p>下单时间:<span>{{dayjs(item.DebtStart).format('YYYY-MM-DD')}}</span></p>
              </div>
            </template>
            <template #label>
              <van-row gutter="20">
                <van-col span="12">
                  <div class="username">
                    <p>{{ '本金（元）' }}</p>
                    <p class="principal">{{ item.Amount }}</p>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="username">
                    <p>{{ '周期（天）' }}</p>
                    <p class="principal">{{ item.Debt }}</p>
                  </div>
                </van-col>
              </van-row>
              <van-row :gutter="20" style="line-height: 40px">
                <van-col span="16">
                  <van-progress :percentage="item.percentage" :pivot-text="item.TodayDiffer" color="linear-gradient(270deg, #FF8000 0%, #FF6428 100%)" stroke-width="8" />
                </van-col>
                <van-col span="8">
                  <span>{{dayjs(item.DebtEnd).format('YYYY-MM-DD')}}</span>
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </div>
      </template>
      <div v-else class="no-data-img">
        <van-empty
            :image="noDataImg"
            description="暂无账单信息"
        />
      </div>
    </refresh-list>
    </div>
  </div>
</template>
<script>
import { refreshList } from '@/components/refreshList.js'
import {GetDebtInfoPage} from '@/api/user.js'
import {DebtInfoAmount} from "../../api/user";
export default {
  mixins:[refreshList],
  data(){
    return{
      value:100,
      countInfo:{},
      noDataImg:require('../../assets/lack.png'),
      headImg:require('../../assets/Order-icon.png'),
    }
  },
  created() {
    this.getDebtInfoAmount()
  },
  methods:{
    async getDebtInfoAmount(){
      const [err,data] = await DebtInfoAmount({  Status:2,})
      if(err) return
      this.countInfo = data
    },
    // 佣金信息
    async init(callback, isRefresh) {
      const { Page, Limit } = this
      const [err,data] = await GetDebtInfoPage({
        Status:2,
        page: Page,
        limit: Limit,
      })
      if(err) return
      const results = data.rows.length ? data.rows.map(item => {
        let dateStart = this.dayjs(item.DebtStart).format('YYYY-MM-DD')
        let dateEnd = this.dayjs(item.DebtEnd).format('YYYY-MM-DD')
        let newDay = this.dayjs(new Date()).format('YYYY-MM-DD')
        const totalDays = this.dayjs(dateEnd).diff(dateStart,'day')
        const TodayDiffer = this.dayjs(dateEnd).diff(newDay,'day')
       return{
          ...item,
         totalDays:totalDays,
         TodayDiffer:TodayDiffer > 0 ? '还剩' + TodayDiffer + '天' : '已完成',
         percentage:TodayDiffer < 0 ? 100 :(Number(totalDays)  - Number(TodayDiffer) ) / Number(totalDays) * 100
       }
      }) : []
      this.totalPage = data.total
      this.$nextTick(() => {
        callback && callback(isRefresh, results)
      })
    },
  }
}
</script>
<style lang="less" scoped>
.set{
  margin: 10px 20px;
  border-radius: 12px;
  background: #fff;
  padding: 15px;
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
.article-steps{
  position: relative;
  &-steps{
    height:8px;
    width:100%;

    border-radius: 5px;
  }
}
/deep/.van-progress{
  transform:translateY(17px);
  background: linear-gradient(270deg, #FF8000 0%, #FF6428 100%);
}
/deep/.van-cell{
  padding:0;
}
.no-data-img{
  height:calc(100vh - 140px);
  width:100%;
  background:#fff;
}
.user-section {
  background:url("../../assets/backdrop.png") no-repeat;
  width:100%;
  height:140px;
  background-size:100% 100%;
  position: relative;
  padding: 30px 20px 0;
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
}

</style>
