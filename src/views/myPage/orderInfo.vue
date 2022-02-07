<template>
  <div style="padding-top: 10px">
    <div class="set clearfix">
      <refresh-list ref="refreshList" >
        <template v-if="list.length > 0">
          <div v-for="item,index in list" :key="index" class="commission" @click.stop="navTo('/orderDetails',item)">
            <van-cell center>
              <template #title>
                <p>
                  <!--                <img :src="item.icon" alt="">-->
                  <span style="font-size: 14px">{{item.Phone}}</span>
                </p>
              </template>
              <template #label>
                <p style="width:200px;">充值时间：<span>{{item.SubmitTime}}</span></p>
              </template>
              <template #default>
                <span style="color:#303133;"><span>+</span>{{item.RealAmount || 0}}</span>
              </template>
            </van-cell>
          </div>
        </template>
        <div v-else class="no-data-img">
          <van-empty
              :image="noDataImg"
              description="暂无订单信息"
          />
        </div>
      </refresh-list>
    </div>
  </div>

</template>
<script>
import { refreshList } from '@/components/refreshList.js'
import {OrderListPage} from '@/api/user.js'
export default {
  mixins:[refreshList],
  data(){
    return{
      Limit:12,
      totalPage:0,
      noDataImg:require('../../assets/lack.png')
    }
  },
  methods:{
    // 订单信息
    async init(callback, isRefresh) {
      const { Page, Limit } = this
      const [err,data] = await OrderListPage({
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
<style lang="less" scoped>
.set {
  margin: 0px 20px;
  border-radius: 12px;
  background: #fff;
  padding: 5px 15px;
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
  .no-data-img{
    height:calc(100vh - 140px);
    width:100%;
    background:#fff;
  }
}
</style>
