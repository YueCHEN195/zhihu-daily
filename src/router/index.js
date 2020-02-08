import VueRouter from 'vue-router'
import home from '../components/Home.vue'
import content from '../components/Content.vue'
import comment from '../components/Comment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path: '/home', component: home, meta:{ keepAlive: true} },
    {path: '/home/newsinfo/:id',component: content ,meta:{ keepAlive: true}},
    {path: '/home/newsinfo/comments/:id',component:comment }
  ]
})

// 把路由对象暴露出去
export default router
