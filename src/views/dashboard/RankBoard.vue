<template>
  <div class="rank">
    <div class="rank-title">信息发布排名</div>

    <div class="rank-item" v-for="(item, index) in rankData" :key="item.id">
      <div class="point" :class="[index + 1 < 4 ? 'active' : '']">
        {{ index + 1 }}
      </div>
      <div class="name" :class="[index + 1 < 4 ? 'active' : '']">
        {{ item.name }}
      </div>
      <div class="num" :class="[index + 1 < 4 ? 'active' : '']">
        {{ item.rank }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankBoard",
  components: {},
  props: {
    rankData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      rankBoardData: []
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.rank {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  height: 400px;
  background-color: #fff;

  &-title {
    font-size: 20px;
    color: $el-primary-dark;
    margin-bottom: 20px;
  }

  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .point {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 12px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: $el-primary-light;

      &.active {
        background-color: $el-warning;
      }
    }

    .name {
      flex: 1;
      margin-left: 20px;
      font-size: 16px;
      color: $el-regular-text;

      &.active {
        color: $el-primary-text;
        font-weight: bold;
      }
    }

    .num {
      font-size: 16px;
      color: $el-regular-text;

      &.active {
        color: $el-warning;
        font-weight: bold;
      }
    }
  }
}
</style>
