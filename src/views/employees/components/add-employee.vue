<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <el-form label-width="160px" :rules="rules" :model="employeeData">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="employeeData.username" style="width:70%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="employeeData.mobile" style="width:70%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="employeeData.timeOfEntry" style="width:70%" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="employeeData.formOfEmployment" style="width:70%" placeholder="请选择">
          <el-option
            v-for="item in Employees.hireType"
            :key="item.id"
            :value="item.id"
            :label="item.value"
          />   </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="employeeData.workNumber" style="width:70%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="employeeData.departmentName" style="width:70%" placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="employeeData.correctionTime" style="width:70%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>

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
import Employees from '@/api/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Employees, // 枚举数据
      employeeData: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 2, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }],

        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号需要规范', trigger: 'blur' }],

        timeOfEntry: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }],

        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],

        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],

        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }, {
          pattern: /^\d{4}$/, message: '工号为4位数', trigger: 'blur'
        }],
        correctionTime: [{ required: true, message: '转正时间不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    btnCancel() {
    }
  }

}
</script>

<style>

</style>
