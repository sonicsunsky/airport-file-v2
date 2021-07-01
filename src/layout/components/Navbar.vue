<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="right-menu">
      <el-dropdown>
        <div class="user">
          <el-avatar v-show="!hasLogin" icon="el-icon-user" :size="40" />
          <el-avatar v-show="hasLogin" :src="userInfo.avatar" :size="40" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <template>
            <el-dropdown-item>
              {{ userInfo.display_name }}
            </el-dropdown-item>
            <el-dropdown-item>
              已读
              <el-badge :value="readCount" type="success" />
            </el-dropdown-item>
            <el-dropdown-item>
              未读
              <el-badge :value="unreadCount" type="danger" />
            </el-dropdown-item>
            <el-dropdown-item>
              可读
              <el-badge :value="allCount" type="primary" />
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided
              >退出登录</el-dropdown-item
            >
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
  data() {
    return {
      hasLogin: false,
      userInfo: {},
      readCount: 10,
      unreadCount: 20,
      allCount: 30
    };
  },
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  watch: {
    $route: {
      handler() {
        this.updateUserInfo();
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    openLogin() {
      this.$router
        .push(`/login?redirect=${this.$route.fullPath}`)
        .catch(() => {});
    },
    updateUserInfo() {
      this.hasLogin = !!localStorage.getItem("token");
      this.userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router
        .push(`/login?redirect=${this.$route.fullPath}`)
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 84px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 84px;
    height: 100%;
    cursor: pointer;
  }

  // &-title {
  //   flex: 1;
  //   height: 100%;
  //   display: flex;
  //   align-items: center;
  //   font-size: 20px;
  //   color: #fff;

  //   .img {
  //     width: 66px;
  //     height: 52px;
  //     margin-right: 20px;
  //   }
  // }

  .right-menu {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .user {
      display: flex;
      align-items: center;
    }
  }
}
</style>
