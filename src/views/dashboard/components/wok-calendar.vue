<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearlist" :key="item" :label="item" :value="item"> {{ item }}  </el-option>
      </el-select>
      <el-select v-model="currentMoth" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item + '月' " :value="item"> {{ item }}  </el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="scope" class="content">
        {{ scope.data.day | getDay }}
        <span v-if="isRest(scope.date)" class="rest">休</span>
      </template>

    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(val) {
      const day = val.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }

  },
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
      currentDate: null,
      yearlist: []
    }
  },
  created() {
    this.currentMoth = this.startDate.getMonth() + 1 // 得出今年的 月份
    this.currentYear = this.startDate.getFullYear() // 得出今年的年份
    this.yearlist = Array.from(Array(100), (vlaue, index) => this.currentYear + index - 50)
  },
  methods: {
    dateChange() {
      // console.log('当前年份', this.currentYear)
      // console.log('当前月份', this.currentMoth)
      const year = this.currentYear
      const moth = this.currentMoth
      const data = `${year}-${moth}-1`
      // console.log(data)
      this.currentDate = new Date(data)
    },
    isRest(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }

}
</script>
<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height:  auto;
  text-align: center;
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
.rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  text-align: center;
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
