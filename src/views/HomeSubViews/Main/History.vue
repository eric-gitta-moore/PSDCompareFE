<template>
  <el-container class="main-container">
    <el-header>
      <el-row>
        <el-col :span="2">
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
        <el-col :span="5">
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
        <el-col :span="2">
          <el-button type="primary" @click="clearAll">重置</el-button>
        </el-col>
        <el-button type="primary" @click="downLoadTaskByCheck" class="styleLoad"
        >下载
        </el-button
        >
      </el-row>
    </el-header>

    <el-main class="main">
      <el-table
          :data="tableData"
          style="width: 100%"
          lazy:true
          row-key="id"
          :tree-props="{ children: 'orders', hasChildren: 'hasChildren' }"
          @selection-change="handleSelectionChange"
          :header-row-style="{
          background: 'RGB(246,248,250)',
        }"
          :header-cell-style="{
          background: 'RGB(246,248,250)',
        }"
      >
        <el-table-column>
          <template slot-scope="scope">
            <el-checkbox
                v-if="scope.row.serialNumber === undefined"
                v-model="scope.row.checked"
                :indeterminate="scope.row.indeterminate"
                @change="taskGroupCheckId(scope.row)"
            >
            </el-checkbox>
            <el-checkbox v-else
                         v-model="scope.row.checked"
                         @change="childCheckAll(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
            prop="serialNumber"
            label="流水编号/任务ID"
            width="210"
        >
          <template slot-scope="scope">
            {{
              scope.row.serialNumber !== undefined
                  ? scope.row.serialNumber
                  : scope.row.id
            }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称" width="200">
          <template slot-scope="scope">
            {{
              scope.row.serialNumber !== undefined
                  ? scope.row.title
                  : scope.row.name
            }}
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="对比费用" width="150">
        </el-table-column>
        <el-table-column prop="status" label="支付状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status" class="dot"
            ><span class="blue-dot"></span>已支付</span
            >
            <span v-else class="dot"><span class="red-dot"></span>未支付</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="对比状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '未成功'" class="dot"
            ><span class="blue-dot"></span>已完成</span
            >
            <span v-else class="dot"><span class="red-dot"></span>未完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="支付结果" width="150">
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
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <div class="act">
              <svg-icon icon-class="show-eye"></svg-icon>
              <span style="cursor: pointer" @click="checkTask(scope.row)"
              >查看</span
              >
              <el-divider direction="vertical"></el-divider>
              <svg-icon icon-class="download"></svg-icon>
              <span style="cursor: pointer" @click="downLoadTask(scope.row)"
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
//引入对返回数据处理的方法
import TaskGroup from "../../../biz/Rbac/TaskGroup";
import DateHelper from "@/util/DateHelper";
import file from '../../../biz/Rbac/File'
import TaskGroupEntity from '@/entity/Rbac/TaskGroup';
import {turquoise} from "color-name";

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
    //查看该文件
    checkTask(row) {
      let query = {};
      query.taskId = row.taskId ? row.taskId : row.id;
      if (!(row instanceof TaskGroupEntity)) {
        query.compareId = row.id;
      }
      this.$router.push({
        name: "HomeCompareLeft",
        query
      });
      console.log(row);
    },
    //点击下载多个任务组
    downLoadTaskByCheck() {
      let IdsArr = this.taskGroupCheck()
      let urlString = file.getDownloadUrl(IdsArr);
       window.open(urlString)
    },
    freshTable() {
      let startT, endT;
      if (this.daterange) {
        startT = DateHelper.format(new Date(this.daterange[0]));
        endT = DateHelper.format(new Date(this.daterange[1]));
      }
      TaskGroup.getAll(this.currentPage, this.pageSize, this.searchText, startT, endT).then((res) => {
        console.log(res.records);
        this.total = res.total;
        res.records = res.records.map((e, index) => {
          e.orders = e.orders.map((ee, iindex) => {
            // checkOrders[index] = false;
            this.$set(ee, "checked", false);
            this.$set(ee, "index", iindex);
            this.$set(ee, "taskIndex", index);

            return ee;
          });
          e.orders = e.orders.filter((e) => e.id !== null);
          this.$set(e, "index", index);
          this.$set(e, "checked", false);
          this.$set(e, "indeterminate", false); //checkbox不确定状态
          return e;
        });
        this.tableData = res.records;
        console.log(this.tableData);
      });
    },
    //点击下载单个任务组
    downLoadTask(e) {
      let idArr = [];
      if (e instanceof TaskGroupEntity) {
        idArr = e.orders.map(ele => ele.id);
      } else {
        idArr = [e.id];
      }
      let urlString = file.getDownloadUrl(idArr);
      window.open(urlString)
    },
    //批量下载或删除任务组
    deleteTask() {
      let IdsArr = this.taskGroupCheck()
      TaskGroup.delTaskByIds(IdsArr);
      this.$message.success("删除成功");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    childCheckAll(row) {
      //遍历数组获取子复选框的状态
      let lengthOfTrueChecked = 0
      this.tableData[row.taskIndex].orders.forEach(e => {
        if (e.checked) {
          lengthOfTrueChecked++

        }
      })
      if (lengthOfTrueChecked === this.tableData[row.taskIndex].orders.length) {
        this.tableData[row.taskIndex].checked = true
        this.tableData[row.taskIndex].indeterminate = false
      } else if (lengthOfTrueChecked === 0) {
        this.tableData[row.taskIndex].indeterminate = false
        this.tableData[row.taskIndex].checked = false
      } else {
        this.tableData[row.taskIndex].indeterminate = true
        this.tableData[row.taskIndex].checked = false
      }
      console.log(lengthOfTrueChecked);
    },
    //遍历所有cheked属性实现下载功能
    taskGroupCheck()
    {   
      let GroupIdsArr =[]
      this.tableData.forEach(e=>{
            e.orders.forEach(e=>{
              if(e.checked) {
                GroupIdsArr.push(e.id)
            }
            })
      })
      return GroupIdsArr
    },
    taskGroupCheckId(row) {
      this.tableData[row.index].orders.forEach(element => {
        element.checked = row.checked
      });
      row.indeterminate = false
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
      IdsArr: [],
    };
  },
}
</script>

<style lang='scss' scoped>
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
    padding-top: 20px;
    background: white;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;

    .el-row {
      display: flex;
      justify-content: flex-start;
      position: relative;

      .styleLoad {
        position: absolute;
        right: 20px;
      }

      align-items: center;
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

  .main {
    background: white;

    .el-checkbox__inner {
      position: absolute;
      top: -5px;
      left: 8px;
    }
  }

  .el-table {
    padding: 0;

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
}
</style>
