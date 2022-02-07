<template>
    <div class="hfDetails">
        <div class="content">
            <img src="@/assets/homeShare1.png">
        </div>
        <div class="emtry"></div>
        <div class="btn" @click="goShareApp">去分享</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            //去分享页面
            goShareApp() {
                this.$router.push('/hfShare')
            }
        }
    }
</script>
<style lang="less" scoped>
    .hfDetails {
        font-family: PingFang SC;
        padding: 20px 15px;

        .content {
            background: #FFFFFF;

            img {
                width: 100%;
                // height: 650px;
            }
        }
        .emtry{
            width: 300px;
            height: 40px; 
        }
        .btn {
            position: fixed;
            bottom: 40px;
            left:37px;
            width: 300px;
            height: 40px;
            background: #FF6428;
            opacity: 1;
            border-radius: 50px;
            font-size: 17px;
            font-weight: 500;
            line-height: 40px;
            color: #FFFFFF;
            text-align: center;
            // margin: 0 auto;
            // margin-top: 20px;

        }

    }
</style>