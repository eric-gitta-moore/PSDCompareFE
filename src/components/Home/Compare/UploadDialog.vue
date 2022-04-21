<template>
  <BaseDialog
      dialog-title="title"
      height="800px"
      width="1014px"
      class="upload-dialog"
  >
    <template #header>
      <el-row class="header">
        <el-col :span="20" class="title">上传PDF图纸</el-col>
        <el-col :span="4" class="close">
          <svg-icon icon-class="close" @click="closeDialog"></svg-icon>
        </el-col>
      </el-row>
    </template>
    <template #main>
      <div class="main-contain">
        <!--        左侧表格-->
        <el-container class="left-table">
          <el-header class="table-header" height="auto">
            <p>参考图纸文件</p>
            <el-button type="primary" size="mini" @click="handleUploadClick('leftFileInput')"
            >上传
            </el-button
            >
          </el-header>
          <el-main class="table-main">
            <el-table
                :data="fileListLeft"
                tooltip-effect="dark"
                :header-cell-style="headerCellStyle"
                :row-class-name="rowClassName"
                @cell-click="cellClickEvent"
                :cell-class-name="tableCellClassName"
                @header-click="headerClickEvent"
                ref="leftTable"
            >
              <el-table-column width="40px" class-name="dragalbe">
                <template #default="scope">
                  <SvgIcon
                      icon-class="drag"
                      class="drag-icon"
                      :data-index="scope.row.index"
                      :data-sort-index="scope.row.sortIndex"
                  ></SvgIcon>
                </template>
              </el-table-column>
              <el-table-column
                  width="50px"
                  prop="index"
                  label="序号"
                  show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                  prop="title"
                  label="文件名"
                  show-overflow-tooltip
                  :index="3"
              ></el-table-column>
              <el-table-column
                  prop="size"
                  label="大小"
                  :formatter="showFormatFileSize"
                  show-overflow-tooltip
                  width="80px"
              ></el-table-column>
              <el-table-column width="40px">
                <template #default="scope">
                  <SvgIcon
                      icon-class="ding"
                      class="ding-icon"
                      :class="dingStyle(scope.row, fileListLeft)"
                  ></SvgIcon>
                </template>
                <template #header>
                  <SvgIcon
                      icon-class="ding"
                      class="ding-icon"
                      :class="headerDingStyle(leftTableDing)"
                  ></SvgIcon>
                </template>
              </el-table-column>
            </el-table>

            <input
                class="el-upload__input"
                type="file"
                ref="leftFileInput"
                name="leftFileInput"
                accept=".pdf"
                multiple
                @change="handFileChange('leftFileInput','fileListLeft')"
            />
          </el-main>
        </el-container>
        <div class="divider">
          <el-divider direction="vertical"></el-divider>
        </div>
        <!--        右侧表格-->
        <el-container class="right-table">
          <el-header class="table-header" height="auto">
            <p>参考图纸文件</p>
            <el-button type="primary" size="mini" @click="handleUploadClick('rightFileInput')"
            >上传
            </el-button
            >
          </el-header>
          <el-main class="table-main">
            <el-table
                :data="fileListRight"
                tooltip-effect="dark"
                :header-cell-style="headerCellStyle"
                :row-class-name="rowClassName"
                @cell-click="cellClickEvent"
                :cell-class-name="tableCellClassName"
                @header-click="headerClickEvent"
                ref="rightTable"
            >
              <el-table-column width="40px" class-name="dragalbe">
                <template #default="scope">
                  <SvgIcon
                      icon-class="drag"
                      class="drag-icon"
                      :data-index="scope.row.index"
                      :data-sort-index="scope.row.sortIndex"
                  ></SvgIcon>
                </template>
              </el-table-column>
              <el-table-column
                  width="50px"
                  type="index"
                  label="序号"
                  show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                  prop="title"
                  label="文件名"
                  show-overflow-tooltip
                  :index="3"
              ></el-table-column>
              <el-table-column
                  prop="size"
                  label="大小"
                  :formatter="showFormatFileSize"
                  show-overflow-tooltip
                  width="80px"
              ></el-table-column>
              <el-table-column width="40px">
                <template #default="scope">
                  <SvgIcon
                      icon-class="ding"
                      class="ding-icon"
                      :class="dingStyle(scope.row, fileListLeft)"
                  ></SvgIcon>
                </template>
                <template #header>
                  <SvgIcon
                      icon-class="ding"
                      class="ding-icon"
                      :class="headerDingStyle(leftTableDing)"
                  ></SvgIcon>
                </template>
              </el-table-column>
            </el-table>

            <input
                class="el-upload__input"
                type="file"
                ref="rightFileInput"
                name="rightFileInput"
                accept=".pdf"
                multiple
                @change="handFileChange('rightFileInput','fileListRight')"
            />
          </el-main>
        </el-container>
      </div>
    </template>
    <template #footer>
      <div class="footer-btn-group">
        <div class="left">
          <el-button @click="autoMatchFileList" plain>自动匹配</el-button>
        </div>
        <div class="right">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary">完成</el-button>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import FileHelper from "@/util/FileHelper.js";
import Sortable, {Swap} from "sortablejs";

Sortable.mount(new Swap());
import BaseDialog from "@/components/_Common/BaseDialog.vue";

export default {
  name: "UploadDialog",
  components: {
    BaseDialog,
  },
  data() {
    return {
      fileListLeft: [], //左侧文件列表
      fileListRight: [], //右侧文件列表
      headerCellStyle: {background: "#f6f8fa"},
      leftTableDing: false, //左侧表格表头钉子状态
      rightTableDing: false, //右侧表格表头钉子状态
    };
  },
  computed: {
    leftTableDom() {
      return this.$refs.leftTable.$el.querySelector(".el-table__body tbody");
    },
    rightTableDom() {
      return this.$refs.rightTable.$el.querySelector(".el-table__body tbody");
    },
  },
  methods: {
    autoMatchFileList() {
      if (this.fileListLeft.length === 0 || this.fileListRight.length === 0) {
        this.$message({
          showClose: true,
          message: '左右文件列表不能同时为空',
          type: 'error'
        });
      }
      let leftFileList = this.fileListLeft;
      let rightFileList = this.fileListRight;
      let leftFileListMatched = [], rightFileListMatched = [];
      for (const leftItem of leftFileList) {
        for (const rightItem of rightFileList) {
          if (leftItem.title === rightItem.title) {
            leftFileListMatched.push(leftItem);
            rightFileListMatched.push(rightItem);
          }
        }
      }
    },
    //单元格 格式化内容回调
    showFormatFileSize(row, column, cellValue, index) {
      return FileHelper.formatFileSize(row.size);
    },
    closeDialog() {
    },
    //固定所有行
    doFixedAll() {
      for (const iterator of this.fileListLeft) {
        iterator.dragalbe = this.leftTableDing;
      }
      this.leftTableDing = !this.leftTableDing;
    },
    //表头钉子样式回调
    headerDingStyle: (a) => (a ? "ding" : ""),
    //普通钉子样式回调
    dingStyle(a, fileList) {
      //调整表头钉子样式，如果为非全选状态则切换为非ding状态
      let fileStatus = fileList[0].dragalbe;
      let allChecked = true;
      for (const file of fileList) {
        if (fileStatus !== file.dragalbe) {
          if (fileList === this.fileListLeft) this.leftTableDing = false;
          if (fileList === this.fileListRight) this.rightTableDing = false;
          allChecked = false;
          break;
        }
      }
      if (allChecked && fileStatus === false) {
        if (fileList === this.fileListLeft) this.leftTableDing = true;
        if (fileList === this.fileListRight) this.rightTableDing = true;
      }

      return !a.dragalbe ? "ding" : "";
    },
    //处理所有表头点击事件
    headerClickEvent(column, event) {
      if (parseInt(column.columnIndex) === 4) this.doFixedAll();
    },
    //初始化每一个单元格索引
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      // row.rowIndex = rowIndex;
      column.columnIndex = columnIndex;
    },
    rowClassName({row, rowIndex}) {
      if (!row.dragalbe) {
        return "drag-filtered";
      }
    },
    //初始化表格拖拽功能
    initLeftTable() {
      new Sortable(this.leftTableDom, {
        swap: true, // Enable swap plugin
        swapClass: "drag-highlight", // The class applied to the hovered swap item
        animation: 150,
        handle: ".dragalbe",
        filter: ".drag-filtered",
        onMove: this.handleDragOnMove,
        onEnd: this.handleDragOnEnd,
      });
      new Sortable(this.rightTableDom, {
        swap: true, // Enable swap plugin
        swapClass: "drag-highlight", // The class applied to the hovered swap item
        animation: 150,
        handle: ".dragalbe",
        filter: ".drag-filtered",
        onMove: this.handleDragOnMove,
        onEnd: this.handleDragOnEnd,
      });
    },
    //固定当前行
    doFixed({row, column, cell, event}) {
      row.dragalbe = !row.dragalbe;
    },
    //处理所有单元格单击事件
    cellClickEvent(row, column, cell, event) {
      if (parseInt(column.columnIndex) === 4) this.doFixed({row, column, cell, event});
    },
    //点击上传按钮
    handleUploadClick(fileInputSideStr) {
      this.$refs[fileInputSideStr].value = null;
      this.$refs[fileInputSideStr].click();
    },
    //上传按钮回调
    handFileChange(refs, fileListSideStr) {
      let files = this.$refs[refs].files;
      for (const file of files) {
        this[fileListSideStr].push({
          title: file.name,
          size: file.size,
          dragalbe: true,
          FileObj: file,
          index: this[fileListSideStr].length + 1,
          sortIndex: this[fileListSideStr].length
        });
      }
      this.handleFileListTree()
    },
    handleFileListTree() {
      // if (this.fileListLeft.length && this.fileListRight) {
      //
      // }
    },
    // 元素拖拽结束，更改sortIndex
    handleDragOnEnd: function (/**Event*/ evt) {
      // var itemEl = evt.item; // dragged HTMLElement
      // evt.to; // target list
      // evt.from; // previous list
      // evt.oldIndex; // element's old index within old parent
      // evt.newIndex; // element's new index within new parent
      // evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
      // evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
      // evt.clone; // the clone element
      // evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
      console.log(evt);
      // let row = evt.related.querySelector("[data-index]");
      for (const item of this.fileListLeft) {
        let index = evt.item.querySelector('[data-index]').dataset.index;
        if (parseInt(item.index) === parseInt(index)) {
          item.sortIndex = evt.newIndex;
          break
        }
      }
      for (const item of this.fileListLeft) {
        let index = evt.swapItem.querySelector('[data-index]').dataset.index;
        if (parseInt(item.index) === parseInt(index)) {
          item.sortIndex = evt.oldIndex;
          break
        }
      }
    },
    // 在列表中或在列表之间移动项目时
    handleDragOnMove(/**Event*/ evt, /**Event*/ originalEvent) {
      // Example: https://jsbin.com/nawahef/edit?js,output
      // evt.dragged; // 被拖动的元素
      // evt.draggedRect; // DOMRect {left, top, right, bottom}
      // evt.related; // 将要被替换的元素
      // evt.relatedRect; // DOMRect
      // evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
      // originalEvent.clientY; // mouse position
      // return false; — for cancel
      // return -1; — insert before target
      // return 1; — insert after target
      // return true; — keep default insertion point based on the direction
      // return void; — keep default insertion point based on the direction
      let row = evt.related.querySelector("[data-index]");
      if (!row) return;
      for (const file of this.fileListLeft) {
        if (parseInt(file.index) === parseInt(row.dataset.index)) {
          //不可拖动
          return file.dragalbe;
        }
      }
    },
  },
  beforeMount() {
    // for (let i = 0; i < 10; i++) {
    //   this.fileListLeft.push({
    //     title: `文件${i}`,
    //     size: 3000 + i,
    //     dragalbe: true,
    //   });
    //   this.fileListRight.push({
    //     title: `文件${i}`,
    //     size: 3000 + i,
    //     dragalbe: true,
    //   });
    // }
  },
  mounted() {
    this.initLeftTable();
    window.fileListLeft = this.fileListLeft;
    window.leftFileInput = this.$refs.leftFileInput;
    window.vue = this;
  },
};
</script>

<style lang="scss">
.upload-dialog {
  .main-contain {
    display: flex;

    & > .el-container {
      width: 45.8333333333%;
    }

    & > .divider {
      width: 8.3333333333%;

      .el-divider {
        height: 100%;
      }
    }
  }

  .ding {
    transform: rotate(45deg);
  }

  .drag-highlight {
    background-color: #b7f8c7;
  }

  .drag-filtered {
    &:hover > td {
      background-color: #f7f7f7 !important;
    }

    background-color: #f7f7f7;

    .drag-icon {
      cursor: pointer;
    }
  }

  .drag-icon {
    width: 11.11px;
    height: 18.96px;
    cursor: grab;
  }

  .ding-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 13px 0;

    P {
      font-weight: 400;
    }
  }

  .table-main {
    padding: 0;
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

  .footer-btn-group {
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>
