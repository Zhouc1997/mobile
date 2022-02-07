<template>
    <div class='main'>
        <div class="pay-operation">
            <div class="balance">
                <div class="balance-text">
                    账户余额（元）
                </div>
                <div class="balance-num">
                    {{balanceNum}}
                </div>
            </div>
            <div class="withdrawal">
                <van-button round type="info" size="large" color="#FF6428" :disabled="balanceNum===0" @click="toBankCard">结款</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        goSystemUrl,
        isWebview
    } from '@/utils/navigator.js'
    import {
        GetBalance,
        JudgeIslockOrder
    } from '@/api/wallet.js'
    export default {
        components: {},
        data() {
            return {
                balanceNum: 0,
                billList: []
            }
        },
        computed: {},
        watch: {},
        methods: {
            async toBankCard() {
                const [err,res] = await JudgeIslockOrder()
                if(err){
                    console.log(err,res);
                    return
                }
                console.log(`${process.env.VUE_APP_HREF_BILL}/bankCard?appid=${process.env.VUE_APP_ID}`);
                // window.open(`${process.env.VUE_APP_HREF_BILL}/bankCard`)
                if (isWebview) {
                    goSystemUrl({
                            url: `${process.env.VUE_APP_HREF_BILL}/bankCard?appid=${process.env.VUE_APP_ID}`,
                            closeRefresh:true
                        },
                        () => {
                            this.init()
                        }
                    )
                }
            },
            toBill() {
                this.$router.push({
                    name: 'Bill'
                })
            },
            init() {
                this.getBalance()
            },
            async getBalance() {
                const [err, res] = await GetBalance()
                if (!err) {
                    this.balanceNum = res||0
                }
                // this.
                console.log(res);
            }
        },
        created() {
            this.init()
        },
        mounted() {},
    }
</script>
<style lang='less' scoped>
    .main {
        padding: 15px;
        .pay-operation {
            position: relative;
            box-sizing: border-box;
            height: 200px;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            background: #FFFFFF  url("../../assets/my-wallet.png") no-repeat right ;
            background-size: 100%;
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
</style>
