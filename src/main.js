import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import Vuex from 'vuex'
import store from './store/store';
import Axios from 'axios';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
};


Vue.use(Toast, options);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}
Vue.use(Vuex)


Vue.use(NowUiKit);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
