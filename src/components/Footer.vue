<template>
  
  <footer class="footer-nav">
    <div class="icon-container" @click="back"><img src="../assets/arrow_left.png"/></div>
    <router-link tag="div" :to="'/home/newsinfo/comments/' + this.id" class="middle-icon-container"><img src="../assets/message.png"/><span >{{comments}}</span></router-link>
    <div class="middle-icon-container"><img src="../assets/good.png"/><span v-show="popularity!=0">{{popularity}}</span></div>
    <div class="icon-container"><img src="../assets/star.png"/></div>
    <div class="icon-container"><img src="../assets/share.png"/></div>
  </footer>
</template>


<script>
export default {
  data(){
    return{
      popularity:0,
      comments:0,
      favourState:'false',
      starState:'false'
    }
  },
  props: ['id'],
  created(){
    this.getStoryDetail(this.id)
  },
  activated(){
    if(this.id != this.$route.params.id){
      this.popularity = 0
      this.comments = 0
      this.favourState = 'false'
      this.starState = 'false'
      this.getStoryDetail(this.$route.params.id)
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getStoryDetail(id){
      this.$http.get('/zhihu/4/story-extra/' + id).then(res => {
        this.popularity = res.body.popularity
        this.comments = res.body.comments
      })
    },
  }
}
</script>


<style lang="scss">

.footer-nav{
  display: flex;
  position:fixed;
  width:100vw;
  background-color: #ffffff;
  bottom:0;
  height:60px;
  justify-content: space-between;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #f8f8f8;
  padding-bottom: 20px;
  padding-left:20px;
  padding-right:20px;
  padding-top: 2px;
  align-items: center;
  .middle-icon-container{
    height:25px;
    width: 25px;
    display:flex;
    span{
      font-size:12px;
      -webkit-transform: scale(0.85);
    }
    img{
      width:100%;
      height: 100%;
    }
  }
  .icon-container{
      height:25px;
      width: 25px;
    
    img{
      width:100%;
      height:100%;
    }
  }
}


</style>>