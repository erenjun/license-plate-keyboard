##插件安装

```
npm install license-plate-keyboard

```
##插件使用

```
import Vue form 'Vue'
import LicensePlateKeyboard from 'license-plate-keyboard'
Vue.use(LicensePlateKeyboard)

```
##基本用法
```
<LicensePlateKeyboard :keyboardShow.sync="keyboardShow" :plateInfo="plateInfo" @plateInput="handleInput"></LicensePlateKeyboard>

```
##参数说明
```
keyboardShow: Boolean 是否显示键盘 默认值 false
plateInfo: Object 车牌信息 默认值 {
                                    plateType:1,// 车牌类型 1-普通车牌 2-新能源车牌
                                    plateArray:[],// 车牌号 数组
                                    plateLen:7// 车牌长度
                                 }
plateInput：function 键盘输入返回 
```
##效果展示
```
<img src="https://raw.githubusercontent.com/erenjun/license-plate-keyboard/master/src/assets/1591319859.jpg">
```
