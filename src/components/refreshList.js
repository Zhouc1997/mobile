export const refreshList = {
  components: {
    refreshList: () => import('./refreshList.vue')
    // noData: () => import('./noData')
  },
  data() {
    return {
      noData: false,
      Page: 0,
      Limit: 3,
      totalPage: 0,
      list: []
    }
  },
  methods: {
    callback(isRefresh, results) {
      this.list = isRefresh ? results : this.list.concat(results)
      this.$refs.refreshList.loading = false
      this.$refs.refreshList.refreshing = false
      this.$refs.refreshList.finished = this.Page >= this.totalPage
      this.noData = this.list.length === 0
      this.$refs.refreshList.finishedText =
        this.noData || this.totalPage === 0 ? '' : '没有更多了'
    },
    search() {
      this.init(this.callback, true)
    }
  }
}
