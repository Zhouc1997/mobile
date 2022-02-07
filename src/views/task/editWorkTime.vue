<template>
    <div class="workTime">
        <!-- 增加或编辑、删除工作时间 -->
        <div class="addTimeClass">
            <van-cell-group>
                <van-cell :value="startTime" is-link center @click="startFlag = true">
                    <template #title>
                        <span class="custom-title">开始时间</span>
                    </template>
                </van-cell>
                <van-cell :value="endTime" is-link center @click="endFlag = true">
                    <template #title>
                        <span class="custom-title">结束时间</span>
                    </template>
                </van-cell>
                <van-cell :value="weekName" is-link center @click="weekFlag = true">
                    <template #title>
                        <span class="custom-title">重复</span>
                    </template>
                </van-cell>
            </van-cell-group>

        </div>
        <div class="btn">
            <div class="cancle" @click="cancelTime()">取消</div>
            <div class="save" @click="saveTime()">保存</div>
        </div>
        <!-- 选择开始时间模态框 -->
        <van-popup v-model="startFlag" position="bottom" round :safe-area-inset-bottom='true'
            :close-on-click-overlay='false'>
            <van-datetime-picker v-model="startTime" type="time" title="" @confirm='confirmFn1'
                @cancel='startFlag = false' />
        </van-popup>
        <!-- 选择结束时间模态框 -->
        <van-popup v-model="endFlag" position="bottom" round :safe-area-inset-bottom='true'
            :close-on-click-overlay='false'>
            <van-datetime-picker v-model="endTime" type="time" title="" @confirm='confirmFn2'
                @cancel='endFlag = false' />
        </van-popup>
        <!-- 选择周几模态框 -->
        <van-popup v-model="weekFlag" position="bottom" round :safe-area-inset-bottom='true'
            :close-on-click-overlay='false'>
            <!-- <van-picker title="" show-toolbar :columns="weekList" @cancel="weekFlag = false" @confirm='weekFn' /> -->
            <div class="divBtn">
                <div class="left" @click="weekFlag = false">取消</div>
                <div class="right" @click='weekFn'>确定</div>
            </div>
            <van-tree-select :items="weekList" :active-id.sync="weekId" />
        </van-popup>

    </div>
</template>
<script>
    import {
        addWorkApi,
        updateWorkApi,
        getWorkDetailApi
    } from "@/api/task.js"
    import {
        Toast
    } from 'vant';
    export default {
        data() {
            return {
                // 触发行为
                action: '',
                // 工作id
                workId: '',
                // 开始和结束时间
                startTime: '12:00',
                endTime: '12:00',
                weekName: '',
                weekId: [],
                // 开始、结束时间开关
                startFlag: false,
                endFlag: false,
                weekFlag: false,
                // 周数据
                weekList: [{
                    text: '',
                    children: [{
                            text: '周日',
                            id: '0'
                        },
                        {
                            text: '周一',
                            id: '1'
                        },
                        {
                            text: '周二',
                            id: '2'
                        },
                        {
                            text: '周三',
                            id: '3'
                        },
                        {
                            text: '周四',
                            id: '4'
                        },
                        {
                            text: '周五',
                            id: '5'
                        },
                        {
                            text: '周六',
                            id: '6'
                        },
                    ]
                }],
            }
        },
        created() {
            this.workId = this.$route.query.id;
            this.action = this.$route.query.action;
            if (this.action === 'edit') {
                document.title = '编辑';
                this.getWorkDetailFn()
            }
        },
        methods: {
            cancelTime() {
                this.$router.push('/workTime');
            },
            // 判断开始时间是否小于结束时间
            timeFn(startTime, endTime) {
                const start = startTime.split(":");
                const end = endTime.split(":");
                console.log('111-2222', start, end);
                if (parseInt(end[0]) > parseInt(start[0])) {
                    return true;
                } else if (parseInt(end[0]) === parseInt(start[0]) && parseInt(end[1]) > parseInt(start[1])) {
                    return true;

                } else {
                    return false;
                }
            },
            // 增加工作设置
            async addWorkFn() {
                const flag = this.timeFn(this.startTime, this.endTime);
                if (!flag) {
                    Toast('结束时间要大于开始时间');
                    return
                }
                if (this.weekId instanceof Array) {
                    if (this.weekId.length < 1) {
                        Toast('请选择重复周期');
                        return
                    }
                }
                const params = {
                    BeginTime: this.startTime,
                    EndTime: this.endTime,
                    WeekDays: this.weekId.join(),
                    State: 1
                }
                const [err, res] = await addWorkApi(params);
                if (err) {
                    return console.log("增加工作设置", err);
                }
                console.log('增加工作设置---', res);
                this.$router.push('/workTime');


            },
            // 修改工作设置
            async updateWorkFn() {
                const flag = this.timeFn(this.startTime, this.endTime);
                if (!flag) {
                    Toast('结束时间要大于开始时间');
                    return
                }
                if (this.weekId instanceof Array) {
                    if (this.weekId.length < 1) {
                        Toast('请选择重复周期');
                        return
                    }
                }
                const params = {
                    BeginTime: this.startTime,
                    EndTime: this.endTime,
                    WeekDays: this.weekId.join(),
                    Id: this.workId
                }
                const [err, res] = await updateWorkApi(params);
                if (err) {
                    return console.log("修改工作设置", err);
                }
                console.log('修改工作设置---', res);
                this.$router.push('/workTime');

            },
            // 获取工作详情
            async getWorkDetailFn() {
                const params = {
                    wid: this.workId
                }
                const [err, res] = await getWorkDetailApi(params);
                if (err) {
                    return console.log("获取工作设置详情", err);
                }
                this.startTime = res.BeginTime;
                this.endTime = res.EndTime;
                this.weekName = res.DayExplain;
                if (res.WeekDays === "") {
                    this.weekId = []
                } else {
                    this.weekId = res.WeekDays.split(',');
                }
            },
            // 选项开关
            confirmFn1(val) {
                this.startFlag = false;
                console.log('valTimeS开始时间', val);
            },
            confirmFn2(val) {
                this.endFlag = false;
                console.log('valTimeS结束时间', val);
            },
            weekFn() {
                const arr = [];
                console.log('this.weekId.length', this.weekId.length);
                if (this.weekId.length < 1) {
                    Toast('请选择重复周期');
                    return
                }
                this.weekId.forEach((cur) => {
                    arr.push(this.getWeekFn(cur))
                })
                this.weekName = arr.join();
                this.weekFlag = false;
            },
            // 转换周几
            getWeekFn(week) {
                let a = new Array("日", "一", "二", "三", "四", "五", "六");
                return '周' + a[week]
            },
            // 增加或编辑时间
            saveTime() {
                if (this.action === 'add') {
                    this.addWorkFn();
                } else if (this.action === 'edit') {
                    this.updateWorkFn();
                }
            },


        }

    }
</script>
<style lang="less" scoped>
    .workTime {
        height: 100%;
        font-family: PingFang SC;
        padding: 50px 15px 15px 15px;

        // 增加工作时间
        .addTimeClass {
            background: #fff;
            border-radius: 10px;
            padding: 15px 15px 30px 15px;
        }

        .btn {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            padding: 0 15px;

            div {
                text-align: center;
                width: 145px;
                height: 40px;
                opacity: 1;
                border-radius: 20px;
                font-size: 17px;
                font-weight: 500;
                line-height: 40px;
            }

            .save {
                background: #FF6428;
                color: #FFFFFF;
            }

            .cancle {
                background: #EBEDF2;
                color: #909399;

            }
        }

        /deep/ .van-cell {
            align-items: center;
        }

        /deep/ .van-tree-select__nav {
            display: none;
        }

        // addTimeClass
        /deep/ .addTimeClass .van-cell__title {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #2A2B2E;
            opacity: 1;

        }

        /deep/ .addTimeClass .van-cell__value {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: #909399;
            opacity: 1
        }

        .divBtn {
            display: flex;
            justify-content: space-between;
            height: 48px;

            .left {
                height: 48px;
                line-height: 48px;
                padding: 0 25px;
                font-size: 14px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                color: #969799;
            }

            .right {
                height: 48px;
                line-height: 48px;
                padding: 0 25px;
                font-size: 14px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                color: #576b95;
            }
        }

    }
</style>