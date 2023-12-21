<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" @keyup.enter.native="getData()">
      <el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.month"
            type="month"
            value-format="yyyy-MM"
            placeholder="月份"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="getData()">查询</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>

    <el-table :data="data" border style="width: 100%;" @expand-change="getDetail">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="margin: -12px 0px">
          <el-table :data="props.row.detail" style="width: 100%; margin-top: 0px" :row-style="rowClass" :show-header="false" :highlight-current-row="false">
            <el-table-column type="index" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="date" header-align="center" align="center" width="" label="日期">
            </el-table-column>
            <el-table-column prop="xishou" header-align="center" align="center" width="" label="洗手(台)">
            </el-table-column>
            <el-table-column prop="xunhui" header-align="center" align="center" width="" label="巡回(台)">
            </el-table-column>
            <el-table-column prop="duration" header-align="center" align="center" width="" label="总工作时长(分钟)">
            </el-table-column>
          </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" header-align="center" width="160px" align="center" label="姓名">
      </el-table-column>
      <el-table-column prop="xishou" header-align="center" align="center" width="160px" label="洗手(台)">
      </el-table-column>
      <el-table-column prop="xunhui" header-align="center" align="center" width="160px" label="巡回(台)">
      </el-table-column>
      <el-table-column prop="duration" header-align="center" align="center" width="160px" label="总工作时长(分钟)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { queryStat } from '@/api/surgery'

export default {
  name: 'StatWorkNurse',
  data() {
    return {
      searchForm: { month: (new Date()).toISOString().substr(0, 7) },
      year: '',
      month: '',
      data: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.year = this.searchForm.month.substr(0, 4)
      this.month = this.searchForm.month.substr(5, 2)
      const data = await queryStat({
        table: 'WorkNurse',
        year: this.year,
        month: this.month
      })
      data.forEach((item) => item.detail = [])
      // this.data 要在设置detail后赋值，否则展开时第一次没数据
      this.data = data
    },
    async getDetail(row) {
      // console.log('expand', row)
      if (row.detail.length > 0) return
      row.detail = await queryStat({
        table: 'WorkNurseDetail',
        year: this.year,
        month: this.month,
        query: {user: row.user_id}
      })
    },
    rowClass({ row, rowIndex }) {
      // 使用row-class-name涉及到scss scoped的类名在打包时会被修改，导致无法使用，所以转向使用row-style
      return { background: '#C0C0C0', font: 'bold 16px 黑体' }
    }
  }
}

</script>

<style lang="scss" scoped>
.app-container {
  .el-table__expanded-cell {
    padding: 0px;
  }
}
</style>
