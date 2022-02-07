<template>
  <div class="home">
    <div class="topDiv">
      <!-- 标题 -->
      <!-- 统计充值金额 -->
      <div class="totalTop">
        <div class="data">
          <div class="top">累计赚取(元)</div>
          <div class="middle">{{data.month}}</div>
          <div class="bottom">本月新增{{data.total}} <img src="../../assets/topIcon.png"></div>
        </div>
        <div class="icon">
          <img src="../../assets/money.png">
        </div>
      </div>
    </div>
    <!-- 宁可赚介绍图 -->
    <div class="introduce" @click="gotoDetails()">
      <img src="../../assets/banner.png">
    </div>
    <!-- 推荐 -->
    <div class="recommend">推荐任务</div>
    <!-- 任务模块 -->
    <div class="content" >
      <div class="huafei">
        <div class="top">{{businessList[0].TypeName}} {{businessList[0].ParticipantCount}}人正在参与</div>
        <div class="middle">超低门槛 快速回款</div>
        <div class="bottom"><img src="../../assets/icon1.png"> 资金安全有保障</div>
        <div class="btn" @click="gotoTask()">查看任务</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getDataApi,
    getTaskPeopleApi
  } from "@/api/home.js";
  import {
    goTabBar,
    isWebview,
    goSystemUrl,
    onSystemPageShow
  } from "@/utils/navigator.js"
  export default {
    data() {
      return {
        data: {},
        businessList: [{}],
      };
    },
    created() {
      this.getData();
      this.getTaskPeopleFn();
    },
    mounted() {
      onSystemPageShow((param) => {
        console.log(param);
        this.getData();
        this.getTaskPeopleFn();
      })
    },
    methods: {
      gotoTask() {
        if (isWebview) {
          goTabBar(goTabBar.TASK)
        } else {
          this.$router.push('/task')
        }
      },
      gotoDetails() {
        let url = "/hfDetails";
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
      // 获取统计数据
      async getData() {
        const [err, res] = await getDataApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        this.data = res;
        console.log("111111", res);
      },
      async getTaskPeopleFn() {
        const [err, res] = await getTaskPeopleApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        this.businessList = res;
        console.log("业务列表=======", res);
      }
    },
  };
</script>
<style lang="less" scoped>
  .home {
    height: 100%;
    background: url("../../assets/homeBg.png") no-repeat;
    background-size: contain;
    font-family: PingFang SC;

    .topDiv {
      padding: 0 16px;
      // background: url("../assets/topBg.svg") no-repeat -40px;
      // height: 250px;
      overflow: hidden;
      padding-bottom: 30px;

      .title {
        margin-top: 52px;
        margin-bottom: 34px;
        padding-left: 10px;
        height: 25px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 25px;
        color: #333;
        opacity: 1;

      }

      .totalTop {
        margin-top: 52px;
        height: 106px;
        display: flex;
        padding: 0 15px;

        .data {
          width: 130px;
          height: 106px;

          .top {
            height: 21px;
            font-size: 15px;
            font-weight: 400;
            color: #FFFFFF;
          }

          .middle {
            height: 64px;
            font-size: 30px;
            line-height: 64px;
            font-family: DINPro;
            font-weight: bold;
            color: #FFFFFF;
          }

          .bottom {
            height: 21px;
            font-size: 15px;
            font-weight: 400;
            color: #FFFFFF;

            img {
              width: 13px;
              height: 16px;
              vertical-align: middle;
            }
          }
        }

        .icon {
          width: 120px;
          height: 81px;
          margin-top: 10px;
          margin-left: 40px;

          img {
            width: 100%;
            height: 100%;
          }
        }

      }
    }

    .introduce {
      width: 100%;
      height: 168px;
      padding: 0 15px;

      img {
        width: 100%;
        height: 100%
      }
    }

    .recommend {
      background: #ffffff;
      padding: 0 15px;
      height: 70px;
      line-height: 70px;
      font-size: 17px;
      font-weight: bold;
      color: #303133;
      opacity: 1
    }


    .content {
      position: relative;
      padding: 0 20px 16px 16px;
      opacity: 1;
      background: #ffffff;

      .huafei {
        height: 186px;
        border-radius: 10px;
        // background: #FFF1EB;
        opacity: 1;
        padding: 19px 0 13px 15px;
        background: url('../../assets/HFbg.png') no-repeat;
        background-size: contain;

        .top {
          height: 21px;
          font-size: 15px;
          font-weight: 500;
          line-height: 21px;
          color: #731A00;
        }

        .middle {
          margin-top: 17px;
          height: 28px;
          font-size: 20px;
          font-weight: bold;
          line-height: 28px;
          color: #414342;

        }

        .bottom {
          margin-top: 5px;
          height: 21px;
          font-size: 15px;
          font-weight: 500;
          line-height: 21px;
          color: #731A00;

          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
        }

        .btn {
          margin-top: 18px;
          width: 92px;
          height: 40px;
          background: #FF6428;
          opacity: 1;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 500;
          line-height: 40px;
          text-align: center;
          color: #FFFFFF;
        }



      }

      .tip {
        margin-top: 15px;
        background: #ffffff;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        opacity: 1;
        border-radius: 10px;
        padding: 20px 15px;

        .header3 {
          height: 23px;
          font-size: 16px;
          font-weight: 400;
          line-height: 19px;
          color: #111111;
          opacity: 1;

          .img1 {
            width: 18px;
            height: 18px;
            float: left;
            vertical-align: middle;
            margin-right: 8px;
          }

          .img2 {
            width: 18px;
            height: 18px;
            float: right;
            vertical-align: middle;
          }
        }
      }


    }



    /deep/ .van-cell {
      padding: 0 0 7px 0;
      border-bottom: 1px solid #dfdfdf;
    }

    /deep/ .van-field__control {
      font-size: 15px;
    }

    /deep/ .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border: 0;
    }
  }
</style>