<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
import { formatThousandNum } from "@/utils";

export default {
  name: "PieChart",
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
      type: Array,
      required: true
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
    updateChart(seriesData = []) {
      if (!this.chart) return;
      const sum = seriesData.reduce((acc, cur) => {
        return (acc += cur.value);
      }, 0);
      const colors = ["#EF8C66", "#91A7F8", "#F4CE4A"];
      this.chart.setOption({
        color: colors,
        title: [
          {
            text: "各模块信息占比",
            textStyle: {
              fontSize: 20,
              color: "#2068c2"
            }
          },
          {
            text: `{name|累计总信息}\n{value|${formatThousandNum(sum)}}`,
            top: "center",
            left: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "#666666",
                  padding: [10, 0]
                },
                value: {
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333333"
                }
              }
            }
          }
        ],
        legend: {
          left: "center",
          bottom: "10"
        },
        series: [
          {
            type: "pie",
            label: {
              show: false
            },
            emphasis: {
              scaleSize: 12,
              label: {
                show: true,
                formatter: `{percent|{d}%}\n{val|{c}}`,
                rich: {
                  val: {
                    fontSize: 18,
                    color: "#EF8C66"
                  },
                  percent: {
                    fontSize: 18,
                    color: "#EF8C66",
                    padding: [5, 0, 5, 0]
                  }
                }
              }
            },
            labelLine: {
              show: false
            },
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
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
