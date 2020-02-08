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
            <div>{{item.time}}</div>
            <div class="icon-container"><span>{{item.likes}}</span><img src='../assets/greygood.png'></div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 段评论 -->
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
            <div>{{item.time}}</div>
            <div class="icon-container"><span>{{item.likes}}</span><img src='../assets/greygood.png'></div>
          </div>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>
export default {
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
li ul{
  padding:0;
  margin:0;
  list-style:none;
  padding-inline-start: 0px;
}
.header-container{
  display:flex;
  width:58%;
  height: 40px;
  background-color: #ffffff;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #f8f8f8;
  justify-content: space-between;
  align-items: center;
  position:fixed;
  top:0;
  img{
    width:30px;
    height:30px;
  }
}
.long-comments{
  margin-top:40px;
}
.comments-container{
  display: flex;
  font-size:13px;
  padding:10px;
  width:100%;
  .pic {
    height: 32px;
    width:32px;
    border-radius: 50%;
    overflow: hidden;
    flex:none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .comments{
    padding:5px;
    width:100%;
    .name{
      font-weight: 600;
      margin-bottom: 5px;
    }
    .replay{
      padding-top:5px;
      padding-bottom: 5px;
      color:grey;
    }
    .others{
    display:flex;
    justify-content: space-between;
    color:grey;
    width:100%;
    .icon-container{
      height: 18px;
      width:18px;
      display: flex;
      margin-right:15px;
      img{
        margin-left: 5px;
        width: 100%;
        height: 100%;
      }
    }
  }
  }
}
</style>