<template>
  <el-container class="main-container">
    <el-header>
      <el-row>
        <el-col :span="1">
          <span>关键词：</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入内容"
            v-model="searchText"
            @change="freshTable"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span>日期范围：</span>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="freshTable"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="clearAll">重置</el-button>
        </el-col>
        <el-button type="primary" @click="downLoadTaskByCheck">下载</el-button>
      </el-row>
    </el-header>
    <el-main class="main">
      <el-table
        :data="tableData"
        style="width: 100%"
        lazy:true
        row-key="id"
        :tree-props="{ children: 'orders' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column>
          <template slot-scope="scope">
            <el-checkbox
              @change="GetIdsByCheck(scope.row.id)"
              :checked="false"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="serialNumber" label="流水编号" width="210">
        </el-table-column>
        <el-table-column
          prop="title"
          label="对比文件"
          width="200"
        ></el-table-column>
        <el-table-column prop="fee" label="支付费用" width="200">
        </el-table-column>
        <el-table-column prop="status" label="支付状态" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status" class="dot"
              ><span class="blue-dot"></span>已支付</span
            >
            <span v-else class="dot"><span class="red-dot"></span>未支付</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="支付状态" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '未成功'" class="dot"
              ><span class="blue-dot"></span>已完成</span
            >
            <span v-else class="dot"><span class="red-dot"></span>未完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="支付结果" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '未成功'" style="color: #67c23a"
              >成功</span
            >
            <span v-else style="color: #f56760">错误</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="act">
              <svg-icon icon-class="show-eye"></svg-icon>
              <span @click="checkTask(scope.row.id)">查看</span>
              <el-divider direction="vertical"></el-divider>
              <svg-icon icon-class="download"></svg-icon>
              <span @click="downLoadTask(scope.row.id)">下载</span>
              <el-divider direction="vertical"></el-divider>
              <svg-icon icon-class="bin"></svg-icon>
              <span @click="deleteTask(scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-row class="pagination">
        <el-col :span="24">
          <el-pagination
            :page-sizes="pageSizes"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="freshTable"
            @size-change="freshTable"
            :current-page.sync="currentPage"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
//引入下载文件的方法
import DownloadHelper from "../../../util/DownloadHelper";
//引入对返回数据处理的方法
import TaskGroup from "../../../biz/Rbac/TaskGroup";
//引入删除数据和下载任务组的方法
export default {
  name: "History",
  components: {},
  computed: {},
  methods: {
    clearAll() {
      this.searchText = "";
      this.daterange = "";
      this.freshTable();
    },
    handleEdit(index, row) {
      console.log(index, row);
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
    downLoadTaskByCheck() {},
    freshTable() {
      let startT, endT;
      if (this.daterange) {
        startT = this.formatDatetime(this.daterange[0]);
        endT = this.formatDatetime(this.daterange[1]);
      }
      TaskGroup.getAll(1).then((res) => {
        this.tableData = res.records;
        console.log(this.tableData);
      });
    },
    //点击下载单个或者多个任务组
    downLoadTask(row) {
      DownloadHelper.downloadByAnchorTag({});
      console.log(row);
    },
    deleteTask(Ids) {
      let IdsArr = [1, 2, 3];
      //获得勾选的id.
      TaskGroup.deleteTaskByIds(IdsArr);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    GetIdsByCheck(IsChecked) {
      console.log("ddddddddddddddddddddddddddddddd", IsChecked);
    },
  },
  mounted() {
    this.freshTable();
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      daterange: "",
      searchText: "",
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      total: 100,
      currentPage: 1,
      tableData: [],
    };
  },
};
</script>

<style lang='scss' >
$radius: 4px;
.gray {
  color: #a8a8aa;
}
.main-container {
  height: 100%;

  padding: 18px;
  box-sizing: border-box;
  background: #f1f5f9;
  .el-header {
    background: white;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;

    .el-col {
      display: flex;
      justify-content: space-between;
    }

    .main {
      background: white;
      .el-table {
        // position: absolute;
        .el-checkbox__inner {
          position: absolute;
          top: 12px;
          left: -20px;
        }
      }
    }
    .el-table {
      padding: 0 17px;
      .act {
        display: flex;
        align-items: center;
        line-height: 100%;
        .svg-icon {
          width: 1.3em;
          height: 1.3em;
        }
      }
    }
  }
}
.main {
  background: white;

  .el-checkbox__inner {
    position: absolute;
    top: -5px;
    left: 8px;
  }
}
.el-table {
  padding: 0 17px;
  .act {
    display: flex;
    align-items: center;
    line-height: 100%;
    .svg-icon {
      width: 1.3em;
      height: 1.3em;
    }
  }
}

.dot {
  position: relative;
  .red-dot,
  .blue-dot {
    position: absolute;
    top: 50%;
    left: -20%;
    width: 5px;
    height: 5px;
    display: inline-block;
    border-radius: 50%;
    transform: translateY(-25%);
  }
  .red-dot {
    background: #f56760;
  }
  .blue-dot {
    background: #347eff;
  }
}
.el-footer {
  background: white;
  border-bottom-left-radius: $radius;
  border-bottom-right-radius: $radius;
  .pagination {
    .el-col {
      text-align: right;
    }
  }
}
</style>
