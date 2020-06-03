<template>
    <div class="keyboard-cell" v-if="keyboardShow">
        <div class="title-cell">
            <span class="btn-close" @click="closeKeyboard">{{plateValue.length == plateInfo.plateLen?'确定':'关闭'}}</span>
        </div>
        <!-- 简称 -->
        <div class="key-cell" v-if="keyBoardType == 1">
            <div class="key-row">
                <div class="key-item" v-for="(item,index) in abbBoard.rowOne" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <div class="key-row">
                <div class="key-item" v-for="(item,index) in abbBoard.rowTwo" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <div class="key-row">
                <div class="key-item" v-for="(item,index) in abbBoard.rowThree" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <div class="key-row">
                <div class="key-item" :class="{'big-item':index == 4 || index == 5}" v-for="(item,index) in abbBoard.rowFour" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
        </div>
        <!-- 数字字母 -->
        <div class="key-cell" v-else-if="keyBoardType == 2">
            <div class="key-row">
                <div class="key-item" v-for="(item,index) in letterBoard.rowNum" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <div class="key-row">
                <div class="key-item" :class="{'disabled':(item == 'O' || item=='I')}" v-for="(item,index) in letterBoard.rowA" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <div class="key-row">
                <div class="key-item" :class="{'disabled':(item == '字' && plateValue.length < plateInfo.plateLen-1)}" v-for="(item,index) in letterBoard.rowB" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <div class="key-row">
                <div class="key-item" v-for="(item,index) in letterBoard.rowC" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div>
            <!-- <div class="key-row"> this.plateValue.length == this.plateInfo.plateLen
                <div class="key-item" v-for="(item,index) in letterBoard.rowD" :key="index"  @click.stop="keyInput(item)">{{item}}</div>
            </div> -->
        </div>
        <!-- 删除按钮 -->
        <div class="btn-del" @click="delValue"></div>
        <!-- 字按键 -->
        <div class="letter-cell" v-if="letterShow">
            <div class="letter" v-for="(item,index) in letterBoard.rowD" :key="index" @click.stop="keyInput(item)">{{item}}</div>
        </div>
    </div>
</template>    
<script>
export default {
    name:'LicensePlateKeyboard',
    props:{
        keyboardShow:{
            type:Boolean,
            default(){
                return false;
            }
        },
        plateInfo:{
            type:Object,
            default(){
                return {
                    plateType:1,
                    plateArray:[],// 车牌号
                    plateLen:7
                };
            }
        }
    },
    data(){
        return {
            keyBoardType: 1, // 1-简称，2-数字/字母
            abbBoard: { // 简称
                rowOne: ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘'],
                rowTwo: ['皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘'],
                rowThree: ['晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏'],
                rowFour: ['川', '宁', '琼', '使', 'WJ', '民航']
            },
            letterBoard: { // 字母
                rowNum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                rowA: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                rowB: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '字'],
                rowC: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
                rowD: ['领', '警', '港', '澳', '学'],
            }, 
            plateValue:[],
            letterShow:false,
        }
    },
    watch:{
        plateInfo:{
            deep:true,
            handler(nv){
                console.log(nv)
                this.plateValue = nv.plateArray;
                if(this.plateValue.length>0){
                    this.keyBoardType = 2;
                }else{
                    this.keyBoardType = 1;
                }
            }
        }
    },
    created(){
        this.plateValue = this.plateInfo.plateArray;
        if(this.plateValue.length>0){
            this.keyBoardType = 2;
        }else{
            this.keyBoardType = 1;
        }
    },
    methods:{
        // 收起键盘
        closeKeyboard(){
            this.$emit("update:keyboardShow",false);
        },
        // 删除
        delValue(){
            this.letterShow = false;
            if(this.plateValue.length>0){
                if(this.plateValue[this.plateValue.length-1] == '航'){
                    this.plateValue.splice(this.plateValue.length-2,2);
                }else{
                    this.plateValue.splice(this.plateValue.length-1,1);
                }
                
            }

            if(this.plateValue.length>0){
                this.keyBoardType = 2;
            }else{
                this.keyBoardType = 1;
            }
        },
        // 输入
        keyInput(val){
            console.log(val);
            this.letterShow = false;
            if(val == 'I' || val == 'O'){
                console.log('车牌没有字母I和O');
                return;
            }
            if(this.plateValue.length == this.plateInfo.plateLen){
                console.log('已达车牌号长度');
                return;
            }
            if(val == '民航'){
                this.plateValue.push(val.split('')[0]);
                this.plateValue.push(val.split('')[1]);
            }else if(val == '字'){
                if(this.plateValue.length == this.plateInfo.plateLen-1){
                    this.letterShow = true;
                }

            }else{
                
                this.plateValue.push(val);
            }
            
            if(this.plateValue.length>0){
                this.keyBoardType = 2;
            }else{
                this.keyBoardType = 1;
            }

            this.$emit('plateInput',{
                plateValue:this.plateValue.join(''),
                plateValueArry:this.plateValue,
            })
            
        }
    }
}
</script>
<style lang="scss">
    @import '../style/param.scss';
    
    
    .keyboard-cell{
        background:$colorfff;
        border-top: 1px solid $borderColor;
        position: fixed;
        z-index: 1024;
        animation:keyPopup .5s;
        bottom: 0;
        right: 0;
        left: 0;
        .btn-del{
            width: 51px;
            height: 43px;
            background-image: url(../assets/icon/icon_delete.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            position: absolute;
            bottom: 6px;
            right: 2px;
            &:active{
                opacity: 0.6;
            }
        }
        .letter-cell{
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url(../assets/bg/bg_keyboard.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            position: absolute;
            padding: 6px 6px 14px;
            right:0;
            top:88px;
            .letter{
                    background:$colorfff;
                    width:32px;
                    height: 42px;
                    font-size:18px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:$color333;
                    line-height:42px;
                    text-align: center;
                    box-shadow:0px 1px 0px 0px rgba(134,137,142,1);
                    border-radius:5px;
                    margin-right: 6px;
                    &:last-child{
                        margin: 0;
                    }
                    &:active{
                        background: $borderColor;
                    }
            }
        }
        .title-cell{
            padding: 8px 17px;
            text-align: right;
            .btn-close{
                color:$mainColor;
                font-size: 14px;
            }
        }
        .key-cell{
            background: #CFD4DB;
            padding: 6px 0;
            .key-row{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 11px;
                &:last-child{
                    margin: 0;
                }
                .key-item{
                    background:$colorfff;
                    width:32px;
                    height: 42px;
                    font-size:18px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:$color333;
                    line-height:42px;
                    text-align: center;
                    box-shadow:0px 1px 0px 0px rgba(134,137,142,1);
                    border-radius:5px;
                    margin-right: 6px;
                    &:last-child{
                        margin: 0;
                    }
                    &:active{
                        background: $borderColor;
                    }
                }
                .big-item{
                    width: 48px;
                }
                .disabled{
                    color:$color999;
                    &:active{
                        background: $colorfff;
                    }
                }
            }
        }
    }
    @keyframes keyPopup{
        from {bottom:-600px;}
        to {left:0px;}
    }
</style>