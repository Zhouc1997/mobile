<template>
    <div class="workTime">
        <!-- 工作时间列表 -->
        <div class="timeList">
            <div class="list">
                <van-cell-group>
                    <van-swipe-cell v-for="(item,index) in timeListData" :key="index" :before-close="beforeClose">
                        <van-cell :title="item.time" :label="item.WeekDays">
                            <template #right-icon>
                                <span class="editClass" @click="editTime(item.Id)">编辑</span>
                                <van-switch active-color="#FF6428" inactive-color="#909399" :value="item.status"
                                    @input="changeStatus(item)" size="24px" />
                            </template>
                        </van-cell>
                        <template #right>
                            <van-button square type="danger" text="删除" @click="deleteFn(item.Id)" />
                        </template>
                    </van-swipe-cell>
                </van-cell-group>
            </div>
            <div class="add" @click="addTime()">添加工作时间</div>
            <Loading :loadingShow='loading'/>
        </div>
    </div>
</template>
<script>
    import loading from "../../components/loading.vue"
    import {
        getWorkListApi,
        WorkStatusApi,
        deleteWorkListApi
    } from "@/api/task.js"
    import {
        Toast
    } from 'vant';
    export default {

        data() {
            return {
                // 工作id
                workId: '',
                // 时间列表数据
                timeListData: [],
                loading:false
            }
        },
        components: {
            Loading: loading
        },
        created() {
            this.getWorkListFn()
        },
        methods: {
            beforeClose({
                position,
                instance
            }) {
                if (position === 'right') {
                    this.deleteWorkListFn(instance);
                }
            },
            // 删除
            deleteFn(id) {
                this.workId = id;
            },
            async deleteWorkListFn(instance) {
                const params = {
                    wid: this.workId
                }
                const [err, res] = await deleteWorkListApi(params);
                if (err) {
                    return console.log("删除工作设置列表", err);
                }
                console.log('删除工作设置---', res);
                Toast('删除成功');
                instance.close();
                this.getWorkListFn();
            },
            // 获取工作设置列表
            async getWorkListFn() {
                const [err, res] = await getWorkListApi();
                if (err) {
                    return console.log("获取工作设置列表", err);
                }
                console.log('工作设置列表---', res);
                const arr = [];
                res.forEach((cur) => {
                    const time = cur.BeginTime + '-' + cur.EndTime;
                    arr.push({
                        time: time,
                        WeekDays: cur.DayExplain,
                        status: cur.State ? true : false,
                        Id: cur.Id,
                    })
                });
                this.timeListData = arr;
            },
            // 修改工作设置状态
            changeStatus(data) {
                this.workId = data.Id;
                this.WorkStatusFn(data.status)
            },
            async WorkStatusFn(status) {
                this.loading = true;
                const params = {
                    Id: this.workId,
                    State: status ? 0 : 1
                }
                const [err, res] = await WorkStatusApi(params);
                if (err) {
                    return console.log("修改工作设置状态", err);
                }
                console.log('修改工作设置状态---', res);
                this.loading = false;
                Toast('状态设置成功');
                this.getWorkListFn()
            },
            // 增加开关
            addTime() {
                this.$router.push({
                    path: '/editWorkTime',
                    query: {
                        action: 'add',
                        id: ''
                    }

                })
            },
            // 编辑开关
            editTime(id1) {
                this.$router.push({
                    path: '/editWorkTime',
                    query: {
                        action: 'edit',
                        id: id1
                    }
                })
            },

        }

    }
</script>
<style lang="less" scoped>
    .workTime {
        height: 100%;
        font-family: PingFang SC;
        padding: 50px 15px 15px 15px;

        // 时间列表
        .timeList {
            background: #fff;
            width: 100%;
            min-height: 200px;
            padding-bottom: 30px;
            opacity: 1;
            border-radius: 10px;
            padding: 15px 15px 30px 15px;

            .list {
                .editClass {
                    display: inline-block;
                    margin-right: 20px;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    color: #FF6428;
                }
            }

            .add {
                padding-top: 30px;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                color: #FF6428;
                opacity: 1;
            }
        }

        /deep/ .van-cell {
            align-items: center;
        }

        // timeList
        /deep/ .timeList .van-cell__title {
            span {
                font-size: 20px;
                font-family: DINPro;
                font-weight: 500;
                line-height: 23px;
                color: #303133;
                opacity: 1;
            }

        }

        /deep/ .timeList .van-cell__title {
            .van-cell__label {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 17px;
                color: #909399;
                opacity: 1;
                margin-top: 8px;
            }
        }

        /deep/ .van-swipe-cell__right {
            align-items: center;
            display: flex;
            border: 0;
        }
    }
</style>