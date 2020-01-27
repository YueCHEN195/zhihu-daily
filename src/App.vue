<template>
  <div class="app-container">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
</script>


<style lang="scss">
*{
    padding:0;
    margin:0;
 }
html body{
  background-color: #fff;
}
</style>
