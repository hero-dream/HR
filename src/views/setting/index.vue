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
                  <el-button size="small" type="success" @click="allocation(scope.row.id)">分配权限</el-button>
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
                <el-input v-model="companyFrom.name" disabled />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyFrom.companyAddress" disabled />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyFrom.mailbox" disabled />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyFrom.remarks" disabled type="textarea" resize="none" :rows="1" class="inputs" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog :title="titleLIst" :visible="showDialog" @close="btnCancel">
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

    <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
      <el-tree :data="permData" :props="{ label: 'name'}" :show-checkbox="true" />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnPermCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils/index'
import { mapGetters } from 'vuex'
import { getRoleList, delRole, getRoleDetail, updateRole, addRole, getCompanyInfo } from '@/api/setting'

export default {

  data() {
    return {
      permData: [],
      showPermDialog: false,
      showDialog: false,
      activeName: 'first',
      Rolelist: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 4,
        total: 0 // 记录总数
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '角色名称在2到10位' }],
        description: [{
          required: true, message: '角色描述不能为空', trigger: 'blur' },
        { min: 5, max: 50, message: '角色描述在5到50位'
        }]
      },
      roleForm: {
        name: '',
        description: ''
      },
      // 将公司信息存放
      companyFrom: {}
    }
  },
  computed: {
    ...mapGetters(['companyId']), // 解构
    titleLIst() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    } },
  // 监听
  watch: {
  // 数据发送变化时才会触发
  // 1.别的页面进来id不变
  // 2.当前页面刷新，id从无到有
  // immediate 立即
    companyId: {
      handler() {
        // companyId存在就调用
        if (this.companyId) {
          this.getCompanyInfo() // 公司信息
          console.log('请求公司数据')
        }
      },
      immediate: true
    }

  },
  created() {
    this.getRoleList() // 获取数据
    // this.getCompanyInfo() // 公司信息
  },
  methods: {
    async getRoleList() {
      const data = await getRoleList()
      console.log(data)
      const { rows, total } = await getRoleList(this.page) // this.page当前页面
      this.page.total = total
      this.Rolelist = rows
    },
    // 公司信息
    async getCompanyInfo() {
      try {
      // console.log(this.$store.getters.companyId) // 打印公司id
      // console.log(this.companyId)
      // 当前页面刷新，数据还没有回来，所以id为undefined
        const data = await getCompanyInfo(this.companyId)

        console.log(data)
        // 将公司信息存放
        this.companyFrom = data
      } catch (error) {
        console.log(error)
      }
    },
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
          // 根据Id来判断是新增还是编辑
          if (this.roleForm.id) {
            // 编辑
            await updateRole(this.roleForm)
            this.$message.success('修改成功')
          } else {
            // 新增判断
            await addRole(this.roleForm)
            this.$message.success('新增成功')
          }
          this.getRoleList() // 重新加载数据

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
    // 页码
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },

    async  btnCancel() {
      this.showDialog = false
      // 清空输入框的状态
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
    },
    // 分配权限
    async  allocation(id) {
      const data = await getPermissionList()
      console.log(data)
      this.permData = tranListToTreeData(data, '0')
      this.showPermDialog = true
    },
    btnPermCancel() {
      this.showPermDialog = false
    },
    btnPermOK() {
      this.showPermDialog = false
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

::v-deep .el-tabs__item {
  font-weight: 700;
  font-size: 18px;
}
</style>
