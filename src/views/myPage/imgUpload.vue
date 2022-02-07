<template>
  <div class="imgUpload">
    <div class="content">
      <div class="title">充值凭证单号</div>
      <div class="code">
        <van-field v-model="code" type="digit" label="" placeholder="请输入充值凭证单号" readonly/>
      </div>
      <div class="picture">
        <div class="phoneTitle">充值凭证截图</div>
        <div class="img">
          <van-uploader :after-read="afterRead" :max-count="1" v-model="fileList"  @delete='clearImg'/>
        </div>
        <div class="tip">提示：系统会识别充值记录，如发现假充，平台一律封号处理</div>

      </div>
      <div class="btn" @click="saveOrGiveupTaskFn()" v-if="this.orderInfo.SettleState === '待结算'">
        上传
      </div>

    </div>
  </div>
</template>
<script>
import {
  saveImgApi,
  saveOrGiveupTaskApi
} from "@/api/task.js";
import {
  Toast
} from 'vant';
export default {
  data() {
    return {
      code: '',
      orderId:'',
      fileList: [],
      orderInfo: '',
      ImgPath: ''
    }
  },
  created() {
    if(this.$route.query.info){
      this.orderInfo = this.$route.query.info
      this.code = this.orderInfo.Voucherno
      this.orderId = this.orderInfo.orderId
      this.ImgPath = this.orderInfo.ImgUrl
      this.fileList = [
        { url: this.orderInfo.ImgUrl },
      ]
    }
  },
  methods: {
    clearImg() {
      this.ImgPath = '';
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      file.status = 'uploading';
      file.message = '上传中...';
      const file1 = file.file;
      const status = await this.saveImgFn(file1);
      if (status) {
        file.status = 'done';
        file.message = '上传成功';
      } else {
        file.status = 'failed';
        file.message = '上传失败';
      }

    },
    // 上传图片
    async saveImgFn(file1) {
      let formData = new FormData();
      formData.append("file", file1);
      const [err, res] = await saveImgApi(formData);
      if (err) {
        return false;
      }
      console.log('rew', res);
      this.ImgPath = res.url;
      this.code = res.orderNo;
      return true;
    },
    // 上传凭证
    async saveOrGiveupTaskFn() {
      if(!this.ImgPath){
      Toast('请先上传充值凭证！');
      return
      }
      const params = {
        OrderID: this.orderInfo.OrderId,
        IsPay: true,
        ImgPath: this.ImgPath ? this.ImgPath :this.orderInfo.ImgUrl ,
        IsOnlyImg: true, //是否值更新图片
        Voucherno: this.code, //充值凭证单号
      };
      const [err, res] = await saveOrGiveupTaskApi(params);
      if (err) {
        return console.error("saleDeviceList error", err);
      }
      console.log(res)
      Toast('上传成功');
      this.$router.replace({
        path:'/orderDetails',
        query:{ id: this.orderInfo.Id}
      })
    },
  }
}
</script>
<style lang="less" scoped>
.imgUpload {
  padding: 35px 15px 20px 15px;
  font-family: PingFang SC;

  .content {
    height: 340px;
    width: 100%;
    background: #fff;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 35px;

    .title {
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 14px;
      color: #909399;
      opacity: 1;
    }

    .code {}
  }

  .picture {
    color: #909399;

    .phoneTitle {
      font-size: 17px;
      font-weight: 500;
      height: 22px;
      line-height: 22px;
      margin-top: 20px;
      margin-bottom: 12px;
    }

    .img {}

    .tip {
      margin-top: 18px;
      font-size: 13px;
      font-weight: 500;
      height: 20px;
      line-height: 20px;
    }
  }

  .btn {
    margin-top: 80px;
    background: #FF6428;
    border-radius: 50px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
  }

  /deep/ .van-cell {
    border-bottom: 1px solid #E9E9E9;
    padding: 10px 20px;
    height: 40px;
  }

  /deep/ .van-uploader__upload {
    width: 80px;
    height: 120px;
  }

  /deep/ .van-uploader__preview-image {
    width: 80px;
    height: 120px;
  }
}
</style>
