import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import './assets/js/rem.js' 
import './assets/css/init.css' 
import './assets/js/commom.js' 
import './assets/css/swiper.min.css';

import AMap from 'vue-amap';
Vue.use(AMap);
  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '68034e8a8aad2873b85026e9d51315a2',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation','Amap.CitySearch']
});
Vue.prototype.axios=axios
Vue.config.productionTip = false
Vue.prototype.$ = $
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
