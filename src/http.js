import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'https://zhihu-daily.leanapp.cn/api'
})

export default http