<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div class="before">
          <!-- 聚名插槽 -->
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <div class="after">
            <!-- 聚名插槽 -->
            <slot name="after" />
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
.page-tools{margin: 0  0 10px 0;}
</style>
