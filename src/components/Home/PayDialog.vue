<template>
  <el-dialog :visible.sync="payDialogVisible"
             :append-to-body="true"
             :before-close="d=>d()"
             class="pay-dialog"
             title="充值"
             width="500px"
             custom-class="dialog">
    <template>
      <div class="header-info">
        <el-row>
          <el-col :span="12">
            <span>姓名：</span>
            <span>李晓</span>
          </el-col>
          <el-col :span="12">
            <span>产品名称：</span>
            <span>销售展示</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>公司：</span>
            <span>花花信息技术有限公司</span>
          </el-col>
          <el-col :span="12">
            <span>套餐方式：</span>
            <span>按次收费</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>电话：</span>
            <span>15826354152</span>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </div>
      <el-row class="pay-type">
        <el-col :span="24">
          <span>支付方式</span>
        </el-col>
      </el-row>
      <el-row class="pay-type-switch">
        <el-col :span="24">
          <el-radio-group v-model="payType">
            <el-radio-button label="支付宝"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="pay-qrcode">
        <el-col :span="24">
          <el-image
              style="width: 250px; height: 250px"
              :src="imgUrl"
              fit="contain"
          ></el-image>
        </el-col>
      </el-row>
    </template>
    <template #footer>
      <el-row class="footer-btn-group">
        <el-col :span="24">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitPay">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import RechargeBiz from "@/biz/Rbac/Recharge";

export default {
  name: 'PayDialog',
  props: {
    IsPayDialogShow: {},
    fee: {
      // required: true,
      default: '111',
    }
  },
  computed: {},
  data() {
    return {
      imgUrl: '',
      payDialogVisible: true,
      payType: 0,

    };
  },
  methods: {
    closeDialog() {
      this.$emit('on-close');
    },
    async initQRCode() {
      this.imgUrl = RechargeBiz.getQRCode(this.fee);
    },
    submitPay() {
      this.$store.dispatch('getUserInfo');
      this.$message.success('已刷新用户余额，请查看')
      this.closeDialog();
    },
  },
  beforeMount() {
    this.initQRCode()
  }
};
</script>

<style lang="scss">
.pay-dialog {
  & > .dialog {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;

    }
  }

  .header-info {
    .el-row {
      margin-top: 20px;

      .el-col {
        &:nth-of-type(odd) {
          text-align: left;
        }

        &:nth-of-type(even) {
          text-align: right;
        }

        span {
          &:nth-of-type(odd) {
            color: #a8a8aa;
          }
        }
      }
    }

  }

  .header {
    height: 54px;
    font-weight: bold;
    display: flex;
    align-items: center;

    .title {
      text-align: left;
    }

    .close {
      text-align: right;
    }
  }

  .pay-type {
    text-align: left;
    font-weight: bold;
    margin: 20px 0;
    padding: {
      left: 5px;
    }
  }

  .pay-qrcode {
    .el-col {
      text-align: left;
    }

    margin: {
      top: 20px;
    }
  }

  .pay-type-switch {
    text-align: left;
  }

  .footer-btn-group {
    padding: 10px 0;
  }
}
</style>
