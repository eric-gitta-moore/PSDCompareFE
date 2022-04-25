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
          <el-button type="primary">
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
              <el-table-column type="selection" width="10" :border="false"> </el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-image
                    style="width: 100%; height: 300px"
                    :src="props.row.url"
                    :preview-src-list="props.row.srcList"
                  >
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                label="流水帐号"
                prop="serialNumber"
                width="110"
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
                width="120"
              ></el-table-column>
              <el-table-column
                label="对比状态"
                prop="`已完成`"
                width="120"
              ></el-table-column>
              <el-table-column
                label="对比结果"
                prop="result"
                width="120"
              ></el-table-column>
              <el-table-column
                label="时间"
                prop="createTime"
                width="150"
              ></el-table-column>
              <el-table-column label="操作" prop="operation" width="297">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                  <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)"
                    >下载</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="流水帐号" width="140"></el-table-column>
        <el-table-column label="名称" prop="name" width="120"></el-table-column>
        <el-table-column label="对比费用" width="100"></el-table-column>
        <el-table-column
          label="支付状态"
          prop="payState"
          width="120"
        ></el-table-column>
        <el-table-column
          label="对比状态"
          prop="contrastState"
          width="120"
        ></el-table-column>
        <el-table-column
          label="对比结果"
          prop="contrastResult"
          width="120"
        ></el-table-column>
        <el-table-column
          label="时间"
          prop="createTime"
          width="150"
        ></el-table-column>
        <el-table-column label="操作" prop="operation" width="297">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >下载</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
import getGroups from "../../../biz/Rbac/TaskGroup.js";
export default {
  name: "HomeCompareUp",
  data() {
    return {
      multipleSelection: [],
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
      // console.log("数据懒加载",row,expandedRows);
      console.log("懒加载数据");
      // row.list.push(
      //   {
      //     id: "002",
      //     name: "王安宇",
      //     payState: "已支付",
      //     contrastState: "已完成",
      //     contrastResult: "已完成",
      //     time: "2012-09-24",
      //     url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //     srcList: [
      //       "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //     ],
      //   },
      //   {
      //     id: "003",
      //     name: "庞玉艳",
      //     // money:100,
      //     payState: "已支付",
      //     contrastState: "已完成",
      //     contrastResult: "已完成",
      //     time: "2012-10-24",
      //     url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //     srcList: [
      //       "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //     ],
      //   }
      // );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
    },
  },
  mounted() {
    console.log("挂载了一个页面");
    getGroups(1).then((res) => {
      console.log("响应成功返回的是：", res);
      this.tableData = res.records;
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
      .el-checkbox__inner{
        position: absolute;
        top:-9px;
        left: -2px  ;
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



