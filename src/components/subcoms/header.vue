<template>
  <div>
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
  </div>
</template>


<script>
export default {
  data(){
    return{
      msg: '~~~~~',
      month: '一月',
      day:'26',

    }
  }
}
</script>>

<style lang="scss">
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
</style>