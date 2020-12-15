<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button type="primary" class="btn" @click="addRole">新增角色</el-button>
            <el-table :data="Rolelist" style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
            <div class="block">

              <el-pagination
                :page-size="page.pagesize"
                layout="total,prev, pager, next, jumper"
                :total="page.total"
                @current-change="changePage"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="80px">
              <el-form-item label="公司名称">
                <el-input disabled />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled />
              </el-form-item>
              <el-form-item label="备注">
                <el-input disabled type="textarea" resize="none" :rows="2" class="inputs" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="编辑弹层" :visible="showDialog">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delRole, getRoleDetail, updateRole } from '@/api/setting'
export default {
  data() {
    return {
      showDialog: false,
      activeName: 'first',
      Rolelist: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 3,
        total: 0 // 记录总数
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '角色名称在2到10位' }],
        description: [{
          required: true, message: '角色描述不能为空', trigger: 'blur' },
        { min: 10, max: 50, message: '角色描述在10到50位'
        }]
      },
      roleForm: {
        name: '',
        description: ''
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 删除
    async delRole(id) {
      try {
        await this.$confirm('确认删除该角色吗')
        // 只有点击了确定 才能进入到下方
        await delRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      const data = await getRoleDetail(id)
      this.roleForm = data
      this.showDialog = true
    },
    // 修改角色
    async btnOk() {
      try {
        const isValid = await this.$refs.roleForm.validate()
        if (isValid) {
          await updateRole(this.roleForm)
          this.$message.success('修改成功')
          this.showDialog = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 新增功能
    async addRole() {
      this.showDialog = true
    },
    async getRoleList() {
      const data = await getRoleList()
      console.log(data)
      const { rows, total } = await getRoleList(this.page) // this.page当前页面
      this.page.total = total
      this.Rolelist = rows
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },

    async  btnCancel() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 0 0 20px 0;
}
.el-input {
  width: 400px;
}
.inputs {
  width: 400px;
  resize: none;
}
.el-alert {
  margin: 10px 0 20px 0;
}
</style>
