<template>
  <div class="home-container">
  <!-- 顶部状态栏 -->
    <header class="header-box">
      <div class="title">
        <div class="date-box">
          <span class="date">{{ day }}</span>
          <span class="month">{{ month }}</span>
        </div>
        <h3>{{msg}}</h3>
      </div>
      <div class="pic">
        <a><img src="https://pic4.zhimg.com/v2-3a8a6d4d765918bf8e873f8bb08f7416_is.jpg"></a>
      </div>
    </header>
    <!-- 轮播图 -->
    <mt-swipe :auto="6000">
      <mt-swipe-item v-for="item in topNews" :key="item.id" :style="{backgroundImage: 'url(' + item.image + ')',
        backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}">
        <router-link :to="'/home/newsinfo/ ' + item.id " tag="div" class="link">
        <div class="author">
          {{item.hint}}
        </div>
        <div class="title">
          {{item.title}}
        </div>
        </router-link>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 新闻列表 -->
    <ul v-infinite-scroll="loadmore"
        infinite-scroll-distance="50"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false">
      <li v-for="item in otherNews" :key="item.id" class="news-list">
        <div class="list-word">
          <div class="list-title">{{item.title}}</div>
          <div class="list-author">{{item.hint}}</div>
        </div>
        <div class="list-img">
          <img :src="item.images[0]">
        </div>
      </li>
		</ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
export default {
  data(){
    return {
      msg: '晚上好，喵~',
      month: '一月',
      day:'25',
      topNews: [],
      otherNews:[],
      date: '',
      page: 0,
      index: '',
      loading: false,
      loadTexing: '正在努力加载~~'
    }
  },
  created(){
    this.getLastNews()
  },
  methods: {
    getLastNews(){
      this.$http.get('/zhihu/4/news/latest').then(res => {
        this.topNews = res.body.top_stories
        this.otherNews = this.otherNews.concat(res.body.stories)
        this.date = res.body.date
      }, err => {
        Toast({
          message: '页面加载失败',
          position: 'bottom'
        })
      })
    },
    getListByPage(){
      this.index = (parseInt(this.date) - this.page).toString()
      this.$http.get('/zhihu/4/news/before/' + this.index).then(res => {
        console.log(res.body)
        this.otherNews = this.otherNews.concat(res.body.stories)
      },err =>{
        Toast({
          message: '再怎么加载都没有拉~~',
          position: 'bottom'
        })
      })
      this.loading = false
    },
    loadmore(){
      this.loading = true
      this.page++
      this.getListByPage()
    }
  }
}
</script>
<style lang="scss">
.home-container{
  padding-top: 3.5rem;
}
.header-box{
  position: fixed;
  top:0;
  left:0;
  z-index:20;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 0 0.2rem;
  width: 100%;
  height: 3.5rem;
  background: #fff;
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .date-box {
      display: flex;
      flex-direction: column;
      padding: 0 0.5rem;
      align-items: center;
      border-right: 1px solid #aaa;
      span{
        display: block;
      }
    }
    h3{
      margin-left: 0.5rem;
    }
  }
  .pic {
    margin: 3px;
    width: 50px;
    height: 50px;
    display: inline-block;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    background-clip: padding-box;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mint-swipe{
  height:400px;
  .link{
    width: 100%;
    height: 100%;
    color:#fff;
    display: flex;
    flex-direction: column-reverse;
    .author{
      margin:10px;
      font-size:13px;
      opacity: 0.8;
    }
    .title{
      margin:10px;
      font-weight: 600;
      font-size: 20px;
    }
  }
  .mint-swipe-indicators{
    left: 80%;
    -webkit-transform: translateX(-5%);
    transform: translateX(-5%);
    .mint-swipe-indicator{
      width:6px;
      height:6px;
      opacity: 0.8;
      background-color: #aaa;
    }
    .is-active{
      background-color: #fff;
      opacity: 1;
    }
  }
}
ul,li{ 
    padding:0;
    margin:0;
    list-style:none;
}
.news-list {
  height: 100px;
  display: flex;
  justify-content: space-between;
  .list-img {
    padding:5px;
  }
  .list-word {
    margin: 10px;
    .list-title {
      margin:5px;
      font-weight: 600;
      font-size:15px;
    }
    .list-author {
      margin:5px;
      font-size:10px;
      color:gray;
    }
  }
  img {
    height:80px;
    width:80px;
  }
}
</style>