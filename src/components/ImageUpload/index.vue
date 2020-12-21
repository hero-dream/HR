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
      :on-change="changeFile"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>

    <el-progress v-if=" showPercent" style="width: 180px" :percentage="percent" />
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
import { cloudConfig } from '@/private-confing'
const cos = new COS(cloudConfig)
export default {
  data() {
    return {
      fileList: [

      ], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      showPercent: false,
      imgUrl: '',
      percent: 0,
      currentFileUid: ''

    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },

  methods: {
    changeFile(file, fileList) {
      this.fileList = [...fileList]
    },
    // 预览
    preview(file) {
    // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
      // console.log(file, fileList)
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
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小不能超过5M')
        return false
      }
      // 记录id
      this.showPercent = true
      this.currentFileUid = file.uid
      return true
      // 如果上面都符合，不return是undefined，undefined为fales，所以需要return true
    },
    // 自定义拦截
    upload(params) {
      cos.putObject({
        Bucket: 'shan-1304560094', /* 必须 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: params.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          // 正在进行中的回调
          console.log(JSON.stringify(progressData))
          // 进度条
          this.percent = progressData.percent * 100
        }
      },
      (err, data) => {
        // 第二个参数是回调（无论成功或失败）
        console.log(err || data)
        if (!err && data.statusCode === 200) {
        //   //   此时说明文件上传成功  要获取成功的返回地址
        //   // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地
          this.fileList = this.fileList.map(item => {
          //     // 去找谁的uid等于刚刚记录下来的id
            if (item.uid === this.currentFileUid) {
              item.url = 'http://' + data.Location
              //       // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
              item.upload = true
            }
            return item
          })
          setTimeout(() => {
            this.showPercent = false // 隐藏进度条
            this.percent = 0 // 进度归0
          }, 2000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled
{::v-deep .el-upload--picture-card{
  display: none;
}}
.uploader {
::v-deep img{
  object-fit: cover
}}
</style>

