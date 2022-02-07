<template>
  <van-pull-refresh v-model="refreshing" @refresh="refresh">
    <van-list
      v-model="loading"
      :finished-text="finishedText"
      :finished="finished"
      @load="load"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>
<script>
/**
 * @description 组件使用注意
 * 1、页码的key必须为page
 * 2、单页展示条数必须为pageSize
 * 3、初始化方法名称为init
 * 4、储存数据的集合的key必须为list
 * 5、数据渲染完毕后再调用init的callback
 * this.$nextTick(() => {
      callback && callback(res.data.TotalPages)
    })
 */
export default {
  name: 'RefreshList',
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: true,
      finishedText: ''
    }
  },
  methods: {
    load() {
      this.$parent.Page += 1
      this.$parent.init(this.$parent.callback)
    },
    refresh() {
      this.$parent.Page = 1
      this.$parent.init(this.$parent.callback, true)
    }
  }
}
</script>
