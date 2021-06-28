<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
import { formatThousandNum } from "@/utils";

export default {
  name: "LineChart",
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
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
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
    getDaysOfMonth() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const days = new Date(year, month, 0).getDate();
      return days;
    },
    updateChart({ uvTotal, uvMonth, uvToday, pvData, uvData }) {
      if (!this.chart) return;
      const month = new Date().getMonth() + 1;
      const days = this.getDaysOfMonth();
      const xAxisData = new Array(days)
        .fill("")
        .map((_, index) => {
          return `${month}-${index + 1}`;
        })
        .filter((_, index) => {
          return index === 0 || (index + 1) % 5 === 0;
        });
      console.log(xAxisData);
      this.chart.setOption({
        title: [
          {
            text: "访问流量",
            textStyle: {
              fontSize: 20,
              color: "#2068c2"
            }
          },
          {
            top: 50,
            text: "累计访问UV",
            textStyle: {
              fontSize: 20,
              color: "#909399"
            }
          },
          {
            top: 80,
            text: `${formatThousandNum(uvTotal)}`,
            textStyle: {
              fontSize: 25,
              color: "#8BDCEA"
            }
          },
          {
            top: 130,
            text: "最近30天UV",
            textStyle: {
              fontSize: 20,
              color: "#909399"
            }
          },
          {
            top: 160,
            text: `${formatThousandNum(uvMonth)}`,
            textStyle: {
              fontSize: 25,
              color: "#8BDCEA"
            }
          },
          {
            top: 210,
            text: "今日UV",
            textStyle: {
              fontSize: 20,
              color: "#909399"
            }
          },
          {
            top: 240,
            text: `${formatThousandNum(uvToday)}`,
            textStyle: {
              fontSize: 25,
              color: "#8BDCEA"
            }
          }
        ],
        grid: {
          left: "25%",
          right: "5%"
        },
        xAxis: {
          data: xAxisData,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            data: pvData,
            symbolSize: 10,
            lineStyle: {
              color: "#EE7F56"
            },
            itemStyle: {
              color: "#EE7F56"
            },
            areaStyle: {
              //#FAE0D5
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(250, 222, 212, 0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(250, 222, 212, 0.3)" // 100% 处的颜色
                  }
                ]
              }
            },
            smooth: true
          },
          {
            type: "line",
            data: uvData,
            symbolSize: 10,
            lineStyle: {
              color: "#8BDCEA"
            },
            itemStyle: {
              color: "#8BDCEA"
            },
            areaStyle: {
              //#DAF5FA
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(221,246,249, 0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(221,246,249, 0.3)" // 100% 处的颜色
                  }
                ]
              }
            },
            smooth: true,
            zlevel: 2
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
