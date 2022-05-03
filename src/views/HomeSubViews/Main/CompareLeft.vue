<template>
  <el-container
    class="main-content-container"
    :style="{ height: heightPXLimit }"
  >
    <el-aside class="main-left" width="0">
      <div>
        <el-row class="header-row">
          <el-col :span="16">
            <div class="left">
              <span>对比记录</span>
              <span
                class="gray"
                :style="{ 'margin-left': '10px', 'font-size': '14px' }"
              >
                任务组: {{ taskGroupName }}</span
              >
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
              <UploadFileOrCreateTask
                class="upload-file-or-create-task"
                @on-click-upload="handleOnClickUpload"
                @on-created-task="handleOnCreatedTask"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="orders">
        <ul infinite-scroll-immediate="true" v-if="compareLogData === {}">
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
                    <el-collapse-item :name="val.id">
                      <template #title>
                        <el-button type="text" @click="isShow(index)">{{
                          isFoldArray[index]
                        }}</el-button>
                      </template>
                      <el-row class="file-list">
                        <el-col :span="20">
                          <span>{{ val.files[0].name }}</span>
                        </el-col>
                        <el-col :span="4">
                          <span class="success">已完成</span>
                        </el-col>
                      </el-row>

                      <el-row class="file-list">
                        <el-col :span="20">
                          <span>{{ val.files[1].name }}</span>
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
          <el-row class="main-right-header" v-if="compareResultImgUrl">
            <el-col :span="4">
              <el-tooltip
                placement="top-start"
                :content="compareResultReferenceFileName"
              >
                <template>
                  <div>
                    <span class="gray">参考图纸名称: </span>
                    <span>{{ compareResultReferenceFileName }}</span>
                  </div>
                </template>
              </el-tooltip>
            </el-col>
            <el-col :span="3">
              <el-tooltip placement="top-start" :content="compareResult.size">
                <template>
                  <div>
                    <span class="gray">大小: </span>
                    <span>{{ compareResult.size }}</span>
                  </div>
                </template>
              </el-tooltip>
            </el-col>
            <el-col :span="4">
              <el-tooltip
                placement="top-start"
                :content="compareResultCompareFileName"
              >
                <template>
                  <div>
                    <span class="gray">对比图纸名称: </span>
                    <span>{{ compareResultCompareFileName }}</span>
                  </div>
                </template>
              </el-tooltip>
            </el-col>
            <el-col :span="3">
              <el-tooltip placement="top-start" :content="compareResult.size">
                <template>
                  <div>
                    <span class="gray">大小: </span>
                    <span>{{ compareResult.size }}</span>
                  </div>
                </template>
              </el-tooltip>
            </el-col>
            <el-col :span="4">
              <el-tooltip
                placement="top-start"
                :content="compareResult.resolution"
              >
                <template>
                  <div>
                    <span class="gray">图纸分辨率: </span>
                    <span>{{ compareResult.resolution }}</span>
                  </div>
                </template>
              </el-tooltip>
            </el-col>
            <el-col :span="3" :style="{ color: '#FF0000' }">
              <span>红色: </span>
              <span>代表修改部分</span>
            </el-col>
            <el-col :span="3" :style="{ color: '#7ebf50' }">
              <span>绿色: </span>
              <span>代表删除部分</span>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="right-main-img">
            <el-image
              :src="compareResultImgUrl"
              :previewSrcList="[compareResultImgUrl]"
            />
          </div>
        </el-main>
      </el-container>
    </el-main>

    <UploadDialog
      v-if="IsUploadDialogShow"
      @onClose="IsUploadDialogShow = false"
      :task-id="compareLogData.id"
      @onComplete="uploadOnComplete"
    ></UploadDialog>
  </el-container>
</template>

<script>
import UploadDialog from "@/components/Home/Compare/UploadDialog";
import UploadFileOrCreateTask from "@/components/Home/Compare/UploadFileOrCreateTask";
import TaskGroupBiz from "@/biz/Rbac/TaskGroup.js";
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
       * @type {TaskGroupEntity|Object}
       */
      compareLogData: {},
      /**
       * @description 当前用户查看的对比组索引，默认第一个
       * @type {Number}
       */
      currentLookUpCompareGroupIndex: 0,
      currentPage: 0,
      pageSize: 3, //每页数据总数
      totalPages: 0, //总页数
      isLoading: false, //是否在加载中，绑定给loading图标用
      isFoldArray: ["查看更多"],
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
    taskGroupName() {
      return this.compareLogData?.name;
    },

    /**
     * @description 主内容面板高度限制需要返回一个字符串
     * @returns {String}
     */
    heightPXLimit() {
      return `${this.heightLimit}px`;
    },
    /**
     * 当前对比结果 图片链接
     * @returns {String}
     */
    compareResultImgUrl() {
      return this.compareResult.url;
    },

    /**
     * 当前对比结果参 考图纸名称
     * @returns {String}
     */
    compareResultReferenceFileName() {
      try {
        return this.compareResult.files[0].name;
        // eslint-disable-next-line
      } catch (e) {}
      return "";
    },

    /**
     * 当前对比结果 对比图纸名称
     * @returns {String}
     */
    compareResultCompareFileName() {
      try {
        return this.compareResult.files[1].name;
        // eslint-disable-next-line
      } catch (e) {}
      return "";
    },
    /**
     * @description 当前查看的对比结果
     * @returns {OrderEntity|Object}
     */
    compareResult() {
      try {
        return this.compareLogData.orders[this.currentLookUpCompareGroupIndex];
        // eslint-disable-next-line
      } catch (e) {}
      return {};
    },
  },
  methods: {
    /**
     * @description 点击上传文件显示上传弹窗事件
     */
    handleOnClickUpload() {
      this.IsUploadDialogShow = true;
    },
    /**
     * @description 创建任务完成
     */
    handleOnCreatedTask() {
      setTimeout(() => {
        this.refreshData();
      }, 1000);
    },
    /**
     * @description 上传窗口上传完成
     */
    uploadOnComplete() {
      this.IsUploadDialogShow = false;
      // TODO:刷新页面，重新加载数据
    },
    //控制每一个折叠面板的文字
    isShow(index) {
      if (this.isFoldArray[index] === "查看更多")
        this.isFoldArray.splice(index, 1, "收起");
      else this.isFoldArray.splice(index, 1, "查看更多");
    },
    /**
     * @description 点击左侧对比组的“对比”或“查看”按钮
     * @param {Number} index
     */
    gotoCompareResult(index) {
      this.currentLookUpCompareGroupIndex = index;
      // this.compareResultImgUrl = this.compareLogData.orders[index].url;
      // this.$notify.success({
      //   title: "成功",
      //   message: "获取对比结果",
      // });
    },

    downloadCompareResult(compareId) {
      TaskGroupBiz.download(compareId).then((res) => {
        this.$notify.success({
          title: "成功",
          message: "获取对比结果",
        });
        // console.log("点击对比之后返回的是",res);
      });
    },
    /**
     * @description 切换布局
     */
    changeLayout() {
      console.log("用另一种布局方式显示文件,上下布局");
      this.$router.push({ name: "HomeCompareUp" });
    },

    /**
     * @description 刷新数据
     */
    refreshData() {
      if (this.$route.query.taskId === undefined) {
        TaskGroupBiz.getAll(1, 1).then((res) => {
          this.compareLogData = res.records[0];
        });
      } else {
        TaskGroupBiz.find({ taskId: Number(this.$route.query.taskId) }).then(
          (r) => (this.compareLogData = r)
        );
      }
    },
  },
  created() {
    this.refreshData();
  },
};
</script>

<style lang='scss'>
$radius: 4px;
.main-content-container {
  align-items: stretch;
  padding: 18px;
  box-sizing: border-box;
  background: #f1f5f9;

  * {
    list-style: none;
  }

  .el-collapse {
    border: 0;

    .el-collapse-item__header {
      justify-content: center;
      border-bottom: 0;
      height: 18px;
      line-height: 18px;
      //左侧折叠面板更多，把箭头与文字合并在一起
      .el-collapse-item__arrow {
        margin: 0 0 0 5px;
      }
    }

    .el-collapse-item__wrap {
      border: 0;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }

  .upload-file-or-create-task {
    display: inline-block;
    margin-left: 5px;
  }

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

    .el-main {
      padding: 0;
      margin: 20px;
    }

    .right-main-img {
      width: 100%;
      height: 100%;
      .el-image {
        width: 100%;
        height: 100%;
        overflow: visible;
        img {
          height: auto !important;
          width: 100%;
        }
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

      overflow: hidden;
      text-overflow: ellipsis;

      &:last-of-type {
        text-align: right;
      }

      span {
        white-space: nowrap;
      }
    }
  }
}
</style>
