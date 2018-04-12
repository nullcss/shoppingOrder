<template>
  <div class="addAddress">
    <head-top goBack="true" headerTitle="编辑收货地址"></head-top>
        <section class="addressInfo">
        <div class="item fr">
            <div class="label">姓名：</div>
            <div class="input">
                <input type="text" placeholder="请填写姓名" v-model.trim="addressInfo.name">
            </div>
        </div>
        <div class="item fr">
            <div class="label">联系电话：</div>
            <div class="input" >
                <input type="text" placeholder="请填写电话" v-model.number="addressInfo.tel">
            </div>
        </div>
        <div class="item fr choosecity" @click="showarea=true">
            <div class="city fr">
                <div class="label">所在城市：</div>
                <div>{{city}}</div>
            </div>
            <span><i class="iconfont">&#xe7de;</i></span>
        </div>
        <div class="item fr">
            <div class="label">详细地址：</div>
            <div class="input areainfo">
                <input type="text" placeholder="请填写详细地址" v-model.trim="addressInfo.area">
            </div>
        </div>
        <div class="button" @click="submit">
            保存
        </div>
    </section>
    <transition name="fade">
        <div class="cover" v-if="showarea"></div>
    </transition>
    <transition name="slid_up">
        <div class="choosearea" v-if="showarea">
            <van-area :area-list="areaList" @confirm="save" @cancel="close"/>
        </div>
    </transition>
    <div class="delete" @click="delAddress">
        <span><i class="iconfont">&#xe663;</i></span>
    </div>
  </div>
</template>

<script>
    import areaList from '../../assets/area.js';
  import headTop from 'components/header/header';
  import { Area, Toast } from 'vant';

  export default {
    name: "adress",
    data() {
      return {
          areaList,
          showarea: false,
          city: ''
      };
    },
    components: {
      [Area.name]: Area,
         headTop
    },
    computed: {
        addressInfo() {
            let editaddress = this.$store.state.editaddress
            this.city = editaddress.city
            return editaddress
        }
    },
    methods: {
        save(data) {
            let a = data.every(item => item.code !== '-1');
            if(a){
                let arr = []
                data.forEach(item => {
                    arr.push(item.name)
                })
                this.city = arr.join(' ')
                this.showarea = false
            }else{
                Toast('请完善信息~');
            }
        },
        close() {
            this.showarea = false
        },
        submit() {
            this.addressInfo.city = this.city
            this.$store.commit("editAddress",this.addressInfo)
            this.$router.push('/choose')
        },
        delAddress() {
            this.$store.commit("delete",this.addressInfo)
            this.$router.animate = 2
            this.$router.push('/choose')
        }
    }
  };

</script>

<style lang="less" scoped>
.addAddress{
    height: 100vh;
}
.addressInfo{
    .item{
        background: #fff;
        font-size: 0.14rem;
        height: 0.6rem;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        padding:0 20px;
        .label{
            margin-right: 10px;
        }
        .areainfo{
            flex: 1;
        }
    }
    .choosecity{
        justify-content: space-between;
    }
}
  .cover{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 10;
    background: rgba(0, 0,0,.5)
  }
  .choosearea{
      width: 100vw;
      position: absolute;
      z-index:20;
      left: 0;
      bottom: 0;
  }
  .delete{
      position: absolute;
      bottom: 50px;
      left: 50%;
      margin-left: -0.24rem;
      span{
          display: block;
          width: 0.48rem;
          height: 0.48rem;
          background: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 0.48rem;
          box-shadow: 0 2px 2px rgba(0, 0,0,.1)
      }
  }
</style>

