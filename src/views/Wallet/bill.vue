<template>
    <div class='main'>
        <div class="list">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" :finished-text="list.length>0?'没有更多了':''"
                    @load="onLoad">
                    <!-- <van-cell v-for="item in list" :key="item" :title="item"> -->
                    <div class="bill-item" v-for="(item,index) in list" :key="index">
                        <div class="item-name-time">
                            <div class="item-name">
                                {{item.Describe}}
                            </div>
                            <div class="item-time">
                                {{item.Createtime}}
                            </div>
                        </div>
                        <div class="bill-num">
                            {{`${item.FlowType===1?'+':'-'}${item.Amount}`}}
                        </div>
                    </div>
                    <template slot="default">
                        <div v-if="!isLoading&&finished&&list.length===0" class="nomore">
                            <img src="@/assets/lack.png" alt="">
                            <span>暂无数据</span>
                        </div>
                    </template>
                    <!-- </van-cell> -->
                </van-list>
            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
    import {
        GetOrderListPage
    } from '@/api/wallet.js'
    export default {
        components: {},
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                isLoading: false,
                page: 1,
                limit: 15,
            }
        },
        computed: {

        },
        watch: {},
        methods: {
            //加载数据
            async onLoad() {
                if (this.isLoading) {
                    this.list = [];
                    this.isLoading = false;
                }
                const params = {
                    page: this.page,
                    limit: this.limit,
                    IsThisMonth:0
                }
                const [err, res] = await GetOrderListPage(params)
                // debugger
                console.log(err, res);
                if (!err) {
                    this.list = this.list.concat(res.rows)
                    console.log(this.list);
                    this.loading = false;
                    if (this.page >= res.TotalPages) {
                        this.finished = true;
                    }
                    this.page++
                } else {
                    this.loading = false;
                    this.finished = true;
                }
            },
            onRefresh() {
                // this.isLoading = true
                this.finished = false;
                this.loading = true;
                this.page = 1
                this.onLoad()
            }
        },
        created() {},
        mounted() {},
    }
</script>
<style lang='less' scoped>
    ::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
    }

    .main {
        padding: 15px;

        .van-pull-refresh {
            min-height: calc(100vh - 30px);
            overflow: hidden;
        }

        .nomore {
            // height: calc(100vh - 30px);
            font-size: 14px;
            color: #9B9EA9;
            padding-top: 135px;
            display: flex;
            // justify-content: center;
            flex-direction: column;
            align-items: center;

            img {
                width: 300px;
                height: 300px;
            }

        }

        .list {
            // overflow-y: visible;
            height: calc(100vh - 30px);
            overflow: auto;
            border-radius: 10px;
            padding: 10px;
            background-color: #fff;

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
</style>