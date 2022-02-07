<template>
  <div style="padding-top: 15px">
    <div class="set clearfix">
      <div class="top-pad" v-if="isShow">
        <p style="font-size:14px; color:#909399;">您业务推荐人的邀请码</p>
        <p class="input-label-code">{{code}}</p>
      </div>
      <div v-else class="placeholder-style">
        <p class="input-label">输入业务邀请码</p>
        <van-field style="padding:10px 0;" v-model="code" size="large" :border="true" placeholder="请输入邀请码" />
        <span style="color:#909399">请输入您业务推荐人的专属业务邀请码</span>
        <van-button style="margin-top:40px;" type="primary" color="#FF6428" @click="onSubmit" round  block>确定</van-button>
      </div>

    </div>
  </div>

</template>
<script>
import {refereeCodeInfo,BindRefereeCode} from '@/api/user.js'
import {goTabBar,isWebview } from "@/utils/navigator.js"
import {Toast} from "vant";
export default {
  data() {
    return {
      isShow:true,
      code:'',
    };
  },
 async created() {
   await this.getRefereeCodeInfo()
  },
  methods: {
    // 获取用户推荐码 和绑定的推荐码
    async getRefereeCodeInfo(){
      const [err,data] = await refereeCodeInfo()
      if(err) return
      if(data.RefereeCode){
        this.code = data.RefereeCode
        this.isShow = true
      }else{
        this.isShow = false
      }
    },
    // 保存
    async onSubmit() {
     const [err,data] = await BindRefereeCode({
       code:this.code
     })
      if(err) return
      console.log(data)
      Toast('绑定成功');
      //
      setTimeout(() => {
        if (isWebview) {
          // goTabBar(goTabBar.TASK,{closeRefresh:true})
          goTabBar(goTabBar.MINE)
        } else {
          this.$router.push('/myPage')
        }
      },1000)
    },
  },
}
</script>
<style lang="less" scoped>
.set{
  margin: 0 20px;
  border-radius: 12px;
  background: #fff;
  //padding: 20px 15px;
  .input-label{
    font-size: 17px;
    font-weight: bold;
    line-height: 23px;
    color: #2A2B2E;
    padding:10px 0;
  }
}
//
.placeholder-style{
  height:calc(100vh - 50px);
  padding: 10px 20px;
}
.top-pad{
  height:207px;
  text-align: center;
  padding-top: 60px;
  background: url("../../assets/Invitation-code-bg.png") no-repeat left bottom;
  background-size:100% 85%;
  .input-label-code{
    font-size: 32px;
    color: #FF6428;
    font-weight: bold;
    line-height:80px;
  }
}
/deep/.van-cell{
  padding:0;
}

/deep/.van-field__control {
  height: 40px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  resize: none;
  border: 1px solid #E9E9E9;
  border-radius: 5px;
  padding: 0 10px;
}

</style>
