<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <!-- 头部只显示添加子部门的选项 -->
          <TreeTools :data="company" :is-root="true" />
        </el-row>
        <hr>
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <TreeTools slot-scope="{data}" :data="data" />
        </el-tree>
      </el-card>

    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getTments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'

export default {
  components: { TreeTools },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name', // 表示 从这个属性显示内容
        children: 'children'
      },
      company: {}
    }
  }, created() {
    getTments().then(res => {
      console.log(res)
      // 头部
      this.company = {
        name: res.companyName,
        manager: '负责人'
      }
      this.departs = tranListToTreeData(res.depts, '')
    })
  }

}
</script>

<style>
.tree-card {

  padding: 30px  140px;
  font-size:14px;
}
</style>
