<template>
  <div class="dashboard">
    <div class="dashboard-filter">
      <div class="title">信息数量</div>

      <div class="date">
        <div
          class="tag"
          :class="[item.id === currentTime ? 'active' : '']"
          v-for="item in timeList"
          :key="item.id"
          @click="changeTime(item.id)"
        >
          {{ item.name }}
        </div>

        <!-- 使用format指定输入框的格式；使用value-format指定绑定值的格式 -->
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :default-value="defaultValue"
          @change="onDateRangeChange"
        >
        </el-date-picker>
      </div>
    </div>

    <el-row type="flex" :gutter="20">
      <el-col>
        <bar-chart :chart-data="barChartData" />
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="20">
      <el-col>
        <rank-board :rank-data="rankData" />
        <!-- <line-chart :chart-data="lineChartData" /> -->
      </el-col>
      <el-col>
        <pie-chart :chart-data="pieChartData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
import BarChart from "./BarChart.vue";
// import LineChart from "./LineChart.vue";
import PieChart from "./PieChart.vue";
import RankBoard from "./RankBoard.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      barChartData: {},
      lineChartData: {},
      pieChartData: [],
      rankData: [],
      currentTime: 0,
      timeList: [
        {
          id: 1,
          name: "今日"
        },
        {
          id: 2,
          name: "本周"
        },
        {
          id: 3,
          name: "本月"
        },
        {
          id: 4,
          name: "全年"
        }
      ],
      defaultValue: "",
      dateRange: ""
    };
  },
  computed: {},
  components: {
    BarChart,
    PieChart,
    RankBoard
  },
  created() {
    this.startDate = `${new Date().getFullYear()}-01-01`;
    this.endDate = `${new Date().getFullYear()}-12-31`;
    this.defaultValue = new Date();
  },
  mounted() {
    Promise.all([
      this.getTrendData(),
      this.getRankData(),
      this.getPercentData()
    ]);
  },
  methods: {
    handleTrendData(data = {}) {
      const xAxisData = Object.keys(data);
      const seriesData = Object.keys(data).reduce((acc, cur) => {
        acc.push(+data[cur]);
        return acc;
      }, []);
      this.barChartData = Object.assign(
        {},
        {
          xAxisData,
          seriesData
        }
      );
    },
    async getTrendData() {
      const params = {
        post_type: ["chanpin", "xuqiu"], //文章类型数组
        date_start: this.startDate, //自定义查询开始时间
        date_end: this.endDate //自定义查询结束时间
      };
      const res = await this.$Api.getTrendData(params);
      console.log(res);
      this.handleTrendData(res.data);
    },
    handleRankData(data = []) {
      this.rankData = data.map(item => {
        return {
          id: item.author_id,
          name: item.display_name,
          rank: +item.count
        };
      });
    },
    async getRankData() {
      const params = {
        post_type: ["chanpin", "xuqiu"], //文章类型数组
        date_start: this.startDate, //自定义查询开始时间
        date_end: this.endDate //自定义查询结束时间
      };
      const res = await this.$Api.getRankData(params);
      console.log(res);
      this.handleRankData(res.data);
    },
    async getFluxData() {
      // const params = {
      //   post_type: ["chanpin", "xuqiu"], //文章类型数组
      //   date_start: this.startDate, //自定义查询开始时间
      //   date_end: this.endDate //自定义查询结束时间
      // };
      // const res = await this.$Api.getRankData(params);
      // console.log(res);
      // this.handleRankData(res.data);
    },
    handlePercentData(data = {}) {
      this.pieChartData = Object.keys(data).reduce((acc, cur) => {
        acc.push({
          name: cur,
          value: +data[cur]
        });
        return acc;
      }, []);
      console.log(this.pieChartData);
    },
    async getPercentData() {
      const params = {
        post_type: ["chanpin", "xuqiu"], //文章类型数组
        date_start: this.startDate, //自定义查询开始时间
        date_end: this.endDate //自定义查询结束时间
      };
      const res = await this.$Api.getPercentData(params);
      console.log(res);
      this.handlePercentData(res.data);
    },
    changeTime(id) {
      this.currentTime = id;
      if (id === 1) {
        this.startDate = dayjs().format("YYYY-MM-DD");
        this.endDate = dayjs().format("YYYY-MM-DD");
      }
      if (id === 2) {
        this.startDate = dayjs()
          .startOf("week")
          .format("YYYY-MM-DD");
        this.endDate = dayjs()
          .endOf("week")
          .format("YYYY-MM-DD");
      }
      if (id === 3) {
        this.startDate = dayjs()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.endDate = dayjs()
          .endOf("month")
          .format("YYYY-MM-DD");
      }
      if (id === 4) {
        this.startDate = `${new Date().getFullYear()}-01-01`;
        this.endDate = `${new Date().getFullYear()}-12-31`;
      }
      Promise.all([
        this.getTrendData(),
        this.getRankData(),
        this.getPercentData()
      ]);
    },
    onDateRangeChange(val) {
      console.log("onDateRangeChange: ", val);
      this.currentTime = 0;
      if (val) {
        this.startDate = val[0];
        this.endDate = val[1];
        Promise.all([
          this.getTrendData(),
          this.getRankData(),
          this.getPercentData()
        ]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
