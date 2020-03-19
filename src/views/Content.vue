<template>
  <div class="content-page" :id="id">
    <van-skeleton title :row="7" title-width="100%" :loading="loading">
    <div :style="{backgroundImage: 'url(' + newsinfo.image + ')',
        backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}" class="content-header">
        <div class="cover" v-if = "newsinfo.rgb"
        :style="{backgroundImage: `linear-gradient(0,rgba(${newsinfo.rgb[0]},${newsinfo.rgb[1]},${newsinfo.rgb[2]},1),rgba(${newsinfo.rgb[0]},${newsinfo.rgb[1]},${newsinfo.rgb[2]},0.9),rgba(${newsinfo.rgb[0]},${newsinfo.rgb[1]},${newsinfo.rgb[2]},0))`}">
          <div class="author">
            {{newsinfo.image_source}}
          </div>
          <div class="title">
            {{newsinfo.title}}
          </div>
        </div>
    </div>
    <div v-html="newsinfo.body" class="detail-content"></div>
    </van-skeleton>
    <Footer :id="id" :title="newsinfo.title" :img="newsinfo.image"></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import '../assets/article.scss'
export default {
  data(){
    return{
      id: this.$route.params.id,
      newsinfo:{},
      loading: true
    }
  },
  components:{
    Footer
  },
  created(){
    this.getContent(this.id)
  },
  activated(){
    if(this.id != this.$route.params.id){
      this.newsinfo = {},
      this.loading = true
      this.getContent(this.$route.params.id)
      this.id = this.$route.params.id
    }
  },
  methods: {
    async getContent(id){
      try{
        const res = await this.$http.get('/v1/contents/' + id)
        this.newsinfo = res.data.CONTENTS
        this.newsinfo.rgb = this.hugToRgb(this.newsinfo.image_hue)
        this.loading = false
      }catch(err){
        console.log(err)
      }
    },
    hugToRgb(str){
      var one = str.substring(2,4)
      var two = str.substring(4,6)
      var three = str.substring(6,8)
      return[parseInt('0x' + one),parseInt('0x' + two),parseInt('0x' + three)]
    }
  },
}
</script>>

<style lang="scss" rel="stylesheet/scss">
.content-page{
  .van-skeleton__title{
    height: 24rem;
  }
  display:flex;
  flex-direction: column;
  .content-header{
    width: 100%;
    height: 24rem;
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
      margin:0.5rem;
      font-size:1rem;
      opacity: 0.8;
    }
    .title{
      margin:10px;
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>