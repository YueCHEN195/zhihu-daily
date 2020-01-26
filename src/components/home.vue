<template>
  <div class="home-container">
  <!-- 顶部状态栏 -->
  <Header></Header>
    <!-- 轮播图 -->
    <mt-swipe :auto="6000">
      <mt-swipe-item v-for="item in topNews" :key="item.id" :style="{backgroundImage: 'url(' + item.image + ')',
        backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}">
        <router-link :to="'/home/newsinfo/' + item.id " tag="div" class="link">
        <div class="cover"
        :style="{backgroundImage: `linear-gradient(0,rgba(${item.rgb[0]},${item.rgb[1]},${item.rgb[2]},1),rgba(${item.rgb[0]},${item.rgb[1]},${item.rgb[2]},0.9),rgba(${item.rgb[0]},${item.rgb[1]},${item.rgb[2]},0))`}">
          <div class="author">
            {{item.hint}}
          </div>
          <div class="title">
            {{item.title}}
          </div>
        </div>
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 新闻列表 -->
    <ul v-infinite-scroll="loadmore"
        infinite-scroll-distance="10"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false">
      <router-link tag="li" v-for="item in otherNews" :key="item.id" class="news-list" :to="'/home/newsinfo/' + item.id ">
        <div class="list-word">
          <div class="list-title" id="list-word">{{item.title}}</div>
          <div class="list-author">{{item.hint}}</div>
        </div>
        <div class="list-img">
          <img :src="item.images[0]">
        </div>
      </router-link>
		</ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
import Header from '../components/subcoms/header.vue'
export default {
  components: {
    Header
  },
  data(){
    return {
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
        for(var item of this.topNews){
          item.rgb = this.hugToRgb(item.image_hue)
        }
        this.otherNews = this.otherNews.concat(res.body.stories)
        this.date = res.body.date
      }, err => {
        Toast({
          message: '努力加载中~',
          position: 'bottom'
        })
      })
    },
    getListByPage(){
      this.index = (parseInt(this.date) - this.page).toString()
      this.$http.get('/zhihu/4/news/before/' + this.index).then(res => {
        this.otherNews = this.otherNews.concat(res.body.stories)
      },err =>{
        Toast({
          message: '努力加载中~',
          position: 'bottom'
        })
      })
      this.loading = false
    },
    loadmore(){
      this.loading = true
      this.page++
      this.getListByPage()
    },
    hugToRgb(str){
      var one = str.substring(2,4)
        var two = str.substring(4,6)
        var three = str.substring(6,8)
        return[parseInt('0x' + one),parseInt('0x' + two),parseInt('0x' + three)]
    },
  }
}
</script>
<style lang="scss">
.home-container{
  padding-top: 3.5rem;
}
.mint-swipe{
  height:400px;
  .link{
    width: 100%;
    height: 100%;
    color:#fff;
    display: flex;
    flex-direction: column-reverse;
    .cover{    
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
    }
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