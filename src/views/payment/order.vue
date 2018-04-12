<template>
  <div class="order">
      <head-top goBack="true" headerTitle="订单信息" color="blue"></head-top>
      <section v-if="orderInfo.goodinfo">
          商品名称： {{orderInfo.goodinfo.name}}
      </section>
      <section>
          数量： {{orderInfo.goodNum}}
      </section>
      <section>
          配送方式： {{orderInfo.payway}}
      </section>
      <section>
          支付方式： {{orderInfo.songway}}
      </section>
      <section v-if="orderInfo.address">
          联系人： {{orderInfo.address.name}}  {{orderInfo.address.tel}} 
      </section>
      <section v-if="orderInfo.address">
          联系地址： {{orderInfo.address.city}}  {{orderInfo.address.area}} 
      </section>
  </div>
</template>

<script>
  import headTop from 'components/header/header'

  export default {
    name: "order",
    data() {
      return {

      };
    },
    components: {
        headTop
        },
    computed: {
        orderInfo() {
            return this.$store.state.submitInfo
        }
    },
    methods: {

    }
  };

</script>

<style lang="less" scoped>
.order{
    section{
        background: #ffffff;
        margin-bottom: 10px;
        padding: 10px;
    }
}

</style>

