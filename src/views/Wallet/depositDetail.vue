<template>
  <div style="padding-top: 15px">
    <div class='main' v-if="isShow">
      <div class="pay-operation">
        <div class="balance">
          <div class="balance-text">
            {{activeItem.OrderType===1?'话费充值业务押金（元）':''}}
          </div>
          <div class="balance-num">
            {{activeItem.Amount || 0}}
          </div>
        </div>
        <div class="withdrawal">
          <van-button round type="info" :disabled="!activeItem.Amount || activeItem.Status === 3" size="large" color="#FF6428" @click="Refund">{{ activeItem.Status === 3 ? '退款中' : '退押金'}}</van-button>
        </div>
      </div>
      <div class="explain">
        <div class="title">
          退押金说明：
        </div>
        <div class="tips">
          1、退押金时：不能有被锁定的订单、不能有未结款的订单。
          提交退押金申请后，不能再接任务。<br />
          2、提交申请后次日处理。<br />
          3、在线支付的退回原支付卡。退款周期受银行、支付机构
          相关因素影响，请及时关注银行卡信息。
        </div>
      </div>
    </div>
    <div v-else class="main-dredge">
      <div class="main-dredge-img"></div>
      <div class="main-dredge-title">您暂未开通话费充值业务</div>
      <div class="withdrawal">
        <van-button round type="info" size="large" color="#FF6428" @click="navTo('/code')">去开通</van-button>
      </div>
    </div>
  </div>

</template>

<script>
    import {
        GetDepositInfo,
        Refund
    } from '@/api/wallet.js'
    import {
      isWebview,
      goSystemUrl,
    } from "@/utils/navigator.js"
    import { Toast,Dialog} from 'vant'
    export default {
        components: {},
        data() {
            return {
              isShow:true,
              depositNum: '',
              activeItem:{},
              type:'',
              id:''
            }
        },
        methods: {
          // 跳转 签约
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
          //
           async getList() {
              const [err, res] = await GetDepositInfo()
              console.log(err, res);
               if(JSON.stringify(res.list) !== "{}"){
                 this.activeItem = res.list
                 // this.activeItem.Amount = 0
                 this.isShow = true
               }else{
                 this.isShow = false
               }
            },
             Refund(){
              Dialog.confirm({
                message: '确认退押金并关闭话费充值业务吗？',
              }).then(async () => {
                  let params = {
                    WorkType:this.activeItem.OrderType,
                    Cid:this.activeItem.Id
                  }
                  const [err,res] = await Refund(params)
                  console.log(err,res);
                  if(!err){
                    Toast.success(res);
                    setTimeout(()=>{
                      this.$router.go(-1)
                    },1000)
                  }
              }).catch(() => {
                    // on cancel
              });

            }
        },
        created() {
            this.type = Number(this.$route.query.type)
            this.id = this.$route.query.id
            // debugger
            console.log(this.$route);
            this.getList()
        },
        mounted() {},
    }
</script>
<style lang='less' scoped>
.main {
  margin:0 20px;
  .pay-operation {
    position: relative;
    box-sizing: border-box;
    height: 200px;
    padding:20px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 10px;
    .balance {
      margin-bottom: 20px;

      &-text {
        font-size: 12px;
        color: #909399;
        padding-top: 10px;
        text-align: center;
      }

      &-num {
        color: #303133;
        font-size: 32px;
        font-weight: bold;
        padding: 10px 0;
        text-align: center;
      }
    }

    .withdrawal {
      .van-button {
        height: 40px;
        box-shadow: 0px 5px 10px rgba(255, 100, 40, 0.4);
      }
    }

    .deposit {
      position: absolute;
      top: 20px;
      right: 0;
      width: 87px;
      height: 28px;
      background: #FDECE2;
      opacity: 1;
      line-height: 28px;
      font-size: 12px;
      color: #731A00;
      text-align: center;
      border-radius: 15px 0px 0px 15px;
    }
  }
  .set-title{
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
  .bill {
    box-sizing: border-box;
    // height: 170px;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 15px;

    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .left {
        color: #303133;
        font-size: 17px;
        font-weight: bold;
      }

      .right {
        color: #606266;
        font-size: 14px;
        display: flex;
        align-items: center;

        img {
          margin-left: 4px;
          // vertical-align: middle;
          width: 5px;
        }
      }
    }

    .line {
      height: 1px;
      background-color: #E9E9E9;
    }

    &-list {
      .bill-item {
        padding: 11px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item-name-time {
          .item-name {
            font-size: 14px;
            color: #303133;
            margin-bottom: 5px;
          }

          .item-time {
            font-size: 12px;
            color: #909399;
          }
        }

        .bill-num {
          font-size: 15px;
          color: #303133;
        }
      }
    }
  }
  .explain {
    font-size: 12px;
    color: #909399;

    .title {
      font-size: 14px;
      color: #303133;
      margin-bottom: 6px;
    }

    .tips {
      line-height: 20px;
    }
  }
  .nomore {
    // height: calc(100vh - 30px);
    font-size: 14px;
    color: #9B9EA9;
    // padding-top: 135px;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;

    img {
      width: 200px;
      height: 200px;
    }

  }
}
.main-dredge{
  height:336px;
  margin:0 20px;
  background: white;
  &-img{
    height:180px;
    width: 236px;
    margin: 0 auto;
    background: url("../../assets/Temporary .png") no-repeat top left;
    background-size: 100%;
  }
  &-title{
    color:#303133;
    font-size: 16px;
    font-weight: bold;
    line-height: 23px;
    text-align: center;
    padding:20px;
  }
  .withdrawal {
    margin:10px 20px;
    .van-button {
      height: 40px;
      box-shadow: 0px 5px 10px rgba(255, 100, 40, 0.4);
    }
  }
}
</style>
