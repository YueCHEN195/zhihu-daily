import VueRouter from 'vue-router'
import home from '../components/home.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path: '/home', component: home}
  ]
})

// 把路由对象暴露出去
export default router
