<template>
    <div class="code">
        <div class="img"><img src="../../assets/iconBg1.png"></div>
        <div class="content">
            <div class="top">
                <div class="title">请输入业务邀请码</div>
                <van-field v-model="code" type="digit" label="" placeholder="请输入业务邀请码（非必填）" :disabled='codeFlag' />
            </div>
            <div class="middle">
                <div class="num">300.00</div>
                <div class="tip">话费充值业务押金</div>
            </div>
            <div class="bottom">
                <div class="agree">
                    <van-checkbox v-model="checked" checked-color="#FF6428" icon-size="17px"></van-checkbox>
                    <span class="left">已阅读并同意</span><span @click="gotoAgrment()">《业务合作协议》</span>
                </div>
                <div class="btn" @click="PayFn()">去支付</div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Toast
    } from 'vant'
    import {
        goCallRecharge
    } from "@/utils/navigator.js"
    import {
        getDepositUrlApi,
        getCodeApi
    } from "@/api/task.js";
    export default {
        data() {
            return {
                code: '',
                codeFlag: false,
                checked: false,
            }
        },
        created() {
            this.getCodeFn()
        },
        methods: {
            gotoAgrment() {
                // 原生跳转业务协议
                goCallRecharge()
            },
            PayFn() {
                console.log('111111', this.checked, this.code);
                if (!this.checked) {
                    Toast.fail(
                        '请勾选同意协议'
                    )
                    return
                }
                this.getDepositUrlFn()
            },
            async getDepositUrlFn() {
                const params = {
                    workType: 1,
                    Code: this.code
                };
                if (this.codeFlag) {
                    params.Code = '';
                }
                const [err, res] = await getDepositUrlApi(params);
                if (err) {
                    return console.error("saleDeviceList error", err);
                }
                console.log('res1111', res);
                window.location.href = res;
            },
            async getCodeFn() {
                const [err, res] = await getCodeApi();
                if (err) {
                    return console.error("saleDeviceList error", err);
                }
                if (res.RefereeCode) {
                    this.codeFlag = true;
                    this.code = res.RefereeCode;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .code {
        height: 100%;
        background: url('../../assets/iconBg.png') no-repeat;
        background-size: 100% 100%;
        font-family: PingFang SC;

        .img {
            width: 100%;
            height: 155px;
            padding: 100px 5px 0 5px;

            img {
                width: 100%;
                height: 50px;
            }

        }

        .content {
            padding: 0 25px 0 23px;
            width: 100%;
            height: 390px;
            position: relative;
            top: -32px;

            .top {
                height: 135px;
                background: #fff;
                padding: 23px 27px 0 27px;

                .title {
                    height: 24px;
                    font-weight: bold;
                    font-size: 17px;
                    color: #303133;
                    opacity: 1;
                }
            }

            .middle {
                padding-top: 31px;
                height: 130px;
                background: #fff6f2;
                text-align: center;

                .num {
                    color: #FF6428;
                    height: 45px;
                    line-height: 45px;
                    font-size: 32px;
                    font-weight: bold;
                    opacity: 1;
                }

                .tip {
                    height: 23px;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 23px;
                    color: #909399;
                    opacity: 1;
                }
            }

            .bottom {
                height: 125px;
                background: #fff;
                padding: 25px 16px 0 16px;

                .agree {
                    height: 17px;
                    line-height: 17px;
                    color: #FF6428;
                    font-size: 12px;
                    margin-bottom: 15px;
                    vertical-align: bottom;

                    .left {
                        color: #606266;
                    }
                }

                .btn {
                    height: 40px;
                    background: #FF6428;
                    opacity: 1;
                    border-radius: 50px;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    font-size: 17px;
                }
            }
        }

        /deep/ .van-cell {
            height: 40px;
            line-height: 20px;
            background: rgba(255, 255, 255, 0.39);
            border: 1px solid #E9E9E9;
            opacity: 1;
            border-radius: 5px;
            margin-top: 20px;
        }

        /deep/ .van-cell__value--alone {
            color: #909399;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
        }

        /deep/ .van-checkbox {
            display: inline-block;
            height: 17px;
            vertical-align: bottom;
            margin-right: 5px;
        }
    }
</style>