import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'

import { Indicator } from 'mint-ui';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

// 请求拦截
axios.interceptors.request.use(config => {
  if(config.method == 'post') {
    config.data = qs.stringify(config.data);
  }
  
  // 加载动画
  Indicator.open();
  return config;

}, error => {
  return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use(response =>{
  Indicator.close();
  return response;
},
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
)

Vue.use(MintUI);

axios.defaults.baseURL = "https://ele-interface.herokuapp.com/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
