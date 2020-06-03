<template>
  <div id="app">
    <div class="plate-cell">
        <div class="plate-type-cell">
            <span class="type-name">{{plateInfo.plateType == 1?'普通车牌':'新能源车牌'}}</span>
            <span class="type-chnage" @click="changePlateType">{{plateInfo.plateType == 1?'新能源车牌':'普通车牌'}}</span>
        </div>
        <div class="plate-input-cell" @click="keyboardShow=true">
          <div class="input-item" v-for="(item,index) in plateInfo.plateLen" :key="index">{{plateInfo.plateArray[index]}}</div>
        </div>
    </div>
    <LicensePlateKeyboard :keyboardShow.sync="keyboardShow" :plateInfo="plateInfo" @plateInput="handleInput"></LicensePlateKeyboard>
  </div>
</template>

<script>
// import LicensePlateKeyboard from './components/LicensePlateKeyboard.vue'

export default {
  name: 'App',
  // components: {
  //   LicensePlateKeyboard
  // },
  data(){
    return {
      keyboardShow:false,
      plateInfo:{
          plateType:1,// 1-普通车牌，2-新能源车牌
          plateArray:['鲁'],// 车牌号
          plateLen:7,// 普通车牌7位，新能源车牌8位
      },
    }
  },
  methods:{
    // 切换车牌类型
    changePlateType(){
      if(this.plateInfo.plateType == 1){
        this.plateInfo.plateType = 2;
        this.plateInfo.plateLen = 8;
      }else{
        this.plateInfo.plateType = 1;
        this.plateInfo.plateLen = 7;
      }
    },
    // 处理键盘输入
    handleInput(data){
      console.log(data);
      this.plateInfo.plateArray = data.plateValueArry;
    }
  }
}
</script>

<style lang="scss">
@import './style/param';
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:$color333;
  padding-top: 60px;
}
img {
  content: normal !important;
}

.plate-cell{
  padding: 0 24px;
  .plate-type-cell{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family:PingFangSC-Semibold,PingFang SC;
    line-height:16px;
    .type-name{
      flex: 1;
      font-size:14px;
      font-weight:600;
    }
    .type-chnage{
      font-size:12px;
      color:$mainColor;
      padding-left:20px ;
      background-image: url(./assets/icon/icon_switch.png);
      background-repeat: no-repeat;
      background-size: 14px 10px;
      background-position: left center;
    }
  }
  .plate-input-cell{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    .input-item{
      flex: 1;
      border:1px solid $borderColor;
      height:54px;
      line-height: 54px;
      text-align: center;
      font-size: 22px;
      border-right: 0;
      &:nth-child(2){
        margin-right: 11px;
        border-right: 1px solid $borderColor;
      }
      &:last-child{
        border-right: 1px solid $borderColor;
      }
    }
  }
}

</style>
