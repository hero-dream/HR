// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
// import UploadExcel from '@/components/UploadExcel'
import ImageUpload from './ImageUpload'
import SettingView from './setting'
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('SettingView', SettingView) // 分配权限弹框
  }
}
