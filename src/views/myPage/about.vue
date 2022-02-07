<template>
    <div class='mian'>
        <div class="about">
            <div class="img">
                <img src="@/assets/yilogo.png" alt="">
                <!--                <img src="@/assets/LOGO.png" alt="">-->
                <div>
                    {{versionNumber}}
                </div>
            </div>
            <div class="edition" @click="open" v-if="!isIos">
                <div>
                    检查新版本
                </div>
                <img src="@/assets/right.png" alt="">
            </div>
            <div class="footer">
                <div>
                    Copyright ©2022
                </div>
                <div>
                    山东宁泓信息技术有限公司
                </div>
            </div>
        </div>
        <van-dialog v-model="show" width="225" :show-confirm-button="false">
            <div class="upldate">
                <img src="@/assets/updatebg.png" />
                <div class="edition-update">
                    <div class="edition-update-text">
                        发现新版本
                    </div>
                    <div class="edition-update-num">
                        V1.0.01
                    </div>
                </div>
                <div class="edition-tip">
                    <div>
                        1.增加新功能
                    </div>
                    <div>
                        2.优化新体验
                    </div>
                </div>
                <div class="btns">
                    <div class="sure">
                        <van-button size="default" @click="show=false">暂不</van-button>
                    </div>
                    <div class="line"></div>
                    <div class="close">
                        <van-button size="default" @click="sure">立即更新</van-button>
                    </div>
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
    import {
        isIos,appUpdate,getAppDeviceInfo
    } from '@/utils/navigator'
    export default {
        components: {},
        data() {
            return {
                versionNumber:'v1.0.0',
                isIos:isIos,
                show: false
            }
        },
        computed: {},
        watch: {},
        methods: {
            open() {
                appUpdate()
            },
            sure() {

            },
            async getVersionNumber(){
                const res = await getAppDeviceInfo()
                this.versionNumber = res.versionName
            }
        },
        created() {
           this.getVersionNumber()
        },
        mounted() {},
    }
</script>
<style lang='less' scoped>
    .mian {
        padding: 15px;

        .about {
            position: relative;
            height: calc(100vh - 30px);
            border-radius: 10px;
            background-color: #fff;
            padding: 15px;

            .img {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    margin-bottom: 8px;
                    width: 60px;
                    height: 60px;
                }

                margin-top: 65px;
                font-size: 15px;
                color: #909399;
            }

            .edition {
                margin-top: 160px;
                height: 50px;
                font-size: 15px;
                color: #303133;
                border: 1px solid #E9E9E9;
                border-right: none;
                border-left: none;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    width: 5px;
                    height: 12px;
                }
            }

            .footer {
                position: absolute;
                transform: translateX(-50%);
                bottom: 40px;
                left: 50%;

                div {
                    width: 300px;
                    font-size: 14px;
                    color: #C2C5CC;
                    text-align: center;
                }
            }
        }

        .van-dialog {
            background-color: transparent;
        }

        .upldate {
            position: relative;

            img {
                display: block;
                width: 225px;
                height: 257px;
            }

            .edition-update {
                position: absolute;
                left: 15px;
                top: 52px;
                color: #fff;

                &-text {
                    font-size: 15px;
                    font-weight: bold;
                }

                &-num {
                    margin-top: 3px;
                    font-size: 12px;
                }
            }

            .edition-tip {
                position: absolute;
                color: #303133;
                font-size: 14px;
                left: 50%;
                bottom: 65px;
                transform: translateX(-50%);

                div {
                    margin: 5px 0;
                }
            }

            .btns {
                width: 225px;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 40px;
                border-top: 1px solid #EAEAEA;
                display: flex;

                .line {
                    width: 1px 40px;
                    height: 40px;
                    background-color: #EAEAEA;
                }

                .sure,
                .close {
                    width: 112px;

                    .van-button {
                        width: 100%;
                        font-size: 14px;
                        height: 40px;
                        border: none;
                    }
                }

                .close {
                    .van-button {
                        color: #FF6428;
                    }
                }
            }
        }
    }
</style>