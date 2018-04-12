<template>
  <div class="chooseAddress">
    <head-top goBack="true" headerTitle="选择收货地址" color="gray"></head-top>
    <section v-for="item in addressList" :key="item.id" class="addressList fr">
        <div class="choose" v-if="item.id == newaddress.id">
            <img src="../../assets/img/icon_jiesuan_mark.png" alt="">
        </div>
        <div class="addressInfo fc" @click="chooseAddress(item,$router)">
            <span>{{item.name}} {{item.tel}}</span>
            <span class="text">{{item.city}} {{item.area}}</span>
        </div>
        <div class="icon" @click="editAddress(item)"><i class="iconfont">&#xe685;</i></div>
    </section>
    <section class="add" @click="$router.push('/add')"><span>新建收货地址</span></section>
</div>
</template>

<script>
  import headTop from 'components/header/header'

  export default {
    name: "adress",
    data() {
      return {

      };
    },
    components: {
      headTop
    },
    computed: {
        addressList() {
            return this.$store.state.addressList
        },
        newaddress() {
            return this.$store.state.newaddress
        }
    },
    methods: {
        chooseAddress(item) {
            this.$store.commit('chooseAddress', item)
            this.$router.animate = 2
            this.$router.push('/')
        },
        editAddress(item) {
            this.$router.push('/edit')
            this.$store.commit('edit', item)
        }
    }
  };

</script>

<style lang="less" scoped>
.chooseAddress{
    width: 100%;
    height: 100vh;
    // background: #f4f4f4;
    .add{
        position: fixed;
        bottom: 0;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #fff;
        width: 100%;
        background-color: #3fd5bc;
        text-align: center;
    }
    .choose{
        position: absolute;
        top: 0;
        left: 0;
        img{
            max-width: 0.3rem;
        }
    }
}
.addressList{
    position: relative;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
    min-height: 0.7rem;
    padding: 0 20px;
    font-size: 0.14rem;
    .addressInfo{
        flex:1;
        .text{
            margin-top: 6px;
        }
    }
    .icon{
        width: 0.4rem;
        height: 100%;
        color: #999;
        .iconfont{
            font-size: 0.2rem;
        }
        text-align: right;
    }
}


</style>

