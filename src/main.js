import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import XnsSeekBar from 'xns-seek-bar'


// fortawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.config.productionTip = false

Vue.use(XnsSeekBar)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
