<template>
  <div id="app">
    <transition :name="animate">
        <router-view class="router"></router-view>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      choosedAddress: true,
      animate: ""
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      /*
                0: 不做动画
                1: 左切换
                2: 右切换
                 */
      let animate = this.$router.animate || to.meta.slide;
      if (!animate) {
        this.animate = "";
      } else {
        switch (animate) {
          case 1:
            this.animate = "slide-left";
            break;
          case 2:
            this.animate = "slide-right";
            break;
          default:
            this.animate = "";
            break;
        }
      }
      this.$router.animate = 0;
    }
  }
};
</script>

<style  lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
.router{
   position: absolute;
     width: 100%;
     top: 0;
}

// 切换动画  右侧切入
.slide-right-enter-active {
  transition: all 0.3s ease;
}

.slide-right-enter {
  transform: translate(-100%, 0);
  opacity: 0;
}

.slide-right-leave-active {
  transform: translate(100%, 0);
  transition: all 0.3s ease;
}

//返回时 左侧切入
.slide-left-enter-active {
  transition: all 0.3s ease;
}

.slide-left-enter {
  transform: translate(100%, 0);
  opacity: 0;
}

.slide-left-leave-active {
  transform: translate(-100%, 0);
  transition: all 0.3s ease;
}
</style>

