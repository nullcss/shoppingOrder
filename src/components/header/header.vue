<template>
  <header id="header" :class="color">
    <section class="header_goback " v-if="goBack"  @click="back($router)">
      <i class="iconfont">&#xe610;</i>
    </section>
    <section class="header_title">
      <span>{{headerTitle}}</span>
    </section>
    
  </header>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    props: ['goBack','headerTitle', 'color']
  };

</script>
<style lang="less" scoped>
  #header {
      width: 100%;
      height: 0.5rem;
      position: relative;
      line-height: 0.5rem;
      padding: 0 20px;
      .header_goback{
        font-size: 0.14rem;
      }
      .header_title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
  }
  .blue{
    background-color: #3fd5bc;
    color: #fff;
  }
  .gray{
    background-color: #eee;
    border-bottom:1px solid #f5f5f5;
  }



</style>

