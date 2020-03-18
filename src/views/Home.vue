<template>
  <div class="home-container">
  <!-- 顶部状态栏 -->
  <Header></Header>
    <!-- 轮播图 -->
    <mt-swipe :auto="5000">
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
        infinite-scroll-immediate-check="fasle">
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
import Header from '../components/Header.vue'
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
      loadTexing: '正在努力加载~~',
      toastMsg: { message: '努力加载中~', position: 'bottom' }
    }
  },
  created(){
    this.getLastNews()
  },
  activated(){
      this.loading = false
    },
    deactivated() {
      this.loading = true
    },
  methods: {
    getLastNews(){
      this.$http.get('/v1/last-stories').then(res => {
        this.topNews = res.data.STORIES.top_stories
        for(let item of this.topNews){
          item.rgb = this.hugToRgb(item.image_hue)
        }
        this.otherNews = this.otherNews.concat(res.data.STORIES.stories)
        this.date = res.data.STORIES.date
        return this.$http.get('/v1/before-stories/' + this.date)
      }, err => {
        console.log(err)
        Toast(this.toastMsg)
      }).then(res => {
        this.otherNews = this.otherNews.concat(res.data.STORIES.stories)  //继续往前加载一次防止消息不能占满屏幕无法触发滚动
      },err => {
        Toast(this.toastMsg)
      })
    },
    getListByPage(){
      this.index = this.reduceDate(this.date,this.page)
      this.$http.get('/v1/before-stories/' + this.index).then(res => {
        this.otherNews = this.otherNews.concat(res.data.STORIES.stories)
      },err =>{
        Toast(this.toastMsg)
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
    reduceDate(datestr,page){
      datestr = datestr.substring(0,4) + '-' + datestr.substring(4,6) + '-' + datestr.substring(6,8)
      var d = new Date(datestr)
      d.setDate(d.getDate()-page)
      var month = (d.getMonth() + 1).toString().padStart(2,'0')
      var year = (d.getFullYear()).toString()
      var day = (d.getDate()).toString().padStart(2,'0')
      return year + month + day        //注意 getMonth 这些返回的都是整数而不是字符串
    }
  }
}
</script>
<style lang="scss">
.home-container{
  padding-top: 3.5rem;
}
.mint-swipe{
  height:26rem;
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
      margin:0.7692rem;
      font-size:1rem;
      opacity: 0.8;
    }
    .title{
      line-height: 1.4rem;
      margin:0.7692rem;
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
  .mint-swipe-indicators{
    left: 80%;
    -webkit-transform: translateX(-5%);
    transform: translateX(-5%);
    .mint-swipe-indicator{
      width:0.4615rem;
      height:0.4615rem;
      opacity: 0.8;
      background-color: #aaa;
    }
    .is-active{
      background-color: #fff;
      opacity: 1;
    }
  }
}
.news-list {
  height: 6rem;
  display: flex;
  justify-content: space-between;
  .list-img {
    padding:0.3846rem;
  }
  .list-word {
    margin: 0.5rem;
    .list-title {
      margin:5px;
      font-size:1rem;
      font-weight: bold;
    }
    .list-author {
      margin:0.3846rem;
      font-size:0.7692rem;
      color:gray;
    }
  }
  img {
    height:5.2rem;
    width:5.2rem;
  }
}
</style>