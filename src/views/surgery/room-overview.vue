<template>
<div  class="app-container">
  <el-row :gutter="10">
    <el-col v-for="(item, index) in overview.rooms" :sm="24" :md="12" :lg="8" :xl="6" :key="index">
      <el-card style="margin-bottom:10px; border-radius:16px; background-image: linear-gradient(to bottom, #1034a6, #e7feff, #e7feff, #e7feff);">
        <div slot="header" class="clearfix" style="">
          <el-row type="flex" style="font: 18px 黑体; text-align: center; ">
            <el-col :span="6" :style="{'color': item.statusColor}">{{item.status}}</el-col>
            <el-col :span="10" :style="{'color': item.statusColor}">{{item.surgery.pat_id}}</el-col>
            <el-col :span="8" :style="{'color': item.statusColor}">{{item.surgery.pat_name}}</el-col>
          </el-row>
        </div>
        <div style="cursor: pointer; " @click="openDetail(item)">
          <el-row type="flex" justify="center" style="align-items: center">
            <el-col :span="4" style="font-size: 60px;">{{item.room}}</el-col>
            <el-col :span="16">
              <el-row>
                <el-col :span="24" style="font-size: 18px; margin-bottom: 8px;">麻醉：{{item.surgery.mzys}}</el-col>
                <el-col :span="24" style="font-size: 18px; margin-bottom: 8px;">医生：{{item.surgery.ss_doctor}}</el-col>
                <el-col :span="24" style="font-size: 18px; margin-bottom: 8px; white-space: nowrap; overflow: hidden">时间：{{item.surgery.rssj | parseNoZoneTime}}</el-col>
                <el-col :span="24" style="font-size: 18px; margin-bottom: 8px; white-space: nowrap; overflow: hidden">手术：{{item.surgery.ssbm_name}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>

</template>

<script>

import { getRoomOverview } from '@/api/surgery'

export default {
  name: 'SurgeryRoomOverview',
  data() {
    return {
      overview: {
        rooms: [],
        going: [],
        coming: []
      }
    }
  },
  mounted() {
    this.getData()
    this.timer = setInterval(() => {
      this.getData()
    }, 60000)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  activated() {
  },
  deactivated() {
    // clearInterval(this.timer)
    // this.timer = null
  },
  methods: {
    async getData() {
      // this.overview = await getRoomOverview('2022-09-20 08:40:00')
      this.overview = await getRoomOverview('')
      this.overview.going.forEach((item) => {
        const room = this.overview.rooms.find(room => room.room === item.ss_room)
        if (room) room.surgery = item
      })
      this.overview.coming.forEach((item) => {
        const room = this.overview.rooms.find(room => room.room === item.ss_room)
        if (room && !room.surgery) room.surgery = item
      })
      this.overview.rooms.forEach((item) => {
        if (!item.surgery) item.surgery = {}
        this.setStatus(item)
      })
      console.log('overview: ', this.overview)
    },
    openDetail(room) {
      this.$router.push({
        name: 'SurgeryRoomDetail',
        params: { surgery: room.surgery, room: room.room, device: room.device_code }
      })
    },
    setStatus(room) {
      if (room.surgery.status) {
        if (room.surgery.status === 'coming') { room.statusColor = '#b0e0e6'; room.status = '下一台'; return }
        if (room.surgery.status === 'finished') { room.statusColor = '#66BB6A'; room.status = '手术结束'; return }
        if (room.surgery.sskssj) { room.statusColor = '#FFD54F'; room.status = '手术开始'; return }
        if (room.surgery.mzkssj) { room.statusColor = '#FFE082'; room.status = '麻醉开始'; return }
        room.statusColor = 'blue'
        room.status = '手术中'
      } else {
        room.statusColor = '#FFD54F'
        room.status = '空闲'
      }
    }
  }
}

</script>
