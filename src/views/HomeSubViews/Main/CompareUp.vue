<template>
  <el-container
    class="compare-up-container-main"
    :style="{ height: heightPXLimit }"
  >
    <el-header width="0" class="container-el-header">
      <div class="container-header-left">
        <div class="left">对比记录</div>
        <div class="left-panel-right">
          <a @click="changeLayout()" title="切换布局">
            <svg-icon
              class-name="svg-transform"
              icon-class="transform"
            ></svg-icon>
          </a>
          <UploadFileOrCreateTask
            class="upload-file-or-create-task"
            @on-click-upload="handleOnClickUpload"
          />
        </div>
      </div>
      <div class="container-header-right">
        <el-button type="primary" @click="downLoadBatch" icon="el-icon-download"
          >下载
        </el-button>
      </div>
    </el-header>

    <el-main class="compare-up-el-main" ref="compareUpElMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-row-style="{
          background: 'RGB(246,248,250)',
        }"
        :row-class-name="tableCellClassName"
        :header-cell-style="{
          background: 'RGB(246,248,250)',
        }"
        :max-height="tableHeight"
      >
        <el-table-column type="expand">
          <template #default="props">
            <el-table
              :data="props.row.orders"
              style="width: 100%"
              :show-header="false"
              :row-class-name="tableCellClassName"
              ref="multipleTable"
            >
              <el-table-column type="expand">
                <template #default="props">
                  <div
                    @mouseenter="props.row.isZoomIn = !props.row.isZoomIn"
                    @mouseleave="props.row.isZoomIn = !props.row.isZoomIn"
                    style="
                      width: 100%;
                      height: 300px;
                      overflow: hidden;
                      position: relative;
                    "
                  >
                    <el-image
                        style="width: 100%; height: auto"
                        :src="props.row.url"
                        :preview-src-list="[props.row.url]"
                    >
                    </el-image>
                    <div class="cover" v-show="props.row.isZoomIn">
                        <div class="el-icon-zoom-in" >
                        </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="40">
                <template #default="params">
                  <el-checkbox
                    v-model="
                      tableData[props.row.index].orders[params.row.index]
                        .checked
                    "
                    @change="
                      compareGroupCheckboxClick({
                        taskIndex: props.row.index,
                        compareIndex: params.row.index,
                      })
                    "
                  ></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                label="流水帐号"
                prop="serialNumber"
                width="240"
              ></el-table-column>
              <el-table-column label="名称" prop="title"></el-table-column>
              <el-table-column
                label="对比费用"
                prop="fee"
                width="150"
              ></el-table-column>
              <el-table-column
                label="支付状态"
                prop="status"
                width="150"
              ></el-table-column>
              <el-table-column
                label="对比状态"
                prop="status"
                width="150"
              ></el-table-column>
              <el-table-column
                label="对比结果"
                prop="result"
                width="150"
              ></el-table-column>
              <el-table-column
                label="时间"
                prop="createTime"
                width="200"
              ></el-table-column>
              <el-table-column width="200">
                <template #default="scope">
                  <div class="act">
                    <svg-icon icon-class="show-eye"></svg-icon>
                    <span
                      style="cursor: pointer"
                      @click="
                        lookUpCompareResult(scope.row.taskId, scope.row.id)
                      "
                      >查看</span
                    >
                    <el-divider direction="vertical"></el-divider>
                    <svg-icon icon-class="download"></svg-icon>
                    <span
                      style="cursor: pointer"
                      @click="downloadSingleFile(scope.row.id, 'compare')"
                      >下载</span
                    >
                    <el-divider direction="vertical"></el-divider>
                    <svg-icon icon-class="bin"></svg-icon>
                    <span style="cursor: pointer" @click="deleteTask(scope.row)"
                      >删除</span
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column width="50">
          <template #default="params">
            <el-checkbox
              v-model="tableData[params.row.index].checked"
              :indeterminate="
                taskGroupIndeterminate({ taskIndex: params.row.index })
              "
              @change="
                taskGroupTableCheckboxClick({ taskIndex: params.row.index })
              "
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="流水编号/任务ID"
          prop="id"
          width="240"
        ></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column
          label="对比费用"
          prop="fee"
          width="150"
        ></el-table-column>
        <el-table-column
          label="支付状态"
          prop="payState"
          width="150"
        ></el-table-column>
        <el-table-column
          label="对比状态"
          prop="payState"
          width="150"
        ></el-table-column>
        <el-table-column
          label="对比结果"
          prop="contrastResult"
          width="150"
        ></el-table-column>
        <el-table-column
          label="时间"
          prop="createTime"
          width="200"
        ></el-table-column>

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="act">
              <svg-icon icon-class="show-eye"></svg-icon>
              <span
                style="cursor: pointer"
                @click="lookUpCompareResult(scope.row.id)"
                >查看</span
              >
              <el-divider direction="vertical"></el-divider>
              <svg-icon icon-class="download"></svg-icon>
              <span
                style="cursor: pointer"
                @click="downloadSingleFile(scope.row.id, 'task')"
                >下载</span
              >
              <el-divider direction="vertical"></el-divider>
              <svg-icon icon-class="bin"></svg-icon>
              <span style="cursor: pointer" @click="deleteTask(scope.row)"
                >删除</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-footer>
        <el-row class="pagination">
          <el-col :span="24">
            <el-pagination
              :page-sizes="pageSizes"
              :page-size.sync="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
              @current-change="handleCurrentChange"
              @size-change="handleCurrentChange"
              :current-page.sync="pagination.currentPage"
              background
            >
            </el-pagination>
          </el-col>
        </el-row>
      </el-footer>
    </el-main>

    <UploadDialog
      v-if="IsUploadDialogShow"
      @onClose="IsUploadDialogShow = false"
      :task-id="1"
      @onComplete="uploadOnComplete"
    ></UploadDialog>
  </el-container>
</template>

<script>
import taskGroup from "../../../biz/Rbac/TaskGroup.js";
import DownloadHelper from "../../../util/DownloadHelper";
import UploadFileOrCreateTask from "@/components/Home/Compare/UploadFileOrCreateTask";
import UploadDialog from "@/components/Home/Compare/UploadDialog";
import FileBiz from "@/biz/Rbac/File";

export default {
  name: "HomeCompareUp",
  components: {
    UploadDialog,
    UploadFileOrCreateTask,
  },
  data() {
    return {
      /**
       * @description 对比组数据集
       */
      dataCollection: [],
      IsUploadDialogShow: false,
      multipleSelection: [],
      ordersId: [],
      tableData: [],
      pageSizes: [10, 20, 30, 40],
      pagination: {
        total: 220,
        pageSize: 10,
        currentPage: 1,
      },
      /**
       * @description 主内容面板高度
       */
      heightLimit: document.body.clientHeight - 66,
      /**
       * @description 绑定表格高度，避免展开子节点的时候把页面撑开
       */
      tableHeight: document.body.clientHeight - 66 - 120 - 60 + "px",
    };
  },
  computed: {
    /**
     * @description 主内容面板高度限制需要返回一个字符串
     * @returns {String}
     */
    heightPXLimit() {
      return `${this.heightLimit}px`;
    },
  },
  methods: {
    /**
     * 获取对比组多选框不确定状态
     * @param taskIndex
     * @returns {boolean}
     */
    taskGroupIndeterminate({ taskIndex }) {
      try {
        return this.tableData[taskIndex].indeterminate;
        // eslint-disable-next-line
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    /**
     * @description 外层任务组表格多选框点击事件
     * @param taskIndex
     */
    taskGroupTableCheckboxClick({ taskIndex }) {
      let checkStatus = this.tableData[taskIndex].checked;
      this.tableData[taskIndex].orders.forEach((order, index) => {
        this.tableData[taskIndex].orders[index].checked = checkStatus;
      });
    },
    /**
     * @description 内层对比组变革多选框点击事件
     * @param taskIndex
     * @param compareIndex
     */
    compareGroupCheckboxClick({ taskIndex, compareIndex }) {
      this.tableData[taskIndex].indeterminate = true;
      let isCheckedAll = true;
      for (let i = 0; i < this.tableData[taskIndex].orders.length; i++) {
        if (this.tableData[taskIndex].orders[i].checked === false) {
          isCheckedAll = false;
          break;
        }
      }
      let isUnCheckedAll = true;
      for (let i = 0; i < this.tableData[taskIndex].orders.length; i++) {
        if (this.tableData[taskIndex].orders[i].checked === true) {
          isUnCheckedAll = false;
          break;
        }
      }
      this.tableData[taskIndex].indeterminate =
        !isCheckedAll && !isUnCheckedAll;
      this.tableData[taskIndex].checked =
        isCheckedAll && !this.tableData[taskIndex].indeterminate;
    },
    /**
     * @description 上传窗口上传完成
     */
    uploadOnComplete() {
      this.IsUploadDialogShow = false;
      // TODO:刷新页面，重新加载数据
    },
    /**
     * @description 点击上传文件
     */
    handleOnClickUpload() {
      this.IsUploadDialogShow = true;
    },
    deleteTask(Ids) {
      //获得勾选的id.
      taskGroup.delTaskByIds(Ids);
      this.$notify({
        title: "删除成功！",
        type: "success",
      });
    },
    /**
     * @description 下载单个文件
     * @param row
     * @param {'task'|'compare'} type
     */
    downloadSingleFile(row, type) {
      if (type === "task") {
        window.open(FileBiz.getTaskDownloadUrl([row]));
      } else {
        window.open(FileBiz.getDownloadUrl([row]));
      }
    },
    /**
     * 表格中查看按钮事件
     * @param {Number} taskId
     * @param {Number|null} compareId
     */
    lookUpCompareResult(taskId, compareId = null) {
      this.$router.push({
        name: "HomeCompareLeft",
        query: {
          taskId: taskId + "",
          compareId: compareId + "",
        },
      });
    },
    handleDelete(index, val) {
      console.log("你还勾选了我们要选的", index, val);
    },
    // 为每行数据设置索引 rowIndex 就是当前所在行的索引
    tableCellClassName({ row, rowIndex }) {
      row.index = rowIndex;
      // row.itemDetailRefKey = `items${rowIndex}`
    },
    selectTaskGroup(selection) {
      // 如果选中
      for (const selectionElement of selection) {
        let index = selectionElement.index;
        if (!this.dataCollection[index].item) {
          let a = this.dataCollection[index];
          a.item = true;
          this.$set(this.dataCollection, index, a);
          // 如果展开
          if (this.$refs.multipleTable) {
            this.$refs.multipleTable.toggleAllSelection();
          }
        } else {
          let a = this.dataCollection[index];
          a.item = false;
          this.$set(this.dataCollection, index, a);
        }
      }
    },
    /**
     * @description 点击改变布局按钮触发的事件
     */
    changeLayout() {
      console.log("打开左右布局");
      this.$router.push({ name: "HomeCompareLeft" });
    },
    /**
     * @description 刷新数据
     * @param val
     */
    async getAll(val) {
      let res = await taskGroup.getAll(val, this.pagination.pageSize);
      this.pagination.total = res.total;
      res.records = res.records.map((e, index) => {
        e.orders = e.orders.map((ee, index) => {
          // checkOrders[index] = false;
          this.$set(ee, "checked", false);
          this.$set(ee, "index", index);
          return ee;
        });
        e.orders = e.orders.filter((e) => e.id !== null);
        e.orders.forEach(ele=>{
          ele["isZoomIn"] = false;
        })
        this.$set(e, "index", index);
        this.$set(e, "checked", false);
        this.$set(e, "indeterminate", false); //checkbox不确定状态
        return e;
      });
      this.tableData = res.records;
      console.log("this.dataCollection", this.tableData);
    },
    /**
     * @description 分页
     * @param val
     */
    handleCurrentChange(val) {
      this.getAll(val);
      console.log(`当前页: ${val}`);
    },
    /**
     * @description 批量下载
     */
    downLoadBatch() {
      //获取所有task.orders.order.checked状态为true时候,task.orders.order.id的值
      let downList = this.tableData.map((task, index) => {
        return task.orders.map((order, index) => {
          if (order.checked) return order.id;
        });
      });
      //扁平化
      downList = downList.flat();
      //剔除undefined
      /**
       * @type {Array.<Number>}
       */
      downList = downList.filter((a) => a !== undefined);
      if (downList.length === 0) {
        this.$message.error("请先选择需要下载的项目");
        return;
      }
      window.open(FileBiz.getDownloadUrl(downList));
    },
   
    
  },
  created() {
    this.getAll(1);
  },
  mounted() {},
};
</script>

<style lang="scss">
$radius: 4px;
.compare-up-container-main {
  height: 100%;
  width: 100%;
  align-items: stretch;
  padding: 18px;
  box-sizing: border-box;
  background: #f1f5f9;

  .cover {
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 300px;
    background: rgba(18, 37, 18, .5);
    // background: #999;
    .el-icon-zoom-in{
      width: 40px;
      height: 40px;
      font-size: 40px;
      // background: #999;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  & > .container-el-header {
    font-size: 16px;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .container-header-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-basis: 24%;
      transform: translateY(-1px);

      .svg-add {
        width: 18px;
        height: 18px;
      }
    }

    .upload-file-or-create-task {
      visibility: hidden;
      display: inline;
    }

    .container-header-right {
      align-items: center;
      display: flex;
      justify-content: flex-end;
      flex-basis: 77%;
    }

    .el-image {
      width: 100%;
      height: 300px;
      overflow: hidden;

      img {
        height: auto;
      }
    }

    .svg-icon {
      cursor: pointer;
    }

    .left-panel-right {
      margin-right: 27px;

      a {
        cursor: pointer;
        margin-right: 10px;

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

  & > .compare-up-el-main {
    background: #fff;
    padding: {
      top: 0;
    }

    .el-footer {
      background: white;
      border-bottom-left-radius: $radius;
      border-bottom-right-radius: $radius;

      .pagination {
        .el-col {
          text-align: right;
        }

        position: absolute;
        right: 60px;
        bottom: 50px;
      }
    }

    .el-table__expanded-cell {
      padding: 0 0 0 10px;
    }
  }
}
</style>