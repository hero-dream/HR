<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部工具 -->
      <PageTools>
        <template slot="after">
          <el-button type="primary" @click="addPermissionList(1,'0')">新增权限</el-button>
        </template>
      </PageTools>
      <!-- 主要内容 -->
      <el-card>
        <el-table border :data="permissionList" row-key="id">
          <el-table-column label="权限名称" prop="name" width="160px" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="primary" icon="el-icon-edit" circle @click="updatePermission(row.id)" />
              <el-button v-if="row.type === 1" type="warning" icon="el-icon-plus" circle @click="addPermissionList(2, row.id)" />
              <el-button type="danger" icon="el-icon-delete" circle @click="delPermission(row.id)" />

            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog :visible="showDialog" :title="title" label-width="120" @close="btnCancel">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" placeholder="请输入权限名称" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" placeholder="请输入权限标识" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" placeholder="请输入权限描述" />
          </el-form-item>
          <el-form-item label="权限激活">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <!-- 尾部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          </el-col>
        </el-row>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermissionList, getPermissionDetail, updatePermission } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      showDialog: false,
      permissionList: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启

      }

    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑权限' : '添加权限'
    }
  },
  created() {
    this.getPermissionList() // 权限列表
  },
  methods: {
    // 获取结构
    async getPermissionList() {
      const data = await getPermissionList()
      // console.log(data)
      this.permissionList = tranListToTreeData(data, '0') // 0为pid
    },
    // 删除
    async delPermission(id) {
      try {
        const data = await delPermission(id)
        console.log(data)
        await this.$confirm('您确定删除该权限吗')
        this.$message.success('删除权限成功')
        this.getPermissionList()
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑
    async updatePermission(id) {
      const data = await getPermissionDetail(id)
      this.formData = data
      this.showDialog = true
      // console.log(data)
    },
    // 添加
    async addPermissionList(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    // 确定按钮
    async   btnOk() {
      let data
      if (this.formData.id) {
        data = await updatePermission(this.formData)
        this.$message.success('编辑成功')
      } else {
        data = await addPermissionList(this.formData)
        this.$message.success('添加成功')
      }
      console.log(data)

      this.formData = {}

      this.showDialog = false
      this.getPermissionList()
      // console.log(this.formData)
    },
    // 退出
    btnCancel() {
      this.showDialog = false
      this.formData = {}
    }
  }
}
</script>

<style>

</style>
