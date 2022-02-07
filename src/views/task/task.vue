<template>
    <div class="task">
        <div class="topTitle">
            <div class="left">任务</div>
            <div class="right" @click="routerFn('/help')">帮助</div>
        </div>
        <!-- 今日收益 -->
        <div class="profit">
            <div class="left">
                <div class="top">今日已赚</div>
                <div class="bottom">{{todayData.Amount}}元</div>
            </div>
            <div class="middle">
                <div class="top">今日完成订单</div>
                <div class="bottom">{{todayData.Count}}笔</div>
            </div>
            <div class="right" @click="routerFn('/workTime')">
                <div class="top">工作时间</div>
                <div class="bottom">{{workTxt}}</div>
            </div>
        </div>
        <!-- 未充值展示开始=============================================================================== -->
        <div v-if="!hasOrder">
            <!-- 充值类型 -->
            <div class="rechargeType">
                <div :class="[type === 1 ? 'select' : 'unselect']" @click="onTypeClick(1)">普通充值</div>
                <div :class="[type === 0 ? 'select' : 'unselect']"  @click="onTypeClick(0)" style=" pointer-events:none">极速充值</div>
            </div>
            <div class="content">
                <!-- 周期和可用额度 -->
                <div class="quota0" v-show="type === 0">
                    <div class="left">30日到账</div>
                    <div class="right">本月可用额度{{quota}}元</div>
                </div>
                <div class="quota0" v-show="type === 1">
                    <div class="left" @click="cycleShow = true">{{cycleValue}}日到账<img src="../../assets/bottom.png">
                    </div>
                    <div class="right">本月可用额度{{quota}}元</div>
                </div>
                <div v-show="type === 1">
                    <!-- 货源列表 -->
                    <div class="source">
                        <div :class="[ispType === index ? 'sourceSelect' : 'sourceunSelect']" @click="ipsTypeFn(index)"
                            v-for="(item,index) in ipsList" :key="index">
                            <div class="top">{{item.IspName}}</div>
                            <div class="bottom">{{item.Number}}订单</div>
                        </div>
                    </div>
                    <div class="taskTitle2">
                        <div class="left">充值渠道：{{ispText}}</div>
                    </div>
                    <!-- 标题 -->
                    <div class="taskTitle1">
                        <div class="left">选择任务</div>
                    </div>
                </div>
                <!-- 任务列表 -->
                <div class="taskList">
                    <div class="content1" v-for="(item,index) in FacevalNumArr" :key="index">
                        <div class="left">
                            <div class="top">{{item.Amount}}元面值</div>
                            <div class="bottom">订单数:{{item.Num}}</div>
                        </div>
                        <div class="right" @click="getTaskFn(item.Amount)" v-if='quota > 0 && item.Num > 0'>去获取</div>
                        <div class="right1" v-else>去获取</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 未充值展示结束=============================================================================== -->

        <!-- 充值详情开始====================================================================== -->
        <div class="details" v-if="hasOrder">
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
                    <div class="bottom" v-if="taskData.OrderType !== 4">
                        <div class="txt">
                            仅限以下充值渠道： {{taskData.PayWays ? taskData.PayWays.join(): '--'}}
                        </div>
                    </div>
                    <!-- <div class="top">充值号码</div> -->
                    <div class="middle">
                        <span class="top">充值号码</span>
                        <span class="btnTxt">{{taskData.Phone}}</span>
                        <span class="btnCopy" @click="copyFn()" v-if="taskData.OrderType !== 4">复制</span>
                    </div>


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
                    <!--  PayStatus === 2支付中-->
                    <!-- :style="{justifyContent:(taskData.PayStatus === 2 ? 'center':'space-between' )}" -->
                    <div class="btnContent">
                        <!-- v-if="taskData.PayStatus === 2 ? false : true" -->
                        <div class="giveUp" @click="giveShow = true">放弃任务
                        </div>
                        <div class="txt" @click="gotoImg(taskData.OrderType)">
                            {{payStatusFn()}}</div>
                    </div>
                </div>
                <div class="reload" @click="reloadFn()">立即刷新</div>
            </div>
        </div>

        <!-- 充值详情结束====================================================================== -->

        <!-- 账期选择模态框 -->
        <van-popup v-model="cycleShow" position="bottom" round :safe-area-inset-bottom='true'
            :close-on-click-overlay='false'>
            <van-picker title="" show-toolbar :columns="cycleList" :loading="loading" @cancel="cycleShow = false"
                @confirm='cycleFn' />
        </van-popup>
        <!-- 放弃确定任务弹窗 -->
        <van-dialog v-model="giveShow" title="22222" show-cancel-button @confirm="saveOrGiveupTaskFn()"
            :before-close="closeFn">
            <div class="dialogTxt">
                你确定要放弃该任务吗？
            </div>
        </van-dialog>
        <Loading :loadingShow='loading1' loadingTxt='订单充值中，请稍候' :conuntFlag='true' />

    </div>
</template>
<script>
    import loading from "../../components/loading.vue"
    import {
        Toast
    } from 'vant';
    import Clipboard from 'clipboard';
    import {
        debounce
    } from '@/utils'
    import {
        isWebview,
        goSystemUrl,
        onSystemPageShow
    } from "@/utils/navigator.js"
    import {
        getToadyDataApi, //今日收益(今日已完成单数和收益)
        getCycleApi, //周期列表
        getQuotaApi, //可用额度
        getIpsNumApi, //获取运营商以及单数
        getFacevalNumApi, //获取面值和对应订单数
        getTaskApi, //获取任务
        getTaskListApi, // 查看任务列表
        // getListApi, //获取筛选条件
        // saveTaskApi, //保存筛选条件
        saveOrGiveupTaskApi, // 保存或放弃任务
        getWorkListApi, //获取是否设置工作时间


    } from "@/api/task.js";
    export default {
        data() {
            return {
                loading1: false,
                loading1Flag: false,
                ispText: '微信',
                // 充值类型标签
                type: 1,
                // 运营商类型标签
                ispType: 0,
                // 今日收益
                todayData: {},
                // 账期列表
                cycleValue: 1,
                cycleList: [],
                // 额度
                quota: '',
                // 面值和对应单数
                FacevalNumArr: [],
                // 有无充值任务开关
                hasOrder: false,
                // 账期选择框开关
                cycleShow: false,
                loading: false,
                // 运营商列表（含单数
                ipsList: [],
                // 任务数据
                taskData: {},
                taskId: '1111',
                timeValue: 60000 * 15,
                // 放弃任务开关
                giveShow: false,
                workTxt: '',
                timer: null,
            }
        },
        components: {
            Loading: loading
        },
        created() {
            this.getWorkListFn() //是否设置工作时间
            this.getToadyDataApiFn() //今日收益 --
            this.getTaskListFn() //正在做的任务列表 --
            this.getCycleApiFn() //账期列表 ---
            this.getQuotaApiFn() //根据账期获取额度 ---
            this.getIpsNumApiFn() //货源和对应订单数 --
            this.getFacevalNumFn() //面值和对应订单数 --
        },
        mounted() {
            onSystemPageShow((param) => {
                console.log(param, 'onSystemPageShow刷新页面111111');
                this.getWorkListFn()
                this.getToadyDataApiFn()
                this.getCycleApiFn()
                this.getQuotaApiFn()
                this.getTaskListFn()
                this.getIpsNumApiFn()
                this.getFacevalNumFn()
            })
            // 获取任务
            this.getTaskFn = debounce(this.getTaskFn1, 1000)
        },
        methods: {
            reloadFn() {
                window.location.reload();
            },
            payStatusFn() {
                if (this.taskData.OrderType !== 4) {
                    return '我已充值'
                } else {
                    if (this.taskData.PayStatus === 1) {
                        return '已支付'
                    } else if (this.taskData.PayStatus === 2) {
                        return '支付中'
                    } else {
                        return '去支付'
                    }
                }
            },
            async getWorkListFn() {
                const [err, res] = await getWorkListApi();
                if (err) {
                    return console.log("获取工作设置列表", err);
                }
                console.log('工作设置列表---', res);
                if (res.length > 0) {
                    this.workTxt = '已设置'
                } else {
                    this.workTxt = '未设置'

                }
            },
            //充值类型切换 
            onTypeClick(val) {
                console.log('充值类型切换----', val);
                this.type = val;
                this.getFacevalNumFn() //获取面值和对应单数
                this.getQuotaApiFn() //获取可用额度（取决于账期、运营商类型）
            },
            //货源类型切换 
            ipsTypeFn(val) {
                this.ispTextFn(val);
                this.ispType = val;
                this.getIpsNumApiFn() //获取运营商和对应单数
                this.getFacevalNumFn() //获取面值和对应单数
                this.getQuotaApiFn() //获取可用额度（取决于账期、运营商类型）
            },
            ispTextFn(val) {
                let txt = '';
                switch (val) {
                    case 0:
                        txt = '微信';
                        break;
                    case 1:
                        txt = '手机营业厅';
                        break;
                    case 2:
                        txt = '沃钱包/官网';
                        break;
                    case 3:
                        txt = '官网/手机营业厅';
                        break;
                }
                this.ispText = txt;
            },
            OrderTypeFn() {
                // 充值类型: 2普通（移动、联通、电信)
                let OrderType = '';
                if (this.ispType === 1 || this.ispType === 2 || this.ispType === 3) {
                    OrderType = 2
                }
                // 充值类型: 3微信
                if (this.ispType === 0) {
                    OrderType = 3
                }
                //  充值类型: 4极速充值
                if (this.type === 0) {
                    OrderType = 4
                }
                return OrderType
            },
            // 路由跳转
            routerFn(url) {
                if (isWebview) {
                    const {
                        origin
                    } = location
                    goSystemUrl({
                        url: `${origin}/#${url}`,
                        // 图片上传会一直刷新，所以设置为false
                        closeRefresh: url.indexOf('imgUpload') !== -1 ? false : true
                    }, () => {
                        console.log('支付完成111')
                        window.location.reload();
                    })
                } else {
                    this.$router.push(url)
                }
            },
            // 今日收益
            async getToadyDataApiFn() {
                const [err, res] = await getToadyDataApi();
                if (err) {
                    return console.log("今日收益错误", err);
                }
                this.todayData = res;
            },
            // 获取周期列表
            async getCycleApiFn() {
                const [err, res] = await getCycleApi();
                if (err) {
                    return console.log("周期列表错误", err);
                }
                const arr = []
                res.forEach((cur) => {
                    arr.push({
                        text: cur.Days + '天到账',
                        value: cur.Days
                    })
                })
                this.cycleList = arr;
            },
            // 改变周期获取额度
            cycleFn(val) {
                this.cycleValue = val.value;
                this.getQuotaApiFn()
            },
            // 获取可用额度
            async getQuotaApiFn() {
                const params = {
                    debtDays: this.cycleValue,
                    OrderType: this.OrderTypeFn()
                }
                // 极速充值，账期写死30
                if (this.type === 0) {
                    params.debtDays = 30
                }
                const [err, res] = await getQuotaApi(params);
                if (err) {
                    return console.log("可用额度错误", err);
                }
                this.quota = res;
                this.cycleShow = false;
            },

            // 获取运营商单数
            async getIpsNumApiFn() {
                const [err, res] = await getIpsNumApi();
                if (err) {
                    return console.log("获取运营商单数错误", err);
                }
                console.log('获取运营商单数----', res);
                this.ipsList = res;
            },
            // 获取面值和对应单数
            async getFacevalNumFn() {
                const params = {
                    Isp: this.ispType
                }
                // 如果是极速充值运营商类型设置为4
                if (this.type === 0) {
                    params.Isp = 4
                }
                const [err, res] = await getFacevalNumApi(params);
                if (err) {
                    return console.log("获取面值和对应订单数错误", err);
                }
                this.FacevalNumArr = res;
                console.log('111获取面值和对应单数', res);
            },
            async getTaskFn1(Amount) {
                const params = {
                    Merchant: this.type === 0 ? 4 : this.ispType, //运营商 0微信 1移动 2联通 3电信  4极速
                    Amount: Amount, //订单面值
                    DebtDays: this.cycleValue, //账期 
                    WorkType: 1, //业务类型
                    Province: '全国',
                    OrderType: this.OrderTypeFn() //充值类型 2普通（移动、联通、电信） 3微信 4极速
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
                // 获取成功后，调取任务列表以及获取额度
                console.log('获取任务的返回----', res);
                this.getQuotaApiFn(); //重新获取额度
                this.getTaskListFn(); //查看任务列表
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
                    this.hasOrder = true;
                    if (res.PayStatus === 2 && !this.loading1Flag) {
                        this.loading1 = true;
                        setTimeout(() => {
                            this.loading1Flag = true;
                            this.getTaskListFn(); //重新获取任务列表
                            this.getToadyDataApiFn();//重新获取收益
                            this.loading1 = false;
                        }, 10000)
                    }
                } else {
                    this.hasOrder = false;
                }
            },
            // 倒计时结束--刷新任务
            refresh() {
                this.hasOrder = false;
                setTimeout(() => {
                    this.getTaskListFn() //重新获取任务列表
                    this.getQuotaApiFn(); //重新获取额度
                    this.getFacevalNumFn(); //面值和对应订单数
                }, 10000)
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
            // dialog阻止自动关闭
            closeFn(action, done) {
                if (action === 'confirm') {
                    return done(false)
                } else {
                    return done()
                }
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
                this.getQuotaApiFn(); //重新获取额度
                this.getFacevalNumFn(); //面值和对应订单数

                console.log('任务放弃-------', res);
            },
            // 上传凭证
            gotoImg(type) {
                // 如果是已支付1，不做跳转
                if (this.taskData.PayStatus === 1) {
                    Toast('订单已支付，请勿重复支付');
                    return
                }
                if (type !== 4) {
                    let url = `/imgUpload?id=${this.taskId}`;
                    this.routerFn(url);
                } else {
                    let url = `/transferPage?id=${this.taskId}`;
                    this.routerFn(url);
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    .task {
        height: 100%;
        font-family: PingFang SC;
        padding: 42px 15px 22px 15px;

        .topTitle {
            height: 40x;
            line-height: 40px;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;

            .left {
                font-size: 17px;
                font-weight: bold;
                color: #303133;
                opacity: 1;
            }

            .right {
                font-size: 14px;
                font-weight: 500;
                color: #FF6428;
                opacity: 1;
            }
        }

        .profit {
            background: url('../../assets/topTitle.png') no-repeat;
            background-size: contain;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 100px;
            line-height: 100px;
            opacity: 1;
            border-radius: 13px;
            margin-bottom: 20px;
            text-align: center;

            div {
                width: 32%;
            }

            .left {
                height: 60px;
                border-right: 1px solid rgba(245, 245, 247, 0.39);
            }

            .middle {
                height: 60px;
                border-right: 1px solid rgba(245, 245, 247, 0.39);
            }

            .right {
                height: 60px;
            }

            .top {
                width: 100%;
                margin-top: 10px;
                font-size: 12px;
                font-weight: 500;
                line-height: 15px;
                color: #FFFFFF;
                opacity: 1;
            }

            .bottom {
                width: 100%;
                margin-top: 5px;
                margin-bottom: 10px;
                font-size: 15px;
                font-weight: bold;
                line-height: 21px;
                color: #FFFFFF;
                opacity: 1;
            }
        }

        // 未充值
        .rechargeType {
            width: 100%;
            height: 35px;
            line-height: 35px;
            border-radius: 10px 10px 0px 0px;
            display: flex;

            div {
                height: 35px;
                text-align: center;
                line-height: 35px;
                font-size: 15px;
                opacity: 1;
                width: 50%;
            }

            .select {
                background: #FFFFFF;
                border-radius: 10px 10px 0px 0px;
                font-weight: bold;
                color: #FF6428;
                box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.1);
            }

            .unselect {
                background: rgba(96, 98, 102, 0.02);
                border-radius: 10px 10px 0px 0px;
                font-weight: 500;
                color: #909399;
            }
        }

        .content {
            background: #FFFFFF;
            padding: 24px 20px 20px 20px;

            .quota0 {
                width: 100%;
                height: 32px;
                line-height: 32px;
                background: rgba(253, 236, 226, 0.39);
                opacity: 1;
                border-radius: 8px;
                display: flex;

                img {
                    width: 10px;
                    height: 6px;
                    vertical-align: middle;
                    margin-left: 5px;
                }

                .left {
                    margin-left: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #731A00;
                    opacity: 1
                }

                .right {
                    margin-left: 10px;
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #606266;
                    opacity: 1;
                }

            }

            .source {
                margin-top: 24px;
                width: 100%;
                height: 44px;
                display: flex;
                justify-content: space-around;

                div {
                    width: 67px;
                    height: 44px;
                    border-radius: 6px;
                    opacity: 1;
                    text-align: center;
                }

                .sourceSelect {
                    background: rgba(255, 245, 240, 0.39);
                    border: 1px solid #FF6428;
                    color: #FF6428;
                }

                .sourceunSelect {
                    background: #F0F2F7;
                    border: 1px solid #F0F2F7;
                    color: #606266;
                }

                .top {
                    height: 14px;
                    font-size: 14px;
                    font-weight: 500;
                    opacity: 1;
                    margin-top: 3px;
                    margin-bottom: 5px;
                }

                .bottom {
                    height: 12px;
                    font-size: 12px;
                    font-weight: 500;
                    opacity: 1;
                    margin-bottom: 3px;

                }
            }

            .taskTitle1 {
                margin-top: 24px;
                width: 100%;
                height: 21px;
                line-height: 21px;

                .left {
                    font-size: 15px;
                    font-weight: bold;
                    color: #303133;
                    opacity: 1;
                }
            }

            .taskTitle2 {
                padding-left: 5px;
                margin-top: 12px;
                width: 100%;
                height: 21px;
                line-height: 21px;

                .left {
                    font-size: 12px;
                    font-weight: 500;
                    color: #FF8000;
                    opacity: 1;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #E9E9E9;


                }
            }

            .taskList {
                min-height: 336px;

                .content1 {
                    margin-top: 20px;
                    height: 42px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .left {
                        height: 42px;

                        .top {
                            height: 20px;
                            font-size: 14px;
                            font-weight: 500;
                            color: #606266;
                            opacity: 1;
                        }

                        .bottom {
                            margin-top: 4px;
                            font-size: 12px;
                            font-weight: 500;
                            color: #909399;
                            opacity: 1;
                        }
                    }

                    .right {
                        width: 75px;
                        height: 30px;
                        background: #FF6428;
                        opacity: 1;
                        border-radius: 50px;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 30px;
                        text-align: center;
                        color: #FFFFFF;
                        opacity: 1;
                    }

                    .right1 {
                        width: 75px;
                        height: 30px;
                        background: rgba(204, 204, 204, 0.39);
                        opacity: 1;
                        border-radius: 50px;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 30px;
                        text-align: center;
                        color: #FFFFFF;
                        opacity: 1;
                    }
                }
            }

        }

        // 充值详情
        .details {
            padding: 15px 0;

            .recharge {
                background: #ffffff;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
                opacity: 1;
                border-radius: 20px 20px 0px 0px;
                padding-bottom: 25px;

                .time {
                    height: 35px;

                    .txt {
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        color: #ffffff;
                        background: #FF9500;
                        border-radius: 10px 10px 0px 0px;
                        font-size: 13px;
                        font-weight: 500;

                    }

                }

                .number {
                    text-align: center;
                    font-size: 15px;

                    .middle {
                        margin-top: 30px;

                        .top {
                            display: inline-block;
                            font-size: 12px;
                            font-weight: 500;
                            color: #909399;
                            line-height: 24px;
                            height: 24px;
                        }

                        .btnTxt {
                            font-size: 20px;
                            font-family: DINPro;
                            font-weight: bold;
                            color: #303133;
                            display: inline-block;
                            margin: 0 10px;
                            line-height: 24px;
                            height: 24px;
                        }

                        .btnCopy {
                            display: inline-block;
                            color: #0379FE;
                            font-size: 14px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            line-height: 24px;
                            height: 24px;

                        }

                    }

                    .bottom {
                        margin-top: 25px;
                        width: 100%;
                        padding: 0 30px;

                        .txt {
                            width: 100%;
                            font-size: 14px;
                            font-weight: 400;
                            color: #FF6428;
                            min-height: 54px;
                            line-height: 24px;
                            background: #FFF5F0;
                            opacity: 1;
                            border-radius: 5px;
                            display: inline-block;
                            text-align: left;
                            padding: 15px 20px;
                        }
                    }
                }

                .tip {
                    height: 40px;
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0 40px 0;
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

                .reload {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 23px;
                    color: #FF6428;
                    opacity: 1;
                }
            }
        }

        // tab标签页
        /deep/ .van-tab__text--ellipsis {
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-wrap !important;
        }

        /deep/ .van-dropdown-menu {
            width: 120px;
            height: 25px;
        }

        /deep/ .van-dropdown-item {
            width: 120px;

        }

        /deep/ .van-dropdown-menu__bar {
            height: 30px;
        }

        /deep/ .van-count-down {
            color: #fff;
            text-align: center;
            height: 35px;
            line-height: 35px;

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
    }
</style>