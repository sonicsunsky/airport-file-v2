import { setStorage, removeStorage } from "@/utils/auth";
import { resetRouter } from "@/router";
import request from "@/utils/request";
import { Message } from "element-ui";

const state = {
  token: "",
  userInfo: {}
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    setStorage("token", token);
  },
  setUserInfo(state, data) {
    state.userInfo = { ...data };
    setStorage("userInfo", data);
  }
};

const actions = {
  // 发送手机验证码
  async sendCode(store, data) {
    const res = await request({
      url: "/openapi/portal/sendSMS",
      method: "POST",
      data
    });
    if (+res.errCode === 0) {
      Message({
        type: "success",
        message: "发送成功"
      });
    }
    return res;
  },

  // 调用登录接口
  async login({ commit }, data) {
    const res = await request({
      url: "/auth",
      method: "POST",
      data
    });
    if (+res.code === 0) {
      commit("setToken", res.content.token);
      commit("setUserInfo", res.content);
    }
    return res;
  },

  async updateUserInfo({ commit }, data) {
    const res = await request({
      url: "/openapi/work/user/update",
      method: "POST",
      data
    });
    console.log("updateUserInfo: ", res);
    if (+res.errCode === 0) {
      Message({
        type: "success",
        message: "更新用户信息成功"
      });
    }
    return res;
  },

  // user logout
  async logout({ commit, state, dispatch }) {
    await new Promise((resolve, reject) => {
      commit("setToken", "");
      removeStorage("token");
      commit("setUserInfo", {});
      removeStorage("userInfo");

      resetRouter();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
