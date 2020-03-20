<template>
  <div id="app">
    <!-- <transition :name="transitionName">
      <keep-alive :include="['home','my-content']">
        <router-view></router-view>
      </keep-alive>
    </transition> -->
    <keep-alive :include="['home','my-content']">
      <router-view v-transition></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return {
          transitionName:''
      }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
	    //设置动画名称
        this.transitionName = 'fold-left';
      }else{
        this.transitionName = 'fold-right';
      }
    }
  }
}
</script>

<style lang="scss">
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .5s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .5s;
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .5s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .5s;
}

@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes fold-right-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
