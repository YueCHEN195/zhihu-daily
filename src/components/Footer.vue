<template>
  <van-tabbar active-color="#7d7e80">
    <van-tabbar-item icon="arrow-left" @click="back">后退</van-tabbar-item>
    <van-tabbar-item icon="comment-o" :info="comments" :to="'/home/newsinfo/comments/' + id">评论</van-tabbar-item>
    <van-tabbar-item icon="good-job-o" v-if="!favourState" :info="popularity" @click="addFavour">点赞</van-tabbar-item>
    <van-tabbar-item icon="good-job" v-if="favourState" :info="popularity + 1" @click="removeFavour">点赞</van-tabbar-item>
    <van-tabbar-item icon="star-o" v-if="!starState" @click="addToCollection">收藏</van-tabbar-item>
    <van-tabbar-item icon="star" v-if="starState" @click="removeFromCollection">收藏</van-tabbar-item>
  </van-tabbar>
</template>


<script>
export default {
  data(){
    return{
      popularity:0,
      comments:0,
      favourState: false,
      starState: false,
    }
  },
  props: ['id','title','img'],
  created(){
    this.getStoryDetail(this.id)
  },
  activated(){
    if(this.id != this.$route.params.id){
      this.popularity = 0
      this.comments = 0
      this.favourState = false
      this.starState = false
      this.getStoryDetail(this.$route.params.id)
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    async getStoryDetail(id){
      try{
        const res = await this.$http.get('/v1/contents/extra/' + id)
        this.popularity = res.data.DES.popularity
        this.comments = res.data.DES.comments
      }catch(err){
        console.log(err)
      }
    },
    // 点赞，收藏这部分没有接口，只能玩单机，刷新就失效了
    addToCollection(){
      this.starState = true
      let storage = window.localStorage
      let article = JSON.stringify({id: this.id, title:this.title, img: this.img})
      this.$toast({message: '已添加至收藏',positon:'bottom'})
    },
    removeFromCollection(){
      this.starState = false
      let storage = window.localStorage
      storage.removeItem(this.id)
      this.$toast({message: '已从收藏列表移除',positon:'bottom'})
    },
    addFavour(){
      this.favourState = true
      this.$toast({message: '已点赞',positon:'bottom'})
    },
    removeFavour(){
      this.favourState = false
      this.$toast({message: '已取消点赞',positon:'bottom'})
    }
  }
}
</script>


<style lang="scss">

.van-info {
  transform: translate(85%,-50%);
  color: #646566;
  background-color: #fff;

}


</style>>
