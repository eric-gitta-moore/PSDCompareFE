<template>
  <div>
    <el-tooltip effect="light">
      <div slot="content">
        <div class="tooltip">
          <div class="but file"><a href="#">上传文件</a></div>
          <div class="but file"><a href="#" @click="uploadFile">上传文件</a></div>
          <div class="but task">
            <a href="#" @click="createTaskDialog">创建任务</a>
          </div>
        </div>
      </div>
      <svg-icon icon-class="add"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script>
import { TIMEOUT } from "../../../const";
export default {
  data() {
    return {};
  },
  methods: {
    createTaskDialog() {
      setTimeout(() => {
        this.$prompt("任务名:", "创建任务", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputErrorMessage: "任务名格式不正确",
          customClass: "createTaskDialog",
        })
          .then(({ value }) => {
            if (value === null || value.trim() === "") {
              this.$message({
                type: "error",
                message: "任务名不能为空！",
              });
              return;
            }
            this.$message({
              type: "success",
              message: "你的任务是: " + value,
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }, 100);
    },
    uploadFile(){
      this.$router.push({
        name:'UploadDialog'
      })
    }
  },
};
</script>

<style lang="scss">
// .createTaskDialog{     //最外层框
//   // border: 10px red solid;
//   // .el-message-box__container{
//   //   // font-size: 20px;
//   // }
// }
.el-tooltip__popper.is-light {
  border: none !important;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 14px 0px;
  .popper__arrow {
    border: none;
  }
}
.tooltip {
  .but {
    width: 76px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    background: #fff;
    border-radius: 2px;
    &:hover {
      background: #347eff;
      a {
        color: #fff;
      }
    }
    a {
      text-decoration: none;
      color: #347eff;
      font-size: 15px;
    }
  }
}
</style>