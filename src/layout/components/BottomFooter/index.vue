<template>
  <div class="footer">
    <div class="footer-title">
      <span @click="openHelp">帮助</span>
      <span @click="openSecret">隐私</span>
      <span @click="openRule">条款</span>
    </div>
    <div class="footer-copyright">
      <span>copyright @ 2020 青岛市工业互联网微服务平台</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BottomFooter',
    data() {
      return {}
    },
    created() {},
    methods: {
      openHelp() {},
      openSecret() {},
      openRule() {},
    },
  }
</script>

<style lang="scss" scoped>
  .footer {
    width: 600px;
    box-sizing: border-box;
    padding: 20px 0;
    margin: 0 auto;
    font-size: 12px;
    color: $el-info;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      span {
        &:nth-of-type(2) {
          padding: 0 30px;
        }
      }
    }

    &-copyright {
    }
  }
</style>
