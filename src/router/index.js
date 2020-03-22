import VueRouter from 'vue-router'

const home = () => import('../views/Home.vue')
const content = () => import('../views/Content.vue')
const comment = () => import('../views/Comment.vue')
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path: '/home', component: home, name:'home' ,meta:{index: 0}},
    {path: '/home/newsinfo/:id',component: content ,name:'content',meta:{index: 1}},
    {path: '/home/newsinfo/comments/:id',component:comment, name:'comment',meta:{index: 2}}
  ]
})

// 把路由对象暴露出去
export default router
