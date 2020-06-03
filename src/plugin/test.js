import LicensePlateKeyboard from './LicensePlateKeyboard.vue'
let test = {}
    // 方法的第一个参数是传入的Vue，第二个是自定义的插件参数
test.install = function(Vue, options) {
    // testPanel.name 组件的name属性
    console.log(options)
    Vue.component(LicensePlateKeyboard.name, LicensePlateKeyboard)
}

export default test