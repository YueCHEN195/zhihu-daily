import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import http from './http'
import {Icon,Toast,Swipe, SwipeItem, List, PullRefresh, Loading, Skeleton,Tabbar, TabbarItem,NavBar} from 'vant'

Vue.prototype.$http = http

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Loading)
Vue.use(Skeleton)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Icon)

Vue.use(VueRouter)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})