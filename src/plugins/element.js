import Cookies from "js-cookie";
import Vue from "vue";
import ElementUI from "element-ui";
import "../styles/element-variables.scss";
Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});
