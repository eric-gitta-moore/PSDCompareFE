<template>
  <el-row type="flex" class="row-bg header">
    <el-col :span="6" class="logo">
      <SvgIcon icon-class="logo"></SvgIcon>
    </el-col>
    <el-col>
      <div></div>
    </el-col>
    <el-col :span="7" class="avatar-col">
      <div class="home-avatar">
        <div class="to-home">返回主页</div>
        <el-divider direction="vertical"></el-divider>
        <div class="avatar">
          <img :src="`/images/avatar.png`" alt=""/>
          <span>头像</span>
          <SvgIcon icon-class="angle-down"></SvgIcon>
          <UserPanel @onComplete="gotoPayDialog" class="user-panel"></UserPanel>
        </div>
      </div>
    </el-col>

    <PayDialog
        v-if="IsPayDialogShow"
        class="pay-dialog"
        :fee="rechargeMoney"
        @on-close="IsPayDialogShow=false"
    ></PayDialog>
  </el-row>
</template>

<script>
import UserPanel from "@/components/Home/UserPanel";
import PayDialog from "@/components/Home/PayDialog";

export default {
  name: 'HomeHeader',
  components: {
    UserPanel,
    PayDialog,
  },
  data() {
    return {
      IsPayDialogShow: false,
      rechargeMoney: 0,
    }
  },
  methods: {
    gotoPayDialog(rechargeMoney) {
      this.IsPayDialogShow = true;
      this.rechargeMoney = rechargeMoney;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

$header-font-size: 16px;
.header {
  height: 100%;
  align-items: center;
  box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
  font-size: $header-font-size;
  background: $header-row-background;
}

.logo {
  display: flex;
  align-items: center;

  svg {
    transform: translateX(-15%);
    width: 16em;
    height: 2em;
  }
}

.avatar-col {
  height: 100%;
}

.home-avatar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-divider {
    height: 2.14rem;
    margin: 0 2.14rem;
  }

  .avatar {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    img {
      border-radius: 50%;
      margin: {
        right: 10px;
      }
    }

    .user-panel {
      display: none;
    }

    &:hover .user-panel {
      display: block;
    }
  }
}

</style>
