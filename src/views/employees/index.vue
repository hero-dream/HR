<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before" />
        <span slot="after">
          <el-button type="primary" @click="showDialog=true">新增员工</el-button>
          <el-button type="success" @click="imoort">导入</el-button>
          <el-button type="info">导出</el-button>

        </span>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="userList">
          <el-table-column align="center" label="序号" width="70">
            <template slot-scope="{ $index }">{{ (page.page-1) *page.size +1 +$index }}</template>
          </el-table-column>
          <el-table-column align="center" label="头像" width="120">
            <template slot-scope="{row}">
              <img
                :src="row.staffPhoto "
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column align="center" prop="username" label="姓名" sortable="" />
          <el-table-column align="center" prop="mobile" label="手机号" sortable="" />
          <el-table-column align="center" prop="workNumber" label="工号" sortable="" />
          <el-table-column align="center" prop="formOfEmployment" label="聘用形式" sortable="" :formatter="formOfEmployment" />
          <el-table-column align="center" prop="departmentName" label="部门" sortable="" />
          <el-table-column align="center" prop="timeOfEntry" label="入职时间" :formatter="formOftimeOfEntry" sortable="" />
          <el-table-column align="center" label="账户状态" sortable="">

            <template slot-scope="{row}">
              <el-switch :value="row.enableState === 1" />
            </template>

          </el-table-column>

          <el-table-column align="center" label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${scope.row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole">角色</el-button>

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
        <!-- 组件 -->
        <Addemployee :show-dialog.sync="showDialog" :add-employee="getEmployeeList" />
        <AssignRole :assign-role.sync="assignRole" />
      </el-card>
    </div>
  </div>
</template>

<script>
import Addemployee from '@/views/employees/components/add-employee'
import { getEmployeeList, delEmployee } from '@/api/employees'
import Employees from '@/api/constant/employees'
import AssignRole from '@/views/employees/components/assign-role'

export default {
  components: { Addemployee, AssignRole },
  data() {
    return {
      showDialog: false,
      assignRole: false,
      userList: [], // 接收数据
      page: {
        page: 1,
        size: 9,
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
        await this.$confirm('您确定删除该员工吗')
        this.getEmployeeList() // 获取员工列表
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 聘用形式
    formOfEmployment(row, column, cellValue, index) {
      const obj = Employees.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 时间
    formOftimeOfEntry(row, column, cellValue, index) {
      // console.log(cellValue.split('T'))
      return cellValue.split('T')[0]
    },
    imoort() {
      this.$router.push('imoort')
    },
    // 编辑角色
    async editRole() {
      this.assignRole = true
    }

  }
}
</script>

<style>
.block{margin: 10px 0 0 0;}
</style>
