<template>
    <div class="hfDetails">
        <div class="content">
            <div class="con">
                <div class="content1">
                    <!-- 模块说明1 -->
                    <div class="header">1、【有效充值渠道】</div>
                    <div class="txt1">（1）微信APP-手机充值<span class="txt11">（限额2000元/月）</span></div>
                    <div class="txt1">（2）中国移动（手机营业厅）APP <div class="txt11 left">（限额2000元/月）</div>
                    </div>
                    <div class="txt1">（3）中国联通官网
                        <div class="txt1 left">网址http://uac.10010.com/</div>
                        <div class="txt11 left">（限额8笔订单/日）</div>
                    </div>
                    <div class="txt1">（4）中国联通（官方版）APP <div class="txt11 left">（限额8笔订单/日）</div>
                    </div>
                    <div class="txt1">（5）沃钱包APP<span class="txt11">（限额8笔订单/日）</span></div>
                    <div class="txt1">（6）中国电信官网
                        <div class="txt1 left">网址https://www.189.cn/sd/</div>
                        <div class="txt11 left">（限额10笔订单/日）</div>
                    </div>
                    <div class="txt1">（7）电信营业厅APP<span class="txt11">（限额10笔订单/日）</span></div>
                    <!-- 模块说明2 -->
                    <div class="header">2、【业务流程】</div>
                    <div class="txt1">获取任务→按任务要求完成充值→反馈结果，提交凭证→系统核实→等待到账，获取收益。</div>
                    <div class="txt1">3、从平台获取订单号码后，请在接单后的<span class="color1">15分钟内</span>完成充值及提交凭证，合规凭证示例请<span
                            class="color2" @click="gotoImg(2)">点击这里</span>查看。</div>
                    <div class="txt1">4、关于任务奖励及任务奖励解锁方法请<span class="color2"
                            @click="gotoImg(6)">点击这里</span>，任务奖励持续更新中，敬请期待。</div>
                    <div class="txt1">5、您在平台完成任务后，如人工审核时该笔订单存在疑问或投诉，将会暂时冻结该笔订单，直至问题处理完毕。</div>
                    <div class="txt1">6、您须将凭证至少保留30日，以便出现投诉、纠纷时配合核实。</div>
                    <div class="txt1">7、关于<span class="color2" @click="gotoImg(1)">“平台使用基本流程”</span><span class="color2"
                            @click="gotoImg(3)">“违规操作说明”</span><span class="color2"
                            @click="gotoImg(4)">“违反规定行为的处理”</span><span class="color2"
                            @click="gotoImg(5)">“操作失误的说明”</span>等平台详细规则，请仔细阅读<span class="color2"
                            @click="gotoHelp()">“帮助中心”</span>相关内容。</div>
                    <div class="txt1">8、并及时关注“系统公告”“消息”等相关推送。</div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            gotoImg(val) {
                this.$router.push(`/myPage/helpDetails/${val}`)
            },
            gotoHelp() {
                this.$router.push('/myPage/help')
            }
        }
    }
</script>
<style lang="less" scoped>
    .hfDetails {
        // margin-top: 52px;
        font-family: PingFang SC;
        padding: 15px 15px 0;

        .content {
            padding-top: 15px;
            padding-bottom: 15px;
            background: #fff;

            .con {

                // height: 500px;
                // overflow: auto;
                .content1 {
                    white-space: pre-wrap;
                    padding: 0 15px;

                    .header {
                        height: 25px;
                        font-size: 15px;
                        font-weight: bold;
                        line-height: 25px;
                        color: #303133;
                        opacity: 1;
                    }

                    .txt1 {
                        font-size: 14px;
                        color: #303133;
                        opacity: 1;
                        line-height: 25px;
                    }

                    .txt11 {
                        font-size: 13px;
                        color: #707070;
                        font-weight: 500;
                        line-height: 25px;
                    }

                    .left {
                        margin-left: 25px;
                    }

                    .color1 {
                        color: #ff6428;
                    }

                    .color2 {
                        color: #338bff;
                    }

                }
            }
        }

    }
</style>