<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane :label="params.room + '号手术间监测数据'" name="first">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="心率" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="呼吸" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="SPO2" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="收缩压ART" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="舒张压ART" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="脉搏" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="体温" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="动脉收缩压" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="动脉舒张压" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="CVP" class="chart-box" />
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <el-card>
              <div id="呼末CO2" class="chart-box" />
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="second">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-descriptions title="" direction="vertical" :column="5" border>
              <el-descriptions-item label="姓名">{{ surgery.pat_name }} {{ surgery.pat_id }}</el-descriptions-item>
              <el-descriptions-item label="性别">{{ surgery.pat_sex==='AD01'?'男': (surgery.pat_sex==='AD02'?'女':'') }}</el-descriptions-item>
              <el-descriptions-item label="年龄">{{ surgery.years_old }} 岁</el-descriptions-item>
              <el-descriptions-item label="科室" :span="2">{{ surgery.dept_name }}&nbsp; <el-tag>{{ surgery.bed_code }} 床</el-tag></el-descriptions-item>
              <el-descriptions-item label="诊断" :span="2"><el-tag>{{ surgery.pat_in_diagnosis }}</el-tag></el-descriptions-item>
              <el-descriptions-item label="手术名称" :span="3">{{ surgery.ssbm_name }}</el-descriptions-item>
              <el-descriptions-item label="麻醉方法" :span="1"><el-tag>{{ surgery.mz_ff || surgery.toxi_kind }}</el-tag></el-descriptions-item>
              <el-descriptions-item label="麻醉医生" :span="2">{{ surgery.mzys }}</el-descriptions-item>
              <el-descriptions-item label="手术医生" :span="2">{{ surgery.ss_doctor }}</el-descriptions-item>
              <el-descriptions-item label="手术安排时间" :span="1">{{ surgery.plan_time | parseNoZoneTime }}</el-descriptions-item>
              <el-descriptions-item label="入室时间" :span="2"><el-tag>{{ surgery.rssj | parseNoZoneTime }}</el-tag></el-descriptions-item>
              <el-descriptions-item label="麻醉开始时间" :span="2">{{ surgery.mzkssj | parseNoZoneTime }}</el-descriptions-item>
              <el-descriptions-item label="手术开始时间" :span="1">{{ surgery.sskssj | parseNoZoneTime }}</el-descriptions-item>
              <el-descriptions-item label="手术结束时间" :span="2">{{ surgery.ssjssj | parseNoZoneTime }}</el-descriptions-item>
              <el-descriptions-item label="麻醉结束时间" :span="2">{{ surgery.mzjssj | parseNoZoneTime }}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
        <br>
      </el-tab-pane>
      <el-tab-pane label="事件列表" name="three">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div id="eventsChart" style="width: 100%; height: 500px;" />
            <el-timeline style="margin-top: 20px">
              <el-timeline-item
                v-for="(event, index) in events"
                :key="index"
                color="#0bbd87"
                size="large"
                :timestamp="getTimestamp(event)"
                placement="top"
              >
                <el-row :gutter="10" type="flex">
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18" style="padding: 12px 10px; background-color: #fafafa; border: 1px solid #e6ebf5; margin: 3px;">{{ event.yymc }}</el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="3" style="padding: 12px 10px; background-color: #fafafa; border: 1px solid #e6ebf5; margin: 3px;">{{ event.yysl || '' }}{{ event.yydw || '' }}</el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="4" :xl="3" style="padding: 12px 10px; background-color: #fafafa; border: 1px solid #e6ebf5; margin: 3px;">{{ event.yyfs || '' }}</el-col>
                </el-row>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

const echarts = require('echarts')
import { getRoomSurgery, getRoomDeviceData, getEvent } from '@/api/surgery'
import { parseNoZoneTime } from '@/utils/'
const moment = require('moment')
const io = require('socket.io-client')
let socket = null

export default {
  name: 'SurgeryRoomDetail',
  data() {
    return {
      activeTab: 'first',
      chartNames: ['心率', '呼吸', 'SPO2', '收缩压ART', '舒张压ART', '脉搏', '体温', '动脉收缩压', '动脉舒张压', 'CVP', '呼末CO2'],
      charts: [],
      chartData: {},
      params: {
        room: '',
        device: ''
      },
      surgery: {},
      events: [],
      eventsChart: null
    }
  },
  mounted() {
    this.initCharts()
    this.createSocket()
    this.timer = setInterval(() => {
      this.getData()
    }, 60000)
  },
  beforeDestroy() {
    socket.close()
    console.log('close socket')
  },
  activated() {
    console.log('room detail activated', this.$route.params)
    if (this.$route.params && this.$route.params.room /* && this.$route.params.room !== this.params.room */) {
      this.params = {
        room: this.$route.params.room,
        device: this.$route.params.device,
        number: this.$route.params.surgery && this.$route.params.surgery.ssmz_number,
        time: this.$route.params.surgery && this.$route.params.surgery.rssj
      }
      this.surgery = {}
      this.events = []
      this.chartData = {}
      this.resetCharts()
    }
    this.$nextTick(() => this.getData())
    this.tabClick()
  },
  deactivated() {
    // clearTimeout(this.timer)
  },
  methods: {
    async getData() {
      if (!this.params.room) return
      this.surgery = await getRoomSurgery({ room: this.params.room, number: this.params.number })
      // this.surgery = await getRoomSurgery({ room: this.params.room })
      if (this.surgery.ssmz_number !== this.params.number) {
        this.params.number = this.surgery.ssmz_number
        this.chartData = []
      }
      this.events = await getEvent({ number: this.params.number })
      this.buildEventsChart()
      // 设备数据只在初始进行加载
      if (!this.chartData[this.chartNames[0]]) {
        this.chartNames.forEach((name) => { this.chartData[name] = { times: [], values: [] } })
        const deviceData = await getRoomDeviceData({ id: this.params.room, begin: parseNoZoneTime(this.params.time) })
        deviceData.forEach((item) => {
          if (!this.chartData[item.key]) {
            this.chartData[item.key] = { values: [] }
          }
          if (parseFloat(item.value) < 0) return
          this.chartData[item.key].values.push([parseNoZoneTime(item.time).substr(0, 19), item.value])
        })
        // console.log('chartData', this.chartData)
        this.chartNames.forEach((name) => {
          this.setChartData(name)
        })
      }
      // console.log('room-detail', this.surgery, this.events, this.chartData)
    },
    setChartData(name) {
      // const start = (this.chartData[name].values.length - 30) * 100 / this.chartData[name].values.length
      const length = this.chartData[name].values.length
      const startValue = length > 30 ? this.chartData[name].values[length - 30][0] : null
      this.charts[name].setOption({
        dataZoom: [{ type: 'inside', startValue, xAxisIndex: [0] }],
        series: [{ data: this.chartData[name].values }]
      })
    },
    getTimestamp(event) {
      return parseNoZoneTime(event.sqsj) + (event.jzsj ? ' > ' + parseNoZoneTime(event.jzsj) : '')
    },
    resetCharts() {
      this.eventsChart.setOption({
        yAxis: [{ data: [] }],
        series: [{ data: [] }]
      })
      this.chartNames.forEach((name) => {
        this.charts[name].setOption({
          xAxis: [{ data: [] }],
          series: [{ data: [] }]
        })
      })
    },
    initCharts() {
      this.eventsChart = echarts.init(document.getElementById('eventsChart'))
      function renderItem(params, api) {
        const categoryIndex = api.value(0)
        const start = api.coord([api.value(1), categoryIndex])
        const end = api.coord([api.value(2) || api.value(1), categoryIndex])
        const height = 10 // api.size([0, 1])[1] * 0.1
        const text = api.value(4) + ': ' + api.value(3)
        const style = api.style({
          stroke: api.value(5) == '2' ? 'red' : 'blue'
        })
        // console.log('render item', params, start, end)
        return {
          type: 'group',
          children: [
            {
              type: 'text',
              style: {
                fill: '#333',
                width: end[0] - start[0],
                overflow: '',
                text: text,
                textAlign: end[0] - start[0] < 20 ? 'left' : 'center',
                font: '14px 宋体'
              },
              x: (start[0] + end[0]) / 2,
              y: start[1] - 13
            },
            {
              type: 'line',
              shape: {
                x1: start[0],
                y1: start[1] + 4,
                x2: end[0],
                y2: end[1] + 4
              },
              style: style
            },
            {
              type: 'line',
              shape: {
                x1: start[0],
                y1: start[1] + height / 2 + 4,
                x2: start[0],
                y2: start[1] - height / 2 + 4
              },
              style: style
            },
            {
              type: 'line',
              shape: {
                x1: end[0],
                y1: end[1] + height / 2 + 4,
                x2: end[0],
                y2: end[1] - height / 2 + 4
              },
              style: style
            }
          ]
        }
      }
      this.eventsChart.setOption({
        tooltip: {
          formatter: function(params) {
            return params.marker + params.name + ' > ' + params.value[1] + ' > ' + params.value[2]
          }
        },
        title: {
          text: '麻醉药和输液时间轴',
          left: 'center'
        },
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'filter'
          }
        ],
        grid: {
          height_: 300
        },
        xAxis: {
          type: 'time',
          scale: true,
          splitLine: {
            show: true
          }
        },
        yAxis: {
          data: [],
          nameLocation: 'center',
          splitLine: {
            show: true
          }
        },
        series: [
          {
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: []
          }
        ]
      })
      this.chartNames.forEach((name) => {
        this.charts[name] = echarts.init(document.getElementById(name), 'vintage')
        this.charts[name].setOption({
          title: {
            text: name
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '30px',
            right: '10px',
            bottom: '20px'
          },
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0]
            }
          ],
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line',
            color: '#ff9999',
            data: []
          }]
        })
      })
      window.addEventListener('resize', () => {
        this.tabClick()
      })
    },
    tabClick(tab, event) {
      this.$nextTick(() => {
        if (this.activeTab === 'first') {
          this.chartNames.forEach((name) => {
            this.charts[name].resize()
          })
        } else if (this.activeTab === 'three') {
          this.eventsChart.resize()
        }
      })
    },
    buildEventsChart() {
      if (this.events.length === 0) return
      const data = []
      const categories = []
      let minTime = '9999'
      console.log(this.events)
      this.events.forEach((item) => {
        // 只打印麻醉用药和输液
        if (item.czlb !== '2' && item.czlb !== '3') return
        if (!categories.includes(item.yymc)) {
          if (item.czlb === '2') categories.push(item.yymc)
          else categories.unshift(item.yymc)
        }
        if (minTime > item.sqsj) minTime = item.sqsj
      })
      this.events.forEach((item) => {
        if (item.czlb !== '2' && item.czlb !== '3') return
        data.push({
          name: item.yymc,
          value: [
            categories.indexOf(item.yymc),
            parseNoZoneTime(item.sqsj).substr(0, 19),
            parseNoZoneTime(item.jzsj).substr(0, 19),
            '' + (item.yysl || '') + (item.yydw || ''),
            item.yyfs || '',
            item.czlb || '']
        })
      })
      this.eventsChart.getDom().style.height = (categories.length * 40 + 100) + 'px'
      minTime = moment(parseNoZoneTime(minTime).substr(0, 19)).subtract(2, 'minute').format('YYYY-MM-DD HH:mm:ss')
      console.log(minTime, categories, data)
      this.eventsChart.setOption({
        xAxis: {
          min: minTime
        },
        yAxis: {
          data: categories
        },
        series: [
          {
            data: data
          }
        ]
      })
      this.eventsChart.resize()
    },
    createSocket() {
      socket = io.connect(process.env.VUE_APP_BASE_API, { path: '/strapio', reconnection: true, reconnectionDelay: 3000 })
      socket.emit('subscribe', 'device')
      socket.on('data', (data) => {
        // console.log('data:', data)
        if (data.sender !== this.params.device) return
        data.data.forEach((item) => {
          if (parseFloat(item.value) < 0) return
          if (this.chartData[item.key]) {
            this.chartData[item.key].values.push([item.record_time.substr(0, 19), item.value])
            this.setChartData(item.key)
          }
        })
        console.log('chart data', this.chartData)
      })
      socket.on('message', (msg) => {
        // console.log('message', msg)
      })
      console.log('createSocket')
    }
  }
}

/*

https://echarts.apache.org/examples/zh/editor.html?c=custom-profile
麻醉用药甘特图示例：

var data = [];
var dataCount = 10;
var startTime = +new Date();
var categories = ['categoryA', 'categoryB', 'categoryC'];
var types = [
  { name: 'JS Heap', color: '#7b9ce1' },
  { name: 'Documents', color: '#bd6d6c' },
  { name: 'Nodes', color: '#75d874' },
  { name: 'Listeners', color: '#e0bc78' },
  { name: 'GPU Memory', color: '#dc77dc' },
  { name: 'GPU', color: '#72b362' }
];
// Generate mock data
categories.forEach(function (category, index) {
  var baseTime = startTime;
  for (var i = 0; i < dataCount; i++) {
    var typeItem = types[Math.round(Math.random() * (types.length - 1))];
    var duration = Math.round(Math.random() * 10000);
    data.push({
      name: typeItem.name,
      value: [index, baseTime, (baseTime += duration), duration],
      itemStyle: {
        normal: {
          color: typeItem.color
        }
      }
    });
    baseTime += Math.round(Math.random() * 2000);
  }
});
function renderItem(params, api) {
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1] * 0.1;
  var duration = api.value(3);
  var style = api.style({
    stroke: 'red'
  });
  return {
    type: 'group',
    children: [
      {
        type: 'text',
        style: {
          fill: '#333',
          width: end[0] - start[0],
          overflow: '',
          text: duration,
          textAlign: 'center',
          font: '14px Microsoft YaHei'
        },
        x: (start[0] + end[0]) / 2,
        y: start[1] - 20
      },
      {
        type: 'line',
        shape: {
          x1: start[0],
          y1: start[1],
          x2: end[0],
          y2: end[1]
        },
        style: style
      },
      {
        type: 'line',
        shape: {
          x1: start[0],
          y1: start[1] + height / 2,
          x2: start[0],
          y2: start[1] - height / 2
        },
        style: style
      },
      {
        type: 'line',
        shape: {
          x1: end[0],
          y1: end[1] + height / 2,
          x2: end[0],
          y2: end[1] - height / 2
        },
        style: style
      }
    ]
  };
}
option = {
  tooltip: {
    formatter: function (params) {
      return params.marker + params.name + ': ' + params.value[3] + ' ms';
    }
  },
  title: {
    text: 'Profile',
    left: 'center'
  },
  dataZoom: [
    {
      type: 'slider',
      filterMode: 'filter',
      showDataShadow: false,
      labelFormatter: ''
    },
    {
      type: 'inside',
      filterMode: 'filter'
    }
  ],
  grid: {
    height_: 300
  },
  xAxis: {
    type: 'time',
    min: startTime,
    scale: true,
    axisLabel: {
      formatter: function (val) {
        return new Date(val).toISOString().substr(11,5);
      }
    }
  },
  yAxis: {
    data: categories
  },
  series: [
    {
      type: 'custom',
      renderItem: renderItem,
      itemStyle: {
        opacity: 0.8
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: data
    }
  ]
};

 */
</script>
<style scoped>
.el-card {
  margin: 5px;
}
.chart-box {
  height: 200px;
  width: 100%;
  margin: 5px 5px 0px 0px;
}
</style>
