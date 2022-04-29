<template>
  <el-container class="main-container" :style="{height:heightPXLimit}">
    <el-aside class="main-left" width="0">
      <div>
        <el-row class="header-row">
          <el-col :span="16">
            <div class="left">
              <span>对比记录</span>
              <span class="gray" style="marginleft: 10px">{{
                compareLogData.name
              }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="right">
              <a @click="changeLayout()" title="切换布局">
                <svg-icon
                    class-name="svg-transform"
                    icon-class="transform"
                ></svg-icon>
              </a>
              <UploadFileOrCreateTask class="upload-file-or-create-task" @on-click-upload='handleOnClickUpload'/>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="orders">
        <ul infinite-scroll-immediate="true">
          <li v-for="(val, index) in compareLogData.orders" :key="val.id">
            <el-row class="order">
              <el-col>
                <div>
                  <el-row>
                    <el-col :span="16">
                      <span class="notice">名称：</span>
                      <span>{{
                          val.title ? val.title : "对比记录" + val.id
                        }}</span>
                    </el-col>
                    <el-col :span="4" class="compare">
                      <a @click="gotoCompareResult(index)">对比</a>
                    </el-col>

                    <el-col :span="4" class="download">
                      <a @click="downloadCompareResult(val.id)">下载</a>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <span class="notice">状态：</span>
                      <span class="success">已完成</span>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <span class="notice">时间：</span>
                      <span>{{ val.createTime }}</span>
                    </el-col>
                  </el-row>
                  <el-collapse>
                    <!-- collapse -->
                    <el-collapse-item
                        :name="val.id"
                        :title="isFoldArray[index]"
                        @click.native="isShow(index)"
                    >
                      <el-row class="file-list">
                        <el-col :span="20">
                          <span>{{ val.title ? val.title : "对比1" }}</span>
                        </el-col>
                        <el-col :span="4">
                          <span class="success">已完成</span>
                        </el-col>
                      </el-row>

                      <el-row class="file-list">
                        <el-col :span="20">
                          <span>{{ val.title ? val.title : "对比2" }}</span>
                        </el-col>
                        <el-col :span="4">
                          <span class="normal">已完成</span>
                        </el-col>
                      </el-row>
                      <el-row class="time-line">
                        <el-col :span="2">
                          <svg-icon
                              v-if="val.status == '已完成' || true"
                              icon-class="play"
                          ></svg-icon>
                          <svg-icon v-else icon-class="clock"></svg-icon>
                        </el-col>
                        <el-col :span="19">
                          <el-progress
                              :percentage="
                              val.status == '已完成' || true ? 100 : 0
                            "
                              :stroke-width="10"
                              :show-text="false"
                          >
                          </el-progress>
                        </el-col>
                        <el-col :span="3">
                          <div>
                            <span
                            >{{
                                val.status == "已完成" || true ? 100 : 0
                              }}%</span
                            >
                          </div>
                        </el-col>
                      </el-row>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-col>
            </el-row>
          </li>
          <p v-if="isLoading" class="loading">
            <span></span>
          </p>
          <li v-if="noMore">
            <p>没有更多了</p>
          </li>
        </ul>
      </div>
    </el-aside>
    <el-main class="main-right">
      <el-container>
        <el-header height="auto">
          <el-row class="main-right-header">
            <el-col :span="4">
              <span class="gray">图纸名称：</span>
              <span>{{ compareWorkName }}</span>
            </el-col>
            <el-col :span="5">
              <span class="gray">图纸大小：</span>
              <span>20M</span>
            </el-col>
            <el-col :span="5">
              <span class="gray">图纸分辨率：</span>
              <span>3000*4000</span>
            </el-col>
            <el-col :span="5">
              <span class="gray">红色：</span>
              <span>代表修改部分</span>
            </el-col>
            <el-col :span="5">
              <span class="gray">绿色：</span>
              <span>代表删除部分</span>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="right-main-img">
            <span v-if="compareImgUrl.length === 0" class="gray"
              >请选择要对比的文件</span
            >
            <img :src="compareImgUrl" v-else />
          </div>
        </el-main>
      </el-container>
    </el-main>

    <UploadDialog
        v-if="IsUploadDialogShow"
        @onClose="IsUploadDialogShow=false"
        task-id="1"
        @onComplete="uploadOnComplete"
    ></UploadDialog>
  </el-container>
</template>

<script>
import UploadDialog from "@/components/Home/Compare/UploadDialog";
import UploadFileOrCreateTask from "@/components/Home/Compare/UploadFileOrCreateTask";
import task from "../../../biz/Rbac/TaskGroup.js";
import OrderEntity from "@/entity/Rbac/Order";
import TaskGroupEntity from "@/entity/Rbac/TaskGroup";

// import DateHelper from '../../util/DateHelper'

export default {
  name: "HomeCompareLeft",
  components: {
    UploadDialog,
    UploadFileOrCreateTask,
  },
  data() {
    return {
      index: 1,
      total: 0,

      /**
       * @description 上传窗口是否显示
       */
      IsUploadDialogShow: false,

      /**
       * @description 对比组数组
       * @type {Array.<TaskGroupEntity>}
       */
      compareLogData: [],
      currentPage: 0,
      pageSize: 3, //每页数据总数
      totalPages: 0, //总页数
      isLoading: false, //是否在加载中，绑定给loading图标用
      isFoldArray: ["展开"],
      compareImgUrl: "",
      compareWorkName: "对比任务",
      openUploadFileOrCreateTaskVisible: false, //加号操作选择框是否出现
      CreateTaskDialogVisible: false, //创建任务框是否出现

      /**
       * @description 主内容面板高度
       */
      heightLimit: document.body.clientHeight - 66,

    };
  },
  computed: {
    noMore() {
      return this.currentPage >= this.totalPages;
    },
    disableLoading() {
      return this.noMore || this.isLoading;
    },
    /**
     * @description 主内容面板高度限制需要返回一个字符串
     * @returns {string}
     */
    heightPXLimit() {
      return `${this.heightLimit}px`
    },
  },
  methods: {
    /**
     * 点击上传文件显示上传弹窗事件
     */
    handleOnClickUpload() {
      this.IsUploadDialogShow = true;
    },
    /**
     * 上传窗口上传完成
     */
    uploadOnComplete() {
      this.IsUploadDialogShow = false;
      // TODO:刷新页面，重新加载数据
    },
    //控制每一个折叠面板的文字
    isShow(index) {
      if (this.isFoldArray[index] === "展开")
        this.isFoldArray.splice(index, 1, "收起");
      else this.isFoldArray.splice(index, 1, "展开");
    },
    gotoCompareResult(index) {
      this.compareImgUrl = this.compareLogData.orders[index].url;
      this.$notify.success({
        title: "成功",
        message: "获取对比结果",
      });
    },
    openUploadFileOrCreateTask() {
      this.openUploadFileOrCreateTaskVisible = true;
    },
    getCompareResultUrl() {
      return !("workObj" in this) || !("compareResultUrl" in this.workObj)
          ? `/public/images/251.png`
          : this.workObj.compareResultUrl;
    },
    // 获取全部对比组
    // getAll(val) {
    //   task.getAll(val).then((res) => {
    //     this.compareLogData.push(...res.records);
    //     this.total = res.total;
    // for (var index in this.compareLogData) {
    //   console.log("for in 循环的ele是：", index);
    //   this.isFoldArray[index] = "展开";
    // }
    //     console.log("我还可滚");
    //   });
    // for(var i)
    // console.log("这是获取到的对比组个数", this.compareLogData.length);
    // },
    // 滚轮下滑刷新数据
    // load() {
    //   if (this.compareLogData.length <= this.total) {
    //     this.getAll(this.index);
    //     this.index++;
    //     console.log("我还可滚");
    //   } else console.log("到底了");
    // },
    // load() {
    //   this.isLoading = true;
    //   setTimeout(() => {
    //     this.currentPage++;
    //     this.queryData();
    //   }, 500);
    // },
    // queryData() {
    //   this.$api
    //     .selectCompareLog(this.currentPage, this.pageSize)
    //     .then((res) => {
    //       this.compareLogData = this.compareLogData.concat(
    //         res.data.data.records
    //       );
    //       for (let datum of res.data.data.records) {
    //         this.isFoldArray[datum.id] = false;
    //       }
    //       this.currentPage = res.data.data.current;
    //       this.pageSize = res.data.data.size;
    //       this.totalPages = res.data.data.pages;
    //       this.isLoading = false;
    //     });
    // },
    downloadCompareResult(compareId) {
      task.download(compareId).then((res) => {
        this.$notify.success({
          title: "成功",
          message: "获取对比结果",
        });
        // console.log("点击对比之后返回的是",res);
      });
      // if (!this.workObj || !this.workObj.workCode) {
      //   this.$store
      //     .dispatch("reqAndRreshCompareWorkWithStatus", compareId)
      //     .then(() => {
      //       this.compareImgUrl = this.workObj.compareResultUrl;
      //       if (this.workObj.compareResultUrl) {
      //         this.$notify.success({
      //           title: "成功",
      //           message: "获取对比结果",
      //         });
      //       }
      //       console.log(this.compareImgUrl);
      //       window.open(
      //         this.$api.reqDownloadUrl(compareId, this.workObj.workCode)
      //       );
      //     });
      // } else {
      //   window.open(this.$api.reqDownloadUrl(compareId, this.workObj.workCode));
      // }
    },
    changeLayout() {
      console.log("用另一种布局方式显示文件,上下布局");
      this.$router.push({name: "HomeCompareUp"});
    },
  },
  mounted() {
    console.log("挂在页面完毕");
    task.getAll(1).then((res) => {
      this.compareLogData = res.records[0];
      for (var index in res.records[0].orders) {
        console.log("for in 循环的ele是：", index);
        this.isFoldArray[index] = "展开";
      }
      console.log(res);
    });
  },
};
</script>

<style lang='scss' scoped>
* {
  list-style: none;
}

.upload-file-or-create-task {
  display: inline-block;
  margin-left: 5px;
}

$radius: 4px;
.loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #409eff;
  border-left: transparent;
  animation: zhuan 0.5s linear infinite;
  border-radius: 50%;
}

@keyframes zhuan {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #eee;
  border-radius: 3px;
}

.gray {
  color: #a8a8aa;
}

.main-container {
  align-items: stretch;
  padding: 18px;
  box-sizing: border-box;
  background: #f1f5f9;

  .main-left {
    flex: {
      basis: 24%;
    }
    background: white;
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
    $pad: 20px;
    padding: {
      left: $pad;
      right: $pad;
    }
    border-right: 1px solid #e5e7ed;
  }
}

.header-row {
  line-height: 60px;
  font-size: 16px;

  .left {
    text-align: left;
  }

  .right {
    a {
      cursor: pointer;
      margin-right: 5px;

      .svg-transform {
        height: 14px;
        width: 14px;
        cursor: pointer;
        vertical-align: 0;
        filter: drop-shadow(#636d7e 9999rem 0);
        transform: translateX(-9999rem);
      }
    }

    text-align: right;
  }
}

.orders {
  height: 90%;
  overflow-y: auto;

  ul {
    padding: 0;
  }
}

.order {
  margin-bottom: 20px;
  border: 1px solid #e5e7ed;
  border-radius: 4px;
  padding: 15px;
  text-align: left;

  .more {
    text-align: center;
    color: #25262b;
    margin-top: 0.5em;

    span {
      cursor: pointer;
    }
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .success {
    color: #7ebf50;
  }

  .normal {
    color: #347eff;
  }

  .compare,
  .download {
    text-align: right;

    a {
      cursor: pointer;
      color: #347eff;
    }
  }

  .notice {
    color: #a8a8aa;
  }

  .spilit-line {
    border: 1px solid #e5e7ed;
  }
}

.time-line {
  text-align: center;
  line-height: 14px;
  font-size: 14px;

  .svg-icon {
    width: 1.2em;
    height: 1.2em;
    transform: translateY(-15%);
  }

  .el-progress {
    transform: translateY(15%);
  }
}

.main-right {
  .el-container {
    height: 100%;
  }
  .right-main-img {
    width: 100%;
    height: 100%;
    img {
      height: auto;
      width: 100%;
    }
  }
  flex: {
    basis: 77%;
  }
  background: white;
  border-top-right-radius: $radius;
  border-bottom-right-radius: $radius;
}

.main-right-header {
  .el-col {
    &:first-of-type {
      text-align: left;
    }

    &:last-of-type {
      text-align: right;
    }
  }
}
</style>
