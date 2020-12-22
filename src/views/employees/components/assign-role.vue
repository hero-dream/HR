<template>
  <el-dialog title="角色管理" :visible="assignRole" @close="btnCancel">
    <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
      {{ item.name }}
    </el-checkbox>

    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  props: {
    assignRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { list: [] }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    btnCancel() {
      this.$emit('update:assignRole', false) // 关闭
    },
    async   getRoleList() {
      const data = await getRoleList()
      console.log(data)
      const { rows } = await getRoleList()
      this.list = rows
    }
  }
}
</script>

<style>

</style>
