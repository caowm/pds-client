<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card>
          <div id="chartBarMonth" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :xs="824" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card>
          <div id="chartBarOffice" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const echarts = require('echarts')
import { statMonth, statOffice } from '@/api/surgery'

export default {
  name: 'Dashboard',
  data() {
    return {
      barMonthOption: {
        title: {
          text: '按月统计手术台数'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: [],
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          color: '#00bfff',
          data: []
        }],
      },
      barOfficeOption: {
        title: {
          text: '按科室统计手术台数'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: [],
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          color: '#ff9999',
          data: []
        }],
      },
      chartBarMonth: null,
      chartBarOffice: null
    }
  },
  mounted() {
    this.initChartBarMonth()
    this.initChartBarOffice()
    this.getData()
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartBarMonth) {
      this.chartBarMonth.resize()
    }
    if (this.chartBarOffice) {
      this.chartBarOffice.resize()
    }
    this.timer = setInterval(() => {
      this.getData()
    }, 600000)
  },
  deactivated() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    initChartBarMonth() {
      this.chartBarMonth = echarts.init(document.getElementById('chartBarMonth'), 'vintage')
      this.chartBarMonth.setOption(this.barMonthOption)
      window.addEventListener('resize', () => {
        this.chartBarMonth.resize()
      })
      // console.log(this.chartBarMonth)
    },
    initChartBarOffice() {
      this.chartBarOffice = echarts.init(document.getElementById('chartBarOffice'), 'vintage')
      this.chartBarOffice.setOption(this.barOfficeOption)
      window.addEventListener('resize', () => {
        this.chartBarOffice.resize()
      })
    },
    async getData() {
      let data = await statMonth()
      this.barMonthOption.series[0].data = data.map(item => item.cnt)
      this.barMonthOption.xAxis.data = data.map(item => item.month)
      this.chartBarMonth.setOption(this.barMonthOption)

      data = await statOffice()
      this.barOfficeOption.series[0].data = data.map(item => item.cnt)
      this.barOfficeOption.xAxis.data = data.map(item => item.dept_name)
      this.chartBarOffice.setOption(this.barOfficeOption)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {

  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;

    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .chart-box {
    min-height: 600px;
  }
}
</style>
