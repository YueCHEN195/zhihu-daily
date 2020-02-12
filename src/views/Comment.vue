<template>
  <div>
    <!-- header -->
    <header class="header-container">
      <img src = "../assets/arrow_left.png" @click="back">
      <h4 class="comment-amount">{{totalComments}}条评论</h4>
    </header>
    <!-- 长评论 -->
    <ul class="long-comments">
      <li class="comments-container" v-for="item in longComments" :key="item.id">
        <div class="pic">
          <img :src="item.avatar">
        </div>
        <div class="comments">
          <div class="name">{{item.author}}</div>
          <div class="content">{{item.content}}</div>
          <div class="replay" v-if="item.reply_to!=undefined && item.reply_to.author!=undefined">{{'// ' + item.reply_to.author + ' ： '+ item.reply_to.content}}</div>
          <div class="others">
            <div>{{item.time|timeFormat}}</div>
            <div class="icon-container"><span>{{item.likes}}</span><img src='../assets/greygood.png'></div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 短评论 -->
    <ul>
      <li class="comments-container" v-for="item in shortComments" :key="item.id">
        <div class="pic">
          <img :src="item.avatar">
        </div>
        <div class="comments">
          <div class="name">{{item.author}}</div>
          <div class="content">{{item.content}}</div>
          <div class="replay" v-if=" item.reply_to!=undefined &&  item.reply_to.author!=undefined">{{'// ' + item.reply_to.author + ' ： '+ item.reply_to.content}}</div>
          <div class="others">
            <div>{{item.time|timeFormat}}</div>
            <div class="icon-container"><span>{{item.likes}}</span><img src='../assets/greygood.png'></div>
          </div>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    timeFormat(val){
      return val = dayjs(val).format('MM-DD HH:mm')
    }
  },
  data(){
    return{
      id: this.$route.params.id,
      longComments:[],
      shortComments:[],
      totalComments: 0,
      longCommentsN:0,
      shortCommentsN:0
    }
  },
  created(){
    this.getLongComments()
  },
  methods:{
    getLongComments(){
      this.$http.get('/zhihu/4/story/' + this.id + '/long-comments').then(res => {
        this.longComments = res.body.comments
        return this.$http.get('/zhihu/4/story/' + this.id + '/short-comments')
      }).then(res => {
        this.shortComments = res.body.comments
        this.longCommentsN = this.longComments.length
        this.shortCommentsN = this.shortComments.length
        this.totalComments = this.longCommentsN + this.shortCommentsN
      })
    },
    back(){
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    next()
  },
}
</script>

<style lang="scss" scoped>
.header-container{
  width:100%;
  height: 3rem;
  display:flex;
  background-color: #ffffff;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #f8f8f8;
  align-items: center;
  position:fixed;
  top:0;
  .comment-amount{
    flex:0.9;
    text-align: center;
  }
  img{
    width:8%;
  }
}
.long-comments{
  margin-top:3.5rem;
}
.comments-container{
  display: flex;
  font-size:0.8rem;
  padding:0.5rem;
  width:100%;
  .pic {
    height: 2.3rem;
    width:2.3rem;
    border-radius: 50%;
    overflow: hidden;
    flex:none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .comments{
    padding:0.3rem;
    width:100%;
    .name{
      font-weight: 600;
      margin-bottom: 0.3rem;
    }
    .replay{
      padding-top:0.3rem;
      padding-bottom: 0.3rem;
      color:grey;
    }
    .others{
    display:flex;
    justify-content: space-between;
    color:grey;
    width:100%;
    .icon-container{
      height: 1rem;
      width:1rem;
      display: flex;
      margin-right:1rem;
      img{
        margin-left: 0.5rem;
        width: 100%;
        height: 100%;
      }
    }
  }
  }
}
</style>