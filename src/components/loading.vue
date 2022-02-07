<template>
    <div class="loading">
        <van-overlay :show="loadingShow">
            <van-loading>
                {{loadingTxt}}
                <van-count-down :time="time" format="ss 秒"  v-if="conuntFlag" />
            </van-loading>
        </van-overlay>
    </div>
</template>
<script>
    export default {
        props: {
            loadingShow: {
                type: Boolean,
                default: false
            },
            loadingTxt: {
                type: String,
                default: ''
            },
            conuntFlag:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                time:10000,
            }
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    .loading {
        /deep/ .van-overlay {
            align-items: center;
            justify-content: center;
            display: flex;
        }
    }
</style>