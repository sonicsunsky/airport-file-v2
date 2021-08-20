<template>
  <div class="login">
    <div class="login-container">
      <el-form
        ref="userLoginForm"
        :model="userLoginForm"
        :rules="userLoginRules"
        class="login-form"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            v-model="userLoginForm.username"
            prefix-icon="el-icon-user"
            placeholder="用户名"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="userLoginForm.password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="密码"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const initFormFields = () => {
  return {
    username: "",
    password: ""
  };
};

export default {
  name: "Login",
  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },
  data() {
    return {
      redirect: "",
      userLoginForm: initFormFields(),
      userLoginRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          // this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {},
  methods: {
    resetFormFields() {
      this.userLoginForm = initFormFields();
      this.$refs.userLoginForm.resetFields();
    },
    handleLogin() {
      const { username, password } = this.userLoginForm;
      const params = {
        username,
        password,
        appid: "h5appid20210818",
        platform: "h5_app"
      };
      this.$refs.userLoginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", params)
            .then(res => {
              if (res.code === 100) {
                this.$message.success("登录成功");
                this.$router.push({ path: this.redirect || "/" });
              } else {
                this.$message.error(res.message || "登录错误");
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("invalid form");
          return false;
        }
      });
    }
    // getOtherQuery(query) {
    //   return Object.keys(query).reduce((acc, cur) => {
    //     if (cur !== "redirect") {
    //       acc[cur] = query[cur];
    //     }
    //     return acc;
    //   }, {});
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
