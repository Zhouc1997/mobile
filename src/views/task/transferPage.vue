<template>
    <div class="transferPage">
        <div class="pic">
            <img src="../../assets/jsIcon.png">
        </div>
        <div class="title">极速充值</div>
    </div>
</template>
<script>
    import {
        goTabBar,
        isWebview
    } from "@/utils/navigator.js"
    import {
        OrderPayApi //极速充值
    } from "@/api/task.js";
    export default {
        data() {
            return {
                taskId: '',
            }
        },
        created() {
            this.taskId = this.$route.query.id;
            this.OrderPayFn()
        },
        methods: {
            // 极速充值
            async OrderPayFn() {
                const params = {
                    OrderId: this.taskId
                };
                const [err, res] = await OrderPayApi(params);
                if (err) {
                    if (err.code === -1000) {
                        if (isWebview) {
                            goTabBar(goTabBar.TASK)
                        } else {
                            this.$router.push('/task')
                        }
                    }
                    return console.log("极速充值错误", err);
                }
                console.log('极速充值----', res);
                const url = res;
                console.log('url', url);
                window.location.href = url;

            },
        }

    }
</script>
<style lang="less" scoped>
    .transferPage {
        padding-top: 55%;

        .pic {
            margin: 0 auto;
            width: 100px;
            height: 100px;
            border-radius: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .title {
            margin: 0 auto;
            text-align: center;
            width: 96px;
            height: 34px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: bold;
            line-height: 23px;
            color: #303133;
            opacity: 1;
        }
    }
</style>