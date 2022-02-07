<template>
  <div style="padding-top: 15px">
    <div class="set">
      <div v-for="item,index in list" :key="index">
        <div v-if="Number(id) === item.id">
          <van-image class="img" :src="item.url"/>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
export default {
  name:'',
  data(){
    return{
      id:this.$route.params.id,
      list:[
        {
          url:require('@/assets/help/Platform-process.png'),
          id:1
        },
        {
          url:require('@/assets/help/channel-bg.png'),
          id:2
        },
        {
          url:require('@/assets/help/OI.png'),
          id:3
        },
        {
          url:require('@/assets/help/process-mode.png'),
          id:4
        },
        {
          url:require('@/assets/help/Mistakes-show.png'),
          id:5
        },
        {
          url:require('@/assets/help/Quest-rewards.png'),
          id:6
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.set {
  height:auto;
  width:750upx;
  padding:10px 0;
  background: #fff;
  .img{
    width:100%;
  }
}
</style>
