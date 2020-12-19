<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form label-width="120px" :model="formData" style="margin-left: 120px;  margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="newPassword">
                <el-input v-model="formData.newPassword" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            123
          </el-tab-pane>

          <el-tab-pane label="岗位信息">
            123456
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      formData: {
        username: '',
        newPassword: ''
      }
    }
  },
  created() { this.getUserDetailById() },
  methods: {
    async getUserDetailById() {
      const data = await getUserDetailById(this.userId)
      this.formData = await getUserDetailById(this.userId)
      console.log(data)
    },
    async saveUser() {
      const res = await saveUserDetailById({ ...this.formData, password: this.formData.newPassword })
      console.log(res)
      this.$message.success('保存成功')
    }
  }
}
</script>

<style>

</style>
