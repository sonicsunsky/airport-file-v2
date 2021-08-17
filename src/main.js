import Vue from "vue";
Vue.config.productionTip = false;
import Api from "./api";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "./plugins";
import "@/styles/index.scss"; // global css

import "@/icons"; // icon
import "@/permission"; // permission control

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.prototype.$Api = Api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
