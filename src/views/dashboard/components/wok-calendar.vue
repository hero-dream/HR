<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px">
        <el-option v-for="item in yearlist" :key="item" :label="item" :value="item"> {{ item }}  </el-option>
      </el-select>
      <el-select v-model="currentMoth" size="small" style="width: 120px">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item"> {{ item }}  </el-option>
      </el-select>
    </el-row>
    <el-calendar />
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentYear: null, // 当前年份
      currentMoth: null, // 当前月份
      yearlist: []
    }
  },
  created() {
    this.currentMoth = this.startDate.getMonth() + 1 // 得出今年的 月份
    this.currentYear = this.startDate.getFullYear() // 得出今年的年份
    this.yearlist = Array.from(Array(100), (vlaue, index) => this.currentYear + index - 50)
  }

}
</script>
<style lang="scss" scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
