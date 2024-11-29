
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import * as api from "@/serveApi/commonApi";
import * as constant from "@/utils/constant.js";
import * as fun from "@/utils/index.js";
import tabBar from './components/ua-tabbar/ua-tabbar.vue'
Vue.component('tab-bar', tabBar)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$apiCom = api;


// 全局注册过滤器
import * as filters from "@/utils/filters.js";
Object.keys(filters).forEach((key)=>{
	Vue.filter(key,filters[key]);
});

Vue.prototype.$fun = fun
Vue.prototype.$constant = constant


import store from './store'

Vue.prototype.$store = store

const app = new Vue({
    ...App
})
app.$mount()
// 变量用于保存最后访问的页面
let lastPage = '';

// 获取当前页面的 URL
function getCurrentPageUrl() {
  const pages = getCurrentPages();
  return pages.length ? pages[pages.length - 1].route : '';
}

// 监听网络状态变化
uni.onNetworkStatusChange((res) => {
  if (!res.isConnected) {
	  uni.setStorageSync('network','no')
    lastPage = getCurrentPageUrl(); // 保存当前页面的 URL
	if(lastPage=='page_writeOff/errorNetwork/errorNetwork'){
		return
	}
    uni.navigateTo({
      url: '/page_writeOff/errorNetwork/errorNetwork', // 替换为你的错误页面路径
    });
  } else if (lastPage) {
	  uni.setStorageSync('network','yes')
    uni.navigateBack({
      delta: 1, // 返回到上一个页面
    });
    lastPage = ''; // 清空最后访问页面的记录
  }
});
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif