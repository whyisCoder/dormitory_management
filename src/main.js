// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import axios from "axios"
import router from './router'
   
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config =>{
	config.headers.Authorization = window.sessionStorage.getItem('token')
	return config
})
Vue.prototype.$http = axios
Vue.prototype.confirm = MessageBox

Vue.use(ElementUI);  
   
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
