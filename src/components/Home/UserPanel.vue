<template>
  <div>
    <el-card class="user-panel" :body-style="{ padding: '0' }">
      <el-row>
        <el-col :span="10">名称:</el-col>
        <el-col :span="14">赵义</el-col>
      </el-row>
      <el-row>
        <el-col :span="10">余额:</el-col>
        <el-col :span="14">{{ userInfo.balance }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="text">个人中心</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="rechargeDialogVisible=true">充值</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="rechargeDialogVisible" title="充值" :before-close="d=>d()" top="35vh" :modal="false"
               custom-class="recharge-dialog"
               :append-to-body="true" width="470px">
      <template>
        <div class="recharge-main">
          <el-row class="recharge-info-row">
            <el-col :span="10">当前余额：</el-col>
            <el-col :span="14">{{ userInfo.balance }}元</el-col>
          </el-row>
          <el-row class="recharge-info-row">
            <el-col :span="10">充值金额：</el-col>
            <el-col :span="14">
              <el-input-number v-model="rechargeMoney" :precision="2" :step="10" :min="1"></el-input-number>
            </el-col>
          </el-row>
        </div>
      </template>
      <template #footer class="dialog-footer">
        <el-button @click="rechargeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="gotoPayDialog">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UserPanel",
  data() {
    return {
      rechargeDialogVisible: false,
      rechargeMoney: 0
    }
  },
  components: {},
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    async flashUserInfo() {
      await this.$store.dispatch('getUserInfo');
    },
    gotoPayDialog() {
      this.rechargeDialogVisible = false
      this.$emit('onComplete', this.rechargeMoney);
    },
  },
  beforeMount() {
    this.flashUserInfo();
  }
}
</script>

<style lang="scss">
.recharge-dialog {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.recharge-main {
  padding: 0 20px;

  .recharge-info-row {
    margin: 20px 0;
    display: flex;
    align-items: center;

    .el-col:nth-of-type(even) {
      text-align: center;
    }
  }
}

.user-panel {
  position: absolute;
  width: 150px;
  height: 70px;
  top: 34px;
  right: -14px;
  z-index: 99;
  padding: 10px 5px;

  .el-row {
    margin-top: 10px;

    &:nth-of-type(1) {
      margin-top: 0;

    }

    .el-button {
      padding-top: 0;
      padding-bottom: 0;
    }

  }

}

</style>