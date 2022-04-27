<template>
  <el-container class="main-container-main">
    <el-header width="0">
      <el-col :span="5">
        <span class="left">对比记录</span>
        <div class="right">
          <svg-icon icon-class="show-eye" @click="changeLayout()"></svg-icon>
          <svg-icon icon-class="add" @click="openUploadDialog()"></svg-icon>
        </div>
      </el-col>
      <el-col :span="19"> 
        <div class="right">
          <el-button type="primary" @click="downLoad">
            <svg-icon icon-class="show-eye" @click="changeLayout()"></svg-icon>
            下载
          </el-button>
        </div>
      </el-col>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%" @expand-change="load">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.orders"
              style="width: 100%"
              :show-header="false"
              @expand-change="load"
              @selection-change="handleSelectionChange"
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
                width="210"
              ></el-table-column>
              <el-table-column
                label="名称"
                prop="title"
                width="120"
              ></el-table-column>
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
                prop="`已完成`"
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
                width="240"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="流水帐号" width="240"></el-table-column>
        <el-table-column label="名称" prop="name" width="120"></el-table-column>
        <el-table-column label="对比费用" width="150"></el-table-column>
        <el-table-column
          label="支付状态"
          prop="payState"
          width="150"
        ></el-table-column>
        <el-table-column
          label="对比状态"
          prop="contrastState"
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
          width="240"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import taskGroup from "../../../biz/Rbac/TaskGroup.js";

export default {
  name: "HomeCompareUp",
  data() {
    return {
      multipleSelection: [],
      srcList: [],
      tableData: [],
      pagination: {
        total: 220,
      },
    };
  },
  methods: {
    changeLayout() {
      console.log("打开左右布局");
      this.$router.push({ name: "HomeCompareLeft" });
    },
    load(row, expandedRows) {
      console.log("懒加载数据");
    },
    // 分页
    handleCurrentChange(val) {
      taskGroup.getGroups(`${val}`).then((res) => {
        this.tableData = res.records;
      });
      console.log(`当前页: ${val}`);
    },
    // 勾选框
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
    },
    loadImg(val) {
      this.srcList = [];
      console.log("加载了图片", val);
      this.srcList.push(val);
    },
    downLoad(){
      
    },
  },
  mounted() {
    console.log("挂载了一个页面");
    taskGroup.getGroups(1).then((res) => {
      console.log("响应成功返回的是：", res);
      console.log("COMPARE",res.records);
      this.tableData = res.records;
      this.pagination.total = res.total;
    });
  },
};
</script>

<style lang="scss">
.main-container-main {
  height: 100%;
  width: 100%;
  align-items: stretch;
  padding: 18px;
  box-sizing: border-box;
  background: #f1f5f9;
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
  .el-header,
  .el-main {
    background: #fff;
    text-align: left;
    padding: 0px 20px;
    & > .el-table {
      height: 500px;
      overflow: auto;
      overflow-x: hidden;
      .el-checkbox__inner {
        position: absolute;
        top: -9px;
        left: -2px;
      }
      &:before {
        width: 0px;
      }
      div {
        overflow: hidden;
      }
    }
  }
  .el-header {
    font-size: 16px;
    .el-col {
      height: 60px;
      line-height: 60px;
    }
  }
  .right {
    float: right;
  }
  .left {
    float: left;
  }
  .el-table__expanded-cell {
    padding: 0 0px 0px 20px;
  }
}
</style>



