<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before" />
        <span slot="after">
          <el-button type="success">导入</el-button>
          <el-button type="info">导出</el-button>
          <el-button type="primary">历史记录</el-button>
        </span>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="tableData">
          <el-table-column align="center" label="序号" type="index" sortable />
          <el-table-column align="center" label="姓名" sortable="" prop="name" />
          <el-table-column align="center" label="工号" sortable="" />
          <el-table-column align="center" label="聘用形式" sortable="" />
          <el-table-column align="center" label="部门" sortable="" />
          <el-table-column align="center" label="入职时间" prop="date" sortable="" />
          <el-table-column align="center" label="账户状态" sortable="" />
          <el-table-column align="center" label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="block">
          <el-pagination

            layout="total,prev, pager, next, jumper"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '陈小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '成小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '鲁小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style>
</style>
