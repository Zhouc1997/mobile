<template>
  <div>
    <van-tabs v-model="active" class="tabs-style" title-inactive-color="#606266" title-active-color="#FF6428" @click="tabClick">
      <van-tab title="已获得"></van-tab>
      <van-tab title="待获得"></van-tab>
    </van-tabs>
    <div class="set-title clearfix" v-if="list.length > 0">
      <p>合计金额：{{money}}元</p>
    </div>
    <div :class="list.length > 0 ? 'mod-height' : 'mod-max-height'">
      <refresh-list ref="refreshList" >
        <template v-if="list.length > 0">
          <div class="set clearfix" style="padding-top: 0;margin-bottom: 15px;"  v-for="item,index in list" :key="index"  @click.stop="navTo('/orderDetails',item)">
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div class="custom-title clearfix">
                  <p>下单时间：<span>{{dayjs(item.CreateTime).format('YYYY-MM-DD')}}</span></p>
                </div>
              </template>
              <template #label>
                <van-row gutter="20">
                  <van-col span="10">
                    <div class="username">
                      <p>{{ item.Phone }}</p>
                    </div>
                  </van-col>
                  <van-col span="14">
                    <div class="username">
                      <p style="text-align: right;font-size: 12px; color:#909399;">{{ '充值面额：' + item.Amount + '元' }}</p>
                    </div>
                  </van-col>
                </van-row>
                <van-row gutter="20">
                  <van-col span="10">
                    <div class="username">
                      <p>{{ '奖励金额' }}</p>
                    </div>
                  </van-col>
                  <van-col span="14">
                    <div class="username">
                      <p style="text-align: right;font-weight: bold;font-size: 20px; color:#FF6428;">{{ item.Fanli || 0 }}</p>
                    </div>
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
import {PrizeOrderPageList} from "../../api/user";
export default {
  name:'',
  mixins:[refreshList],
  data(){
    return{
      active:0,
      money:0,
      countInfo:{},
      noDataImg:require('../../assets/lack.png'),
      headImg:require('../../assets/Order-icon.png'),
    }
  },
  created() {
    if(this.$route.query.sentNum){
      this.money = this.$route.query.sentNum
    }
  },
  methods:{
    // tab 切换
    tabClick(){
      this.Page = 1
      if(this.active === 0){
        this.money = this.$route.query.sentNum
      }else{
        console.log( )
        this.money = this.$route.query.num
      }
      this.search()
    },
    // 佣金信息
    async init(callback, isRefresh) {
      const { Page, Limit } = this
      const [err,data] = await PrizeOrderPageList({
        page: Page,
        limit: Limit,
        IsFanli:this.active === 1 ? 0 : 1,
      })
      if(err) return
      const results = data.rows || []
      this.totalPage = data.total
      this.$nextTick(() => {
        callback && callback(isRefresh, results)
      })
    },
    // 路由跳转
    navTo(url,row){
      this.$router.push({
        path:url,
        query:{ id: row.Id}
      })
    }
  }
}
</script>
<style scoped lang="less">
.tabs-style{
  height:44px;
  line-height: 44px;
  font-size: 16px;
}
.set-title{
  height:40px;
  margin:0 20px;
  line-height: 30px;
  padding:10px 5px;
  font-size: 14px;
  p{
    color: #303133;
  }
}
.mod-height{
  height:calc(100vh - 100px);
  overflow: auto
}
.mod-max-height{
  height:calc(100vh - 50px);
  overflow: auto
}
/deep/.van-tabs__line{
  background-color:#FF6428
}
.set{
  margin: 10px 20px;
  border-radius: 12px;
  background: #fff;
  padding: 15px;
}
.custom-title{
  width:100%;
  height:50px;
  line-height: 50px;
  border-bottom: 1px solid #E9E9E9;
  p{
    font-size: 16px;
    color:#303133;
    float: left;
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
