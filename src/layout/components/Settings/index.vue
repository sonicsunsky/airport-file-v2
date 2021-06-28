<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">设置</h3>

      <el-radio-group v-model="themeName" size="small" @change="onThemeChange">
        <el-radio-button label="default">默认</el-radio-button>
        <el-radio-button label="ocean">海洋之心</el-radio-button>
        <el-radio-button label="green">绿荫草场</el-radio-button>
        <el-radio-button label="glory">荣耀典藏</el-radio-button>
      </el-radio-group>

      <div class="drawer-item">
        <span>预设主题色</span>
        <theme-picker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themePickerChange"
        />
      </div>

      <div class="drawer-item">
        <span>tags标签开关</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>头部固定开关</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <!-- <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div> -->
    </div>
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";

export default {
  components: { ThemePicker },
  data() {
    return {
      themeName: "default"
    };
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fixedHeader",
          value: val
        });
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val
        });
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "sidebarLogo",
          value: val
        });
      }
    }
  },
  created() {
    document
      .getElementsByTagName("body")[0]
      .classList.remove(`vue-admin-beautiful-theme-${this.themeName}`);
    // const theme = localStorage.getItem("vue-admin-beautiful-theme");
    // if (null !== theme) {
    //   this.themeName = JSON.parse(theme);
    //   this.handleSetTheme();
    // }
  },
  methods: {
    handleSetTheme() {
      localStorage.setItem("vue-admin-beautiful-theme", `${this.themeName}`);
      document.getElementsByTagName(
        "body"
      )[0].className = `vue-admin-beautiful-theme-${this.themeName}`;
    },
    onThemeChange(val) {
      console.log("onThemeChange: ", val);

      this.handleSetTheme();
      this.$store.dispatch("settings/changeSetting", {
        key: "theme",
        value: val
      });
    },
    themePickerChange(val) {
      console.log("themePickerChange: ", val);

      this.$store.dispatch("settings/changeSetting", {
        key: "pickerColor",
        value: val
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin: 20px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
