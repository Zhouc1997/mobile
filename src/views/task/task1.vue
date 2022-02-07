<template>
  <div class="home">

    <!-- 头部卡片数据 -->
    <div class="top">
      <div @click="routerFn('workTime')">设置工作时间</div>
      <div class="topDiv">
        <div class="help" @click="routerFn('/help')">帮助</div>
        <div class="topTitle">
          <div class="money">{{todayData.Amount}}</div>
          <div class="company">今日已赚(元)</div>
          <div class="number">今日已完成{{todayData.Count}}单</div>
          <div class="quota">
            <div class="quota1 marLeft">
              <div class="left"></div>
              <div class="right">可用额度：{{numArr.OrderQuota}}元</div>
            </div>
            <div class="quota1">
              <div class="left"></div>
              <div class="right">可用单数：{{numArr.TaskCount}}单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 任务筛选 -->
    <div class="taskSelect" v-if="searchFlag">
      <div class="head">
        <div class="left">任务筛选</div>
        <!-- <div class="right">设为默认条件</div> -->
      </div>
      <div class="content1">
        <van-cell title="省份" is-link :center="true" :border='false' :value="province" @click="getProvinceList()" />
        <van-cell title="周期" is-link :center="true" :border='false' :value="cycle" @click="getCycleList()" />
        <van-cell title="货源" is-link :center="true" :border='false' :value="source" @click="getSourceList()" />
        <van-cell title="面值" is-link :center="true" :border='false' :value="faceValue" @click="getFaceValueList()" />
      </div>
    </div>
    <!-- 获取任务 -->
    <div class="getTask" v-if="searchFlag">
      <div class="btn" @click="getTaskFn()">获取任务</div>
    </div>
    <!-- 充值模块 -->
    <div class="content" v-if="!searchFlag">
      <div class="recharge">
        <div class="time">
          <div class="txt">
            <van-count-down :time="timeValue" @finish="refresh()">
              <template #default="timeData">
                <span class="colon">剩余时间：</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">分</span>
                <span class="block">{{ timeData.seconds }}</span>
                <span class="colon">秒</span>
              </template>
            </van-count-down>
          </div>

        </div>
        <div class="number">
          <div class="top">充值号码</div>
          <div class="middle">
            <span class="btnTxt">{{taskData.Phone}}</span>
            <span class="btnCopy" @click="copyFn()">复制</span>
          </div>
          <div class="bottom">({{taskData.Province}}{{taskData.IspName}},仅支持{{taskData.PayWay}}渠道充值)</div>
        </div>
        <div class="tip">

          <div class="txt">
            <div class="top">{{taskData.Amount}}元</div>
            <div class="bottom">面值</div>
          </div>
          <div class="txt">
            <div class="top">{{taskData.RealAmount}}元</div>
            <div class="bottom">结算价格</div>
          </div>
          <div class="txt">
            <div class="top">{{taskData.Debt}}天</div>
            <div class="bottom">周期</div>
          </div>
          <div class="txt">
            <div class="top">{{taskData.MaxAmount}}元</div>
            <div class="bottom">最多可赚</div>
          </div>
        </div>
        <div class="btn">
          <div class="btnContent">
            <div class="giveUp" @click="giveShow = true">放弃任务</div>
            <div class="txt" @click="gotoImg()">我已充值</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <van-popup v-model="proviceShow" position="bottom" round :safe-area-inset-bottom='true'
      :close-on-click-overlay='false'>
      <van-picker title="" show-toolbar :columns="provinceList" :loading="loading" @cancel="proviceShow = false"
        @confirm='provinceFn' />
    </van-popup>
    <van-popup v-model="cycleShow" position="bottom" round :safe-area-inset-bottom='true'
      :close-on-click-overlay='false'>
      <van-picker title="" show-toolbar :columns="cycleList" :loading="loading" @cancel="cycleShow = false"
        @confirm='cycleFn' />
    </van-popup>
    <van-popup v-model="sourceShow" position="bottom" round :safe-area-inset-bottom='true'
      :close-on-click-overlay='false'>
      <van-picker title="" show-toolbar :columns="sourceList" :loading="loading" @cancel="sourceShow = false"
        @confirm='sourceFn' />
    </van-popup>
    <van-popup v-model="faceValueShow" position="bottom" round :safe-area-inset-bottom='true'
      :close-on-click-overlay='false'>
      <van-picker title="" show-toolbar :columns="faceValueList" :loading="loading" @cancel="faceValueShow = false"
        @confirm='faceValueFn' />
    </van-popup>
    <!-- 放弃确定任务弹窗 -->
    <van-dialog v-model="giveShow" title="22222" show-cancel-button @confirm="giveupFn()" :before-close="closeFn">
      <div class="dialogTxt">
        你确定要放弃该任务吗？
      </div>
    </van-dialog>
  </div>
</template>
<script>
  import {
    isWebview,
    goSystemUrl,
    onSystemPageShow
  } from "@/utils/navigator.js"
  import {
    getTaskApi, //获取任务
    getListApi, //获取筛选条件
    saveTaskApi, //保存筛选条件
    getNumApi, //获取额度和单数
    // 省份
    getProvincApi,
    getCycleApi,
    getOperatorApi,
    getFaceValueApi,
    // 今日收益
    getToadyDataApi,
    // 保存或放弃任务
    saveOrGiveupTaskApi,
    // 查看任务列表
    getTaskListApi

  } from "@/api/task.js";
  import Clipboard from 'clipboard';
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        loading: false,
        // 绑定值
        province: '',
        cycle: '',
        source: '',
        faceValue: '',
        // 列表
        provinceList: [],
        cycleList: [],
        sourceList: [],
        faceValueList: [],
        // 筛选条件开关
        proviceShow: false,
        cycleShow: false,
        sourceShow: false,
        faceValueShow: false,
        // 模块开关
        searchFlag: true,
        timeValue: 60000 * 15,
        // 额度单数
        numArr: {},
        // 今日收益
        todayData: {},
        giveShow: false,
        // 任务数据
        taskData: {},
        taskId: '1111',
        timer: null,
      };
    },
    created() {

      this.getListFn(); // 获取筛选条件回显
      this.getNumFn(); // 获取额度和单数
      this.getToadyDataFn() // 获取今日收益
      // 筛选条件列表
      this.getProvincFn();
      this.getCycleFn();
      this.getOperatorFn();
      this.getFaceValueFn();
      // 获取任务列表
      this.getTaskListFn()

    },
    mounted() {
      onSystemPageShow((param) => {
        console.log(param);
        this.getListFn(); // 获取筛选条件回显
        this.getNumFn(); // 获取额度和单数
        this.getToadyDataFn() // 获取今日收益
        // 筛选条件列表
        this.getProvincFn();
        this.getCycleFn();
        this.getOperatorFn();
        this.getFaceValueFn();
        // 获取任务列表
        this.getTaskListFn()
      })
    },
    /*
      单数和额度，受筛选条件影响。 筛选条件变化后，需要先保存筛选条件，再重新获取单数和额度
    */
    methods: {
      // 路由跳转
      routerFn(url) {
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
      // 复制
      copyFn() {
        let that = this;
        var clipboard = new Clipboard('.btnCopy', {
          // 通过text指定要复印的节点
          text: function () {
            return that.taskData.Phone
          }
        });

        clipboard.on('success', function (e) {
          console.log('复制的e11111111111', e);
          Toast('复制成功');
          e.clearSelection();
          clipboard.destroy()
        });
        clipboard.on('error', function (e) {
          console.log(e);
        });
      },
      // 查看任务列表
      async getTaskListFn() {
        const [err, res] = await getTaskListApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        if (res) {
          this.taskData = res;
          this.taskId = res.OrderId;
          this.timeValue = res.OutTimeStamp;
        }
        // 任务列表有数据,打开充值详情模块,隐藏筛选条件和获取任务
        console.log('任务列表------------', res);
        if (res) {
          this.searchFlag = false;
        } else {
          this.searchFlag = true;
        }
      },
      // dialog阻止自动关闭
      closeFn(action, done) {
        if (action === 'confirm') {
          return done(false)
        } else {
          return done()
        }
      },
      giveupFn() {
        // this.giveShow = false;
        this.saveOrGiveupTaskFn()

      },
      // 上传凭证
      gotoImg() {
        let url = `/imgUpload?id=${this.taskId}`;
        this.routerFn(url);
      },

      // 放弃任务
      async saveOrGiveupTaskFn() {
        const params = {
          OrderID: this.taskId,
          IsPay: false,

        };
        const [err, res] = await saveOrGiveupTaskApi(params);
        if (err) {
          if (err.code === -1000) {
            setTimeout(() => {
              window.location.reload();
            }, 2500)
          }
          return console.error("saleDeviceList error", err);
        }
        this.giveShow = false;
        Toast('任务已放弃');
        this.getTaskListFn() //重新获取任务列表
        this.getNumFn(); //重新获取额度和单数
        console.log('任务放弃-------', res);
      },
      // 今日收益
      async getToadyDataFn() {
        const [err, res] = await getToadyDataApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        this.todayData = res;
        console.log('今日收益---', res);
      },
      // 省份列表
      async getProvincFn() {
        const [err, res] = await getProvincApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        console.log('res---', res);
        const arr = [];
        res.forEach((cur) => {
          arr.push(cur.Province_Name);
        })
        this.provinceList = arr;
      },
      // 周期列表
      async getCycleFn() {
        const [err, res] = await getCycleApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        console.log('res---', res);
        const arr = []
        res.forEach((cur) => {
          arr.push(cur.Days + '天')
        })
        this.cycleList = arr;
      },
      // 运营商列表
      async getOperatorFn() {
        const [err, res] = await getOperatorApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        const arr = [];
        res.forEach((cur) => {
          arr.push(cur.OperatorType)
        })
        this.sourceList = arr
        console.log('res---', res);
      },
      // 面值列表
      async getFaceValueFn() {
        const [err, res] = await getFaceValueApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        const arr = [];
        res.forEach((cur) => {
          arr.push(cur + '元')
        })
        console.log('面值列表---', res, arr);
        this.faceValueList = arr;
      },
      // 获取筛选条件
      async getListFn() {
        const [err, res] = await getListApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        console.log('获取筛选条件---', res);
        this.source = this.valFn1(res.Isp);
        this.province = res.Province ? res.Province : '全国';
        this.cycle = res.DebtDays + '天';
        this.faceValue = res.Amount + '元';
      },
      // 保存筛选条件
      async saveTaskFn() {
        const params = {
          Amount: parseInt(this.faceValue.split('元')[0]),
          DebtDays: parseInt(this.cycle.split('天')[0]),
          Isp: parseInt(this.valFn(this.source)),
          Province: this.province
        }
        console.log('params=========', params);
        const [err, res] = await saveTaskApi(params);
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        this.getNumFn();
        console.log('res---', res);
      },
      // 获取额度和单数
      async getNumFn() {
        const [err, res] = await getNumApi();
        if (err) {
          return console.error("saleDeviceList error", err);
        }
        this.numArr = res;
        // 筛选条件变化后，调保存筛选条件接口，接着调获取额度和单数接口
        this.proviceShow = false;
        this.cycleShow = false;
        this.sourceShow = false;
        this.faceValueShow = false;
        console.log('额度和单数---', res);
      },

      // 获取任务
      async getTaskFn() {
        // 来源、周期、面值没有全部选项；选择面值时，显示对应的可接单数。
        var source = this.valFn(this.source)
        const params = {
          Merchant: source,
          Province: this.province,
          Amount: parseInt(this.faceValue.split('元')[0]),
          DebtDays: parseInt(this.cycle.split('天')[0]),
          WorkType: 1
        }
        const [err, res] = await getTaskApi(params);

        if (err) {
          // 如果没认证跳转去交押金页面
          if (err.code === -10) {
            if (this.timer) {
              return;
            }
            this.timer = setTimeout(() => {
              this.timer = null
              this.routerFn('/code')
            }, 2000)
          }
          // 存在未充值完成任务，刷新页面
          if (err.code === -1000) {
            setTimeout(() => {
              window.location.reload();
            }, 2500)
          }
          return console.error("获取任务失败1111 error", err);

        }
        Toast('获取成功')
        // 获取成功后，调取任务列表
        console.log('res---', res);
        this.getNumFn(); //重新获取额度和单数
        this.getTaskListFn();
      },
      // 刷新任务
      refresh() {
        this.searchFlag = true;
        setTimeout(() => {
          this.getNumFn(); //重新获取额度和单数
        }, 10000)
      },
      // 打开弹窗，请求接口数据
      getProvinceList() {
        this.proviceShow = true;
      },
      getCycleList() {
        this.cycleShow = true;
      },
      getSourceList() {
        this.sourceShow = true;
      },
      getFaceValueList() {
        this.faceValueShow = true;
      },
      // 选择器赋值
      provinceFn(val) {
        this.province = val;
        this.saveTaskFn();
      },
      cycleFn(val) {
        this.cycle = val;
        this.saveTaskFn();
      },
      sourceFn(val) {
        this.source = val;
        this.saveTaskFn();
      },
      faceValueFn(val) {
        this.faceValue = val;
        this.saveTaskFn();

      },
      valFn(val) {
        switch (val) {
          case '微信':
            return '0';
          case '移动':
            return '1';
          case '联通':
            return '2';
          case '电信':
            return '3';
        }
      },
      valFn1(val) {
        switch (val) {
          case 0:
            return '微信';
          case 1:
            return '移动';
          case 2:
            return '联通';
          case 3:
            return '电信';
        }
      },




    },
  };
</script>
<style lang="less" scoped>
  .home {
    height: 100%;
    font-family: PingFang SC;
    padding-top: 52px;

    .top {
      padding: 0 15px;
      margin-bottom: 31px;

      .topDiv {
        height: 183px;
        // height: 253px;
        background: url("../../assets/taskBg2.png") no-repeat;
        // background-size: contain;
        background-size: 100% 100%;
        position: relative;

        .help {
          font-size: 13px;
          color: #FFFFFF;
          width: 100%;
          text-align: right;
          height: 16px;
          position: absolute;
          top: 28px;
          padding-right: 23px;
        }

        .topTitle {
          // height: 280px;
          border-radius: 10px;
          color: #ffffff;
          padding: 30px 0 0 17px;

          .money {
            font-size: 30px;
            font-family: DINPro;
            font-weight: bold;
            color: #FFFFFF;
            margin-bottom: 12px;
            height: 22px;
          }

          .company {
            font-size: 13px;
            font-weight: 500;
            color: #FFFFFF;
            margin-bottom: 15px;

          }

          .number {
            width: 110px;
            height: 22px;
            line-height: 22px;
            background: linear-gradient(-90deg, #FD643B 0%, #FF8244 100%);
            border-radius: 11px;
            font-size: 12px;
            font-weight: 500;
            color: #FFEAE5;
            text-align: center;
            margin-bottom: 30px;

          }

          .quota {
            height: 15px;
            line-height: 15px;
            display: flex;
            font-size: 13px;
            font-weight: 400;
            color: #FFFFFF;
            padding-top: 6px;

            .quota1 {
              height: 15px;
              display: flex;

              .left {
                width: 5px;
                height: 5px;
                margin-top: 5px;
                margin-right: 6px;
                background: #FFFFFF;
                opacity: 0.8;
                border-radius: 50%;
              }

            }

            .marLeft {
              margin-right: 20px;
            }
          }
        }
      }
    }

    .taskSelect {
      padding: 0 15px;

      .head {
        display: flex;
        justify-content: space-between;
        height: 20px;
        line-height: 20px;
        padding: 0 10px;

        .left {
          font-weight: bold;
          color: #303133;
          font-size: 17px;
        }

        .right {
          font-weight: 500;
          color: #FF6428;
          font-size: 13px;

        }
      }

      .content1 {
        background: #ffffff;
        margin-top: 15px;
        border-top: 1px solid #DEDEDE;
      }
    }

    .getTask {
      height: 40px;
      padding: 0 40px;
      margin-top: 22px;
      // margin-bottom: 40px;

      .btn {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 17px;
        font-weight: 500;
        color: #FFFFFF;
        background: #FF6428;
        box-shadow: 0px 5px 10px 0px rgba(247, 98, 63, 0.4);
        border-radius: 20px;
      }
    }

    .content {
      padding: 0 20px 16px 16px;
      // margin-top: -55px;

      .recharge {
        background: #ffffff;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        opacity: 1;
        border-radius: 20px 20px 0px 0px;
        padding-bottom: 15px;
        margin-top: 30px;

        .time {
          height: 35px;

          .txt {
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #ffffff;
            background: #FDECE2;
            border-radius: 10px 10px 0px 0px;
            font-size: 13px;
            font-weight: 500;
            color: #731A00;

          }

        }

        .number {
          text-align: center;
          font-size: 15px;

          .top {
            font-size: 15px;
            font-weight: 500;
            color: #606266;
            margin-top: 20px;
          }

          .middle {
            margin: 15px 0;
            font-size: 30px;
            font-family: DINPro;
            font-weight: bold;
            color: #303133;

            .btnTxt {
              display: inline-block;
              margin-right: 5px;
            }

            .btnCopy {
              display: inline-block;
              height: 22px;
              color: #0379FE;
              font-size: 12px;
              line-height: 22px;
              font-family: PingFang SC;
              font-weight: 400;
              vertical-align: middle;
            }

          }

          .bottom {
            font-size: 12px;
            font-weight: 400;
            color: #909399
          }
        }

        .tip {
          height: 40px;
          display: flex;
          justify-content: space-around;
          margin: 29px 0 22px 0;
          padding: 0 20px;

          .txt {
            text-align: center;

            .top {
              font-size: 12px;
              height: 15px;
              font-size: 16px;
              font-weight: bold;
              color: #303133;
              margin-bottom: 10px;
            }

            .bottom {
              height: 12px;
              font-size: 12px;
              font-weight: 400;
              color: #909399;
            }
          }
        }

        .btn {
          .btnContent {
            padding: 0 40px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: 500;

            .txt {
              width: 120px;
              height: 40px;
              line-height: 40px;
              background: #FF6428;
              color: #ffffff;
              text-align: center;
              border-radius: 20px;
            }

            .giveUp {
              width: 120px;
              height: 40px;
              line-height: 40px;
              background: #F2F2F2;
              color: #606266;
              text-align: center;
              border-radius: 20px;
            }
          }
        }
      }
    }

    .dialogTxt {
      height: 100px;
      line-height: 100px;
      text-align: center;
      margin-top: -20px
    }

    /deep/ .van-dialog__header {
      padding-top: 0;
      color: #FFFFFF;
    }

    /deep/ .van-cell__value {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #303133;
    }

    /deep/ .van-cell__title {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #606266
    }

    /deep/ .van-count-down {
      color: #731A00;
      text-align: center;
      height: 35px;
      line-height: 35px;

    }
  }
</style>