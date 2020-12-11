<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组件架构
        <el-tree :data="myTree" :props="options" :default-expand-all="true" />
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myTree: [
        {
          label: '一级菜单',
          children: [
            { label: '二级菜单1' },
            {
              label: '二级菜单',

              children: [{
                label: '三级菜单'
              }]
            }]
        },
        { label: '一级菜单2' }
      ],
      options: {
        // 这一个是树形结构的描述
        // 对于一个属性结构来说, 每个节点都有两个重要的属性
        // 1. 当前节点名字段 如 mingzi
        // 2. 当前节点的下级菜单字段名 如 mySon
        // 这里这个配置就是为了告诉组件, 用哪个字段作为名称, 又用哪个字段作为子级菜单
        label: 'label',
        children: 'children'
      }
    }
  }
}
</script>

<style>

</style>
