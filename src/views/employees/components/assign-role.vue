<template>
  <el-dialog title="角色管理" :visible="assignRole" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'

export default {
  props: {
    assignRole: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 回显数据
      roleIds: [] // 根据id获取当前角色
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    btnCancel() {
      this.$emit('update:assignRole', false) // 关闭
    },
    // 回显数据
    async getRoleList() {
      const data = await getRoleList()
      console.log(data)
      const { rows } = await getRoleList()
      this.list = rows
    },
    // 根据id获取角色对应的权限
    async   getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    }
    // // 点击确定发送请求
    // async    btnOk() {
    //   await assignRoles({ id: this.userId, roleIds: this.roleIds })
    //   this.$emit('update:assignRole', false) // 关闭
    // }
  }
}
</script>

<style>

</style>
