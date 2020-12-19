<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {

  methods: {
    async onSuccess({ header, results }) {
      console.log(header)
      console.log(results)
      // 创建枚举数据，字典 准备中英转换
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // 遍历数组
      const data = results.map(item => {
        return this.cnToEn(item, userRelations)
        // console.log(item)
      })
      await importEmployee(data)
      this.$message.success('导入员工成功')
      this.$router.push('employees')
      console.log(data)
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    // 遍历key值
    cnToEn(item, userRelations) {
      const newItem = {}
      for (const key in item) {
        const newKey = userRelations[key] // newKey是英文的 userRelations[key]是中文 这里为头部的
        let value = item[key] // 这是值的输入
        if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
          value = new Date(this.formatDate(value, '/'))
          console.log(value)
        }
        newItem[newKey] = value
      }
      return newItem
      // console.log(newItem)
    }

  }
}
</script>

<style>

</style>
