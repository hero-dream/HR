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
        <el-table border :data="userList">

          <el-table-column align="center" label="序号" type="index" width="70" sortable />
          <el-table-column align="center" prop="username" label="姓名" sortable="" />
          <el-table-column align="center" prop="workNumber" label="工号" sortable="" />
          <el-table-column align="center" prop="formOfEmployment" label="聘用形式" sortable="" />
          <el-table-column align="center" prop="departmentName" label="部门" sortable="" />
          <el-table-column align="center" prop="timeOfEntry" label="入职时间" sortable="" />
          <el-table-column align="center" prop="enableState" label="账户状态" sortable="" />
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
            :page-size="page.size"
            :total="page.total"
            layout="total,prev, pager, next, jumper"
            @current-change="changePage"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import { getEmployeeList } from '@/api/employees'

export default {
  data() {
    return {
      userList: [], // 接收数据
      page: {
        page: 1,
        size: 7,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList() // 获取员工列表
  },
  methods: {

    async getEmployeeList() {
      const data = await getEmployeeList(this.page)
      const { rows, total } = await getEmployeeList(this.page)
      console.log(data)
      this.page.total = total
      this.userList = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList() // 重新获取员工列表
    }
  }
}
</script>

<style>
.block{margin: 10px 0 0 0;}
</style>
