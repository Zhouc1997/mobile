<template>
  <div style="padding-top: 10px">
    <div :class="Number(orderInfo.IsLock) === 1 ? 'set-bg' : 'set'">
        <van-form label-width="105px" label-class="labelClass">
          <van-field v-model="orderInfo.OrderStatus" input-align="right" label-align="left" label="充值状态" readonly/>
          <van-field v-model="orderInfo.PayStatus" input-align="right"  v-if="Number(orderInfo.OrderType) === 4" label-align="left" label="支付状态" readonly/>
          <van-field v-model="orderInfo.SettleState" v-if="orderInfo.OrderStatus !== '失败'" input-align="right" label-align="left" label="结算状态" readonly/>
          <van-field v-model="orderInfo.RefundStatus" input-align="right"  v-if="Number(orderInfo.OrderType) === 4 && orderInfo.OrderStatus === '失败'" label-align="left" label="退款状态" readonly/>
          <van-field v-model="orderInfo.OrderId" input-align="right"  label-align="left"  label="订单编号" readonly />
          <van-field v-model="orderInfo.SubmitTime" input-align="right" label-align="left" label="充值时间" readonly/>
          <van-field v-model="orderInfo.Phone" input-align="right" label-align="left" label="充值号码"  readonly/>
          <van-field v-model="orderInfo.Isp" input-align="right" label-align="left" label="运营商" readonly/>
          <van-field v-model="orderInfo.Province" input-align="right" label-align="left" label="省市" readonly/>
          <van-field v-model="orderInfo.Amount" input-align="right" label-align="left" label="任务金额"  readonly>
            <template #input>
              <div>{{orderInfo.Amount}} 元</div>
            </template>
          </van-field>
          <van-field v-model="orderInfo.Debt" v-if="orderInfo.OrderStatus !== '失败'" input-align="right" label-align="left" label="到账天数"  readonly>
            <template #input>
              <div>{{orderInfo.Debt}} 天</div>
            </template>
          </van-field>
          <van-field v-model="orderInfo.Fanli" v-if="orderInfo.OrderStatus !== '失败'" input-align="right" label-align="left" label="任务奖励金额"  readonly>
            <template #input>
              <div>{{orderInfo.Fanli}} 元</div>
            </template>
          </van-field>
          <van-field v-model="orderInfo.category" v-if="Number(orderInfo.OrderType) !== 4" input-align="right" label-align="left" label="上传凭证" readonly>
            <template #input>
                <div style="color:#FFA27E; margin-left: 10px" v-if="['待结算'].includes(orderInfo.SettleState)" @click="navTo('/myPage/imgUpload')">修改</div>
                <div v-else style="color:#FFA27E; margin-left: 10px"  @click="navTo('/myPage/imgUpload')">点击查看</div>
            </template>
          </van-field>
        </van-form>
    </div>
  </div>
</template>
<script>
import {OrderDetail} from '@/api/user.js'
export default {
  data(){
    return{
      orderInfo:{
        OrderId:'',
      },
      id:this.$route.query.id
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods:{
    // 跳转
    navTo(url){
      this.$router.push({
        path:url,
        query:{
          info:this.orderInfo
        }
      })
    },
    // 获取数据
    async getOrderDetail(){
      const [err,data] = await OrderDetail({oid:this.id})
      if(err) return
      this.orderInfo = data
      // this.orderInfo.OrderId = '211212112'
      this.orderInfo.RealAmount = Math.floor(data.RealAmount * 10 ) / 10
      this.orderInfo.Amount = Math.floor(data.Amount * 10 ) / 10
      this.orderInfo.Isp = String(data.Isp) === '1' ? '移动' :String(data.Isp) === '2' ? '联通' : String(data.Isp) === '3' ? '电信' : ''
      this.orderInfo.SettleState = [0,2].includes(Number(data.SettleState)) ?  '待结算' :'已结算'
      this.orderInfo.RefundStatus = Number(data.RefundStatus) === 0 ?  '未退款' :Number(data.RefundStatus) === 1 ?  '退款成功' : '退款中'
      this.orderInfo.PayStatus = Number(data.PayStatus) === 1 ?  '支付成功' :  '支付中'
      this.orderInfo.OrderStatus = String(data.OrderStatus) === '0' ?
          '未处理' :String(data.OrderStatus) === '1' ?
          '充值中' :String(data.OrderStatus) === '2' ?
          '充值成功' :'失败'

    }
  }
}
</script>
<style scoped lang="less">
.set-bg {
  margin: 0 20px;
  border-radius: 12px;
  padding: 15px 3px;
  background: #fff url("../../assets/IsLock-icon.png") no-repeat top right;
}
.set {
  margin: 0 20px;
  border-radius: 12px;
  padding: 15px 3px;
  background: #fff;
}
/deep/.van-cell::after{
  border-bottom: 0;
}
/deep/.van-field__control{
  color:#606266;
}
/deep/ .van-cell{
  background-color: rgba(255,255,255,0);
}
</style>
