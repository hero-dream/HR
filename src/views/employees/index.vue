<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before" />
        <span slot="after">
          <el-button type="primary">新增员工</el-button>
          <el-button type="success">导入</el-button>
          <el-button type="info">导出</el-button>

        </span>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="userList">
          <el-table-column align="center" label="序号" width="70">
            <template slot-scope="{ $index }">{{ (page.page-1) *page.size +1 +$index }}</template>
          </el-table-column>
          <!-- <el-table-column align="center" type="index" label="序号" sortable="" /> -->
          <el-table-column align="center" prop="username" label="姓名" sortable="" />
          <el-table-column align="center" prop="workNumber" label="工号" sortable="" />
          <el-table-column align="center" prop="formOfEmployment" label="聘用形式" sortable="" :formatter="formatter" />
          <el-table-column align="center" prop="departmentName" label="部门" sortable="" />
          <el-table-column align="center" prop="timeOfEntry" label="入职时间" sortable="" />
          <el-table-column align="center" prop="enableState" label="账户状态" sortable="" />
          <el-table-column align="center" label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>

              <el-button type="text" size="small" @click="delEmployee(scope.row.id)">删除</el-button>
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

import { getEmployeeList, delEmployee } from '@/api/employees'
import Employees from '@/api/constant/employees'

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
    },
    async delEmployee(id) {
      try {
        const data = await delEmployee(id)
        console.log(data)
        this.getEmployeeList() // 获取员工列表
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    formatter(row, column, cellValue, index) {
      const obj = Employees.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>
.block{margin: 10px 0 0 0;}
</style>
