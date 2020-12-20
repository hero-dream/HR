<template>
  <div>
    <el-upload
      class="uploader"
      action="#"
      :on-preview="preview"
      list-type="picture-card"
      :on-remove="handleRemove"
      :http-request="upload"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: ''

    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },

  methods: {
    // 预览
    preview(file) {
    // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
      console.log(file, fileList)
    },
    // 拦截
    upload(params) {
      console.log(params.file)
    },
    // 检查大小
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        // includes 返回布尔值
        this.$message.error('上传需要JPG,GIF,BMP,PNG图片格式')
        return false
      }
      // 检查大小
      const maxSize = 5
      if (maxSize < file.size) {
        this.$message.error('图片大小不能超过5M')
        return false
      }
      return true
      // 如果上面都符合，不return是undefined，undefined为fales，所以需要return true
    }

  }
}
</script>

<style lang="scss" scoped>
.disabled .el-upload--picture-card{
  display: none;
}
.uploader {
::v-deep img{
  object-fit: cover
}}
</style>

