import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import toast from "components/common/toast"
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

FastClick.attach(document.body);

Vue.config.productionTip = false


Vue.prototype.$bus = new Vue();
Vue.use(toast)
Vue.use(VueLazyLoad,{
  loading:require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

