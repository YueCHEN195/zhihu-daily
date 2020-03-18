import Vue from 'vue'
import app from './App.vue'
import './style.scss'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'
import router from './router/index.js'
import Mint from 'mint-ui'
import http from './http'

Vue.prototype.$http = http

Vue.use(Mint)

Vue.use(VueRouter)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})