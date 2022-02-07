<template>
<div style="padding-top: 10px">
  <div class="main">
    <h2>奖励说明</h2>
    <div class="main-content">
      <p>1.已获得解锁奖励：您通过完成推广任务成功获得的奖励</p>
      <p>2.待获得解锁奖励：您还有未解锁的奖励,快去推广用户完成任务吧！</p>
      <p>3.可用解锁奖励：已有用户为您解锁了奖励（当月有效），快去做任务领取吧！</p>
    </div>
  </div>
</div>
</template>
<style scoped lang="less">
.main{
  height:auto;
  margin: 0 10px;
  padding:10px;
  background: #fff;
  h2{
    padding-top: 10px;
    line-height: 50px;
    text-align: center;
  }
  &-content{
    height:calc(100vh - 100px);
    padding:10px;
    overflow: auto;
    p{
      font-size: 14px;
      line-height: 30px;
      color: #303133;
    }
  }

}
</style>
