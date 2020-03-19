<template>
  <div>
    <van-nav-bar
      :title="totalComments + '条评论'"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <van-skeleton
      title
      avatar
      :row="10"
      :loading="longLoading"
    >
    <!-- 长评论 -->
    <ul class="long-comments">
      <li class="comments-container" v-for="(item,i) in longComments" :key="item.id">
        <div class="pic">
          <img :src="item.avatar">
        </div>
        <div class="comments">
          <div class="name">{{item.author}}</div>
          <div class="content">{{item.content}}</div>
          <div class="replay" v-if="item.reply_to!=undefined && item.reply_to.author!=undefined">{{'// ' + item.reply_to.author + ' ： '+ item.reply_to.content}}</div>
          <div class="others">
            <div>{{item.time|timeFormat}}</div>
            <div class="icon-container" v-show="!item.favourState" @click="addFavour(i,0)">  <!--0 1 用来判断是长评论还是短评论 -->
              <div style="font-size: 0.9rem">{{item.likes}}</div>
              <van-icon name="good-job-o" />
            </div>
            <div class="icon-container" v-show="item.favourState" @click="removeFavour(i,0)">
              <div style="font-size: 0.9rem">{{item.likes + 1}}</div>
              <van-icon name="good-job" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    </van-skeleton>
    <!-- 短评论 -->
    <van-skeleton
      title
      avatar
      :row="10"
      :loading="shortLoading"
    >
    <ul>
      <li class="comments-container" v-for="(item,i) in shortComments" :key="item.id">
        <div class="pic">
          <img :src="item.avatar">
        </div>
        <div class="comments">
          <div class="name">{{item.author}}</div>
          <div class="content">{{item.content}}</div>
          <div class="replay" v-if=" item.reply_to!=undefined && item.reply_to.author!=undefined">{{'// ' + item.reply_to.author + ' ： '+ item.reply_to.content}}</div>
          <div class="others">
            <div>{{item.time|timeFormat}}</div>
            <div class="icon-container" v-show="!item.favourState" @click="addFavour(i,1)">
              <div style="font-size: 0.9rem">{{item.likes}}</div>
              <van-icon name="good-job-o" />
            </div>
            <div class="icon-container" v-show="item.favourState" @click="removeFavour(i,1)">
              <div style="font-size: 0.9rem">{{item.likes + 1}}</div>
              <van-icon name="good-job" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    </van-skeleton>
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
    //如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。
    //当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter
    //后添加的属性，是没有这个过程的，因为这个过程发生在data创建的时候
    return{
      id: this.$route.params.id,
      longComments:[],
      shortComments:[],
      longCommentsN:0,
      shortCommentsN:0,
      longLoading: true,
      shortLoading: true
    }
  },
  created(){
    this.getLongComments()
    this.getShortComments()
  },
  methods:{
    async getShortComments(){
      const res = await this.$http.get('/v1/contents/' + this.id + '/short-comments')
      let comments = res.data.COMMENTS.comments
      let length = comments.length
      for(let i = 0;i < length;i++){
        comments[i].favourState = false
      }
      this.shortComments = comments
      this.shortCommentsN = this.shortComments.length
      this.shortLoading = false
    },
    async getLongComments(){
      const res = await this.$http.get('/v1/contents/' + this.id + '/long-comments')
      let comments = res.data.COMMENTS.comments
      let length = comments.length
      for(let i = 0;i < length;i++){
        comments[i].favourState = false
      }
      this.longComments = comments
      this.longCommentsN = this.longComments.length
      this.longLoading = false
    },
    back(){
      this.$router.go(-1)
    },
    addFavour(i,commentType){
      if(commentType === 0){
        this.longComments[i].favourState = true
      }else{
        this.shortComments[i].favourState = true
      }
    },
    removeFavour(i,commentType){
      if(commentType === 0){
        this.longComments[i].favourState = false
      }else{
        this.shortComments[i].favourState = false
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    next()
  },
  computed: {
    totalComments(){
      return this.longCommentsN + this.shortCommentsN
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar{
  .van-icon{
    color: #646566;
  }
  .van-nav-bar__text{
    color: #646566;
  }
}
.comments-container{
  display: flex;
  font-size:0.9rem;
  padding:0.3rem;
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
    width: 100%;
    padding:0.3rem;
    .name{
      font-weight: 700;
      margin-bottom: 0.3rem;
    }
    .replay{
      padding-top:0.3rem;
      padding-bottom: 0.3rem;
      color:grey;
    }
    .others{
      width: 100%;
      display:flex;
      justify-content: space-between;
      align-items: center;
      color:grey;
    .icon-container{
      height: 2rem;
      width:2rem;
      display: flex;
      margin-right:1rem;
      justify-content: center;
      align-items: center;
      .van-icon{
        font-size: 1.2rem;
        transform: translateY(-0.1rem);
      }
    }
  }
 }
}
</style>