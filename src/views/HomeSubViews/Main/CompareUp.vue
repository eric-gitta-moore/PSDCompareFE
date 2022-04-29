<template>
  <el-container class="compare-up-container-main">
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
        <el-button type="primary" @click="downLoad" icon="el-icon-download"
          >下载</el-button
        >
      </div>
    </el-header>

    <el-main class="compare-up-el-main">
      <el-table
        :data="tableData"
        style="width: 100%"
        @expand-change="expand"
        @select="selsecTaskGroup"
        :header-row-style="{
          background: 'RGB(246,248,250)',
        }"
        :row-class-name="tableCellClassName"
        :header-cell-style="{
          background: 'RGB(246,248,250)',
        }"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
                :data="props.row.orders"
                style="width: 100%"
                :show-header="false"
                @selection-change="
                (selection) => handleSelectionChange(selection, props.row.index)
              "
              :row-class-name="tableCellClassName"
              @select="
                (selection, row) => userSelect(selection, row, props.row.index)
              "
              ref="multipleTable"
            >
              <el-table-column type="selection" width="10" :border="false">
              </el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-image
                    style="width: 100%; height: 300px"
                    :src="props.row.url"
                    @load="loadImg(props.row.url)"
                    :preview-src-list="srcList"
                  >
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                label="流水帐号"
                prop="serialNumber"
                width="170"
              ></el-table-column>
              <el-table-column
                  label="名称"
                  prop="title"
                  width="120"
              ></el-table-column>
              <el-table-column
                label="对比费用"
                prop="fee"
                width="100"
              ></el-table-column>
              <el-table-column
                label="支付状态"
                prop="status"
                width="100"
              ></el-table-column>
              <el-table-column
                label="对比状态"
                prop="`已完成`"
                width="100"
              ></el-table-column>
              <el-table-column
                label="对比结果"
                prop="result"
                width="100"
              ></el-table-column>
              <el-table-column
                label="时间"
                prop="createTime"
                width="190"
              ></el-table-column>
              <el-table-column width="240px">
                <template #default="scope">
                  <div class="act">
                    <svg-icon icon-class="show-eye"></svg-icon>
                    <span
                      style="cursor: pointer"
                      @click="checkTask(scope.row.id)"
                      >查看</span
                    >
                    <el-divider direction="vertical"></el-divider>
                    <svg-icon icon-class="download"></svg-icon>
                    <span
                      style="cursor: pointer"
                      @click="downLoadTask(scope.row.id)"
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

        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column label="流水编号/任务ID" width="210"></el-table-column>
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
          prop="contrastState"
          width="180"
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
              <span style="cursor: pointer" @click="checkTask(scope.row.id)"
                >查看</span
              >
              <el-divider direction="vertical"></el-divider>
              <svg-icon icon-class="download"></svg-icon>
              <span style="cursor: pointer" @click="downLoadTask(scope.row.id)"
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
              @current-change="handleCurrentChange"
              background
              layout="total, prev,sizes,pager, next, jumper"
              :total="pagination.total"
              :page-sizes="pageSizes"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </el-footer>
    </el-main>

    <UploadDialog
      v-if="IsUploadDialogShow"
      @onClose="IsUploadDialogShow = false"
      task-id="1"
      @onComplete="uploadOnComplete"
    ></UploadDialog>
  </el-container>
</template>

<script>
import taskGroup from "../../../biz/Rbac/TaskGroup.js";
import DownloadHelper from "../../../util/DownloadHelper";
import UploadFileOrCreateTask from "@/components/Home/Compare/UploadFileOrCreateTask";
import UploadDialog from "@/components/Home/Compare/UploadDialog";

export default {
  name: "HomeCompareUp",
  components: {
    UploadDialog,
    UploadFileOrCreateTask,
  },
  data() {
    return {
      /**
       * @description 判断订单是否能被选中
       */
      isChecked: {},
      IsUploadDialogShow: false,
      multipleSelection: [],
      ordersId: [],
      srcList: [],
      tableData: [],
      pageSizes: [10, 20, 30, 40],
      pagination: {
        total: 220,
      },
    };
  },
  methods: {
    /**
     * @description 上传窗口上传完成
     */
    expand(row, val) {
      if (this.isChecked[row.index].item) {
        this.$nextTick(() => {
          if (this.$refs.multipleTable) {
            this.$refs.multipleTable.toggleAllSelection();
            console.log("this.$refs.multipleTable", this.$refs.multipleTable);
          }
        });
      }
    },
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
      taskGroup.deleteTaskByIds(Ids);
      this.$notify({
        title: "删除成功！",
        type: "success",
      });
    },

    downLoadTask(row) {
      DownloadHelper.downloadByAnchorTag({});
      console.log(row);
    },
    //查看该文件
    checkTask(rowKey) {
      this.$router.push({
        name: "Home",
        params: {
          id: rowKey, //请求回来的任务组id
        },
      });
      console.log(rowKey);
    },
    handleDelete(index, val) {
      console.log("你还勾选了我们要选的", index, val);
    },
    // 为每行数据设置索引 rowIndex 就是当前所在行的索引
    tableCellClassName({row, rowIndex}) {
      row.index = rowIndex;
      // row.itemDetailRefKey = `items${rowIndex}`
    },
    selsecTaskGroup(selecttion, row) {
      // 如果选中
      if (!this.isChecked[row.index].item) {
        let a = this.isChecked[row.index];
        a.item = true;
        this.$set(this.isChecked, row.index, a);
        // 如果展开
        if (this.$refs.multipleTable) {
          this.$refs.multipleTable.toggleAllSelection();
        }
      } else {
        let a = this.isChecked[row.index];
        a.item = false;
        this.$set(this.isChecked, row.index, a);
      }
    },
    changeLayout() {
      console.log("打开左右布局");
      this.$router.push({ name: "HomeCompareLeft" });
    },
    getAll(val) {
      taskGroup.getAll(val).then((res) => {
        debugger;
        console.log("响应成功返回的是:", res.records);
        this.tableData = res.records;
        this.pagination.total = res.total;
        let checkTaskTop = {};
        res.records.forEach((ele, index) => {
          let checkOrders = {};
          checkOrders.item = false;
          ele.orders.forEach((ele, index) => {
            checkOrders[index] = false;
          });
          checkTaskTop[index] = checkOrders;
        });
        this.isChecked = checkTaskTop;
        console.log("checkTaskTop[index] = checkOrders;", this.isChecked);
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.getAll(val);
      console.log(`当前页: ${val}`);
    },
    // 勾选状态改变
    handleSelectionChange(val, index) {
      console.log("某个order被勾选", val, index);
      let ids = val.map((ele) => {
        console.log("id", ele.id);
        return ele.id;
      });
      this.ordersId.push(...ids);
    },
    // 用户手动更改状态
    userSelect(arr, row, index) {
      console.log("手动勾选了某个订单", this.isChecked[index][row.index]);
      this.isChecked[index][row.index] = true;
    },
    loadImg(val) {
      this.srcList = [];
      console.log("加载了图片", val);
      this.srcList.push(val);
    },
    downLoad() {},
  },
  mounted() {
    console.log("挂载了一个页面");
    this.getAll(1);
  },
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

    };

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
      padding: 0 0px 0px 20px;
    }
  }
}
</style>