import axios from "axios";
import store from "@/store";
import router from "@/router";
import Config from "@/config";
import { Loading, Message } from "element-ui";
import { getStorage, setStorage } from "@/utils/auth";
import qs from "qs";
let loadingInstance = null;

// dev: 'http://by2.hjlinfo.top/airport/api/v1.0',
// prod: 'https://jc.cgoport.com/airport/api/v1.0',

console.log(process.env);

const baseURL =
  process.env.NODE_ENV === "development"
    ? Config.baseUrl.dev
    : Config.baseUrl.prod;

// create an axios instance
const service = axios.create({
  baseURL, // process.env.VUE_APP_BASE_API
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      text: `加载中...`,
      background: `rgba(238, 245, 254, 0.8)`
    });
    const token = getStorage("token") || "";
    if (token) {
      config.headers["authorization"] = token;
    }
    // console.log("axios: ", config.headers);
    // do something before request is sent
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    loadingInstance && loadingInstance.close();
    const res = response.data;
    return res;
  },
  error => {
    loadingInstance && loadingInstance.close();
    console.log("err: ", error.response);
    const status = error.response.status;
    const code = error.response.data.code; //"rest_forbidden"
    console.log("router.currentRoute: ", router.currentRoute);
    if (status === 401 && code === 401) {
      if (router.currentRoute.fullPath.indexOf("/login") === -1) {
        Message({
          message: "当前为未登录状态或登录态过期请重新登录",
          type: "error"
        });
        store.dispatch("user/logout");
        router
          .push(`/login?redirect=${router.currentRoute.fullPath}`)
          .catch(() => {});
      }
    }
    return Promise.reject(error.response);
  }
);

export default service;
