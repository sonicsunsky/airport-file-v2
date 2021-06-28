<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "BarChart",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    chartData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      handler(nData) {
        this.updateChart(nData);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.updateChart(this.chartData);
    });
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
    },
    updateChart({ xAxisData = [], seriesData = [] }) {
      if (!this.chart) return;
      // console.log(xAxisData);
      this.chart.setOption({
        // backgroundColor: "#fff",
        title: {
          text: "信息发布数量趋势",
          textStyle: {
            fontSize: 20,
            color: "#2068c2"
          }
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          data: xAxisData
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 30,
            itemStyle: {
              color: "#91A7F8",
              borderRadius: [15, 15, 0, 0] //（顺时针左上，右上，右下，左下）
            },
            data: seriesData
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
}
</style>
