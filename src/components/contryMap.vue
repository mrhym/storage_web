<template>
  <div class="visitorpie">
    <div id="visitorpie" class style="width: 1000px;height:600px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.myChart = echarts.init(document.getElementById("visitorpie"));
    this.initData();
  },
  props: ["pieData"],
  methods: {
    initData() {
      const option = {
          title:{
            text: "   店铺省份分布图"
          },
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        series: [
          {
            name: "中国",
            type: "map",
            mapType: "china",
            selectedMode: "multiple",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [],
            markPoint: {
              symbol: "pin",
              symbolSize: 100,
              label: {
                normal: {
                  show: true,
                  formatter: function(d) {
                    return d.name+"_"+d.data.number+"店铺";
                  }
                }
              },
              data: [{ name: "浙江", coord: [120.45, 28.52],number:1 }]
            }
          }
        ]
      };

      this.myChart.setOption(option);
    }
  },
  watch: {
    pieData: function() {
      this.initData();
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.visitorpie {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
