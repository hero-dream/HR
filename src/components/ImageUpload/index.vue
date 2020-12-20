<template>

  <el-upload
    action="#"
    list-type="picture-card"
    :class="{disabled: fileComputed }"
    :http-request="customUpload"
    :on-change="changeFile"
    :on-remove="handleRemove"
    :file-list="fileList"
  >
    <i class="el-icon-plus" />
  </el-upload>

</template>

<script>
export default {
  data() {
    return {
      fileList: [

      ]
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    handleRemove(file) {
      //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    customUpload(params) {
      console.log(params.file)
      // 拦截自动上传
    }

  }

}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
