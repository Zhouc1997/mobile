<template>
  <div style="padding-top: 15px">
    <div class="set">
      <van-cell v-for="item,index in list" :key='index' :title="item.title" is-link :to="item.url" />
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      title:'内容为业务介绍、常见问题等，具体内容待运营补充。',
      list:[
        {
          title:'平台使用基本流程',
          url:'/myPage/helpDetails/1'
        },
        {
          title:'话费充值任务合规充值渠道及凭证示例',
          url:'/myPage/helpDetails/2'
        },
        {
          title:'话费充值任务违规操作的说明',
          url:'/myPage/helpDetails/3'
        },
        {
          title:'话费充值任务中对违反规定行为的处理',
          url:'/myPage/helpDetails/4'
        },
        {
          title:'话费充值任务中操作失误的说明',
          url:'/myPage/helpDetails/5'
        },
        {
          title:'宁可赚任务奖励说明',
          url:'/myPage/helpDetails/6'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.set {
  height:auto;
  padding:10px 0;
  background: #fff;
}
</style>
