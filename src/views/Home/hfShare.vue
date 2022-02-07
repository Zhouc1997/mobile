<template>
    <div class="hfDetails">
        <div class="content">
            <img src="@/assets/homeShare2.png">
        </div>
        <div class="btn" @click="goShareApp">立即分享</div>
    </div>
</template>
<script>
    import {
        goShare
    } from "../../utils/navigator";
    import {refereeCodeInfo} from "../../api/user";

    export default {
        data() {
            return {
              code:''
            }
        },
      created() {
        this.getCodeInfo()
      },
      methods: {
        // 获取用户推荐码 和绑定的推荐码
        async getCodeInfo(){
          const [err,data] = await refereeCodeInfo()
          if(err) return
          if(data.SelfRefereeCode){
            this.code = data.SelfRefereeCode
          }
        },
            //分享
            goShareApp() {
                const shareInfo = {
                    shareTitle: "闲暇光阴，不要错过，加入宁可赚总会有收获",
                    shareUrl: "https://nkzshare.nnho.cn/#/pages/game/game" + '?' + 'code=' + this.code, // 生产环境
                    // shareUrl: "https://test-timemarket.cnnho-vu.cn:8048/#/pages/game/game" + '?' + 'code=' + this.code,  // 测试环境
                    shareImg: "https://nkzfiles.oss-cn-beijing.aliyuncs.com/%E5%AE%81%E5%8F%AF%E8%B5%9A%E5%88%86%E4%BA%AB.png"
                }
                // console.log(JSON.stringify(shareInfo))
                goShare(JSON.stringify(shareInfo))
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
                height: 550px;
            }
        }
        .btn {
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
            margin: 0 auto;
            margin-top: 20px;

        }

    }
</style>
