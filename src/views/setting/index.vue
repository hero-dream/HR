<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button type="primary" class="btn">新增角色</el-button>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="180" />
              <el-table-column prop="name" label="姓名" width="180" />
              <el-table-column prop="address" label="地址" /> </el-table></el-tab-pane>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
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
