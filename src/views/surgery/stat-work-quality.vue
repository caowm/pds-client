<template>
  <div  class="app-container">
    <el-form :inline="true" :model="searchForm" @keyup.enter.native="getData()">
      <el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.year"
            type="year"
            value-format="yyyy"
            placeholder="年度">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData()">查询</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-table
      :data="data"
      :span-method="spanGroup"
      border
      style="width: 100%;">
      <el-table-column
        prop="group"
        header-align="center"
        align="left"
        width="150px"
        label="指标名称">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="150px"
        label="指标内容">
      </el-table-column>
      <el-table-column
        prop="m1"
        header-align="center"
        align="center"
        width=""
        label="一月">
      </el-table-column>
      <el-table-column
        prop="m2"
        header-align="center"
        align="center"
        width=""
        label="二月">
      </el-table-column>
      <el-table-column
        prop="m3"
        header-align="center"
        align="center"
        width=""
        label="三月">
      </el-table-column>
      <el-table-column
        prop="m4"
        header-align="center"
        align="center"
        width=""
        label="四月">
      </el-table-column>
      <el-table-column
        prop="m5"
        header-align="center"
        align="center"
        width=""
        label="五月">
      </el-table-column>
      <el-table-column
        prop="m6"
        header-align="center"
        align="center"
        width=""
        label="六月">
      </el-table-column>
      <el-table-column
        prop="m7"
        header-align="center"
        align="center"
        width=""
        label="七月">
      </el-table-column>
      <el-table-column
        prop="m8"
        header-align="center"
        align="center"
        width=""
        label="八月">
      </el-table-column>
      <el-table-column
        prop="m9"
        header-align="center"
        align="center"
        width=""
        label="九月">
      </el-table-column>
      <el-table-column
        prop="m10"
        header-align="center"
        align="center"
        width=""
        label="十月">
      </el-table-column>
      <el-table-column
        prop="m11"
        header-align="center"
        align="center"
        width=""
        label="十一月">
      </el-table-column>
      <el-table-column
        prop="m12"
        header-align="center"
        align="center"
        width=""
        label="十二月">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { queryStat } from '@/api/surgery'

export default {
  name: 'StatWorkQuality',
  data() {
    return {
      searchForm: { year: (new Date()).getFullYear().toString() },
      year: null,
      data: []
    }
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
  },
  activated() {
  },
  deactivated() {
  },
  methods: {
    async getData() {
      this.year = this.searchForm.year
      this.data = await queryStat({ table: 'WorkQuality', year: this.year })
    },
    spanGroup({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 1) return
      if (columnIndex === 1) return this.data[rowIndex].name || this.data[rowIndex].group === 'ASA分级' ? [1, 1] : [0, 0]
      if (rowIndex > 0 && this.data[rowIndex].group === this.data[rowIndex - 1].group) {
        return { rowspan: 0, colspan: 0 }
      }
      let span = 0
      while (rowIndex + span < this.data.length - 1) {
        if (this.data[rowIndex].group !== this.data[rowIndex + span + 1].group) break
        span++
      }
      return { rowspan: span + 1, colspan: span > 0 || this.data[rowIndex].name ? 1 : 2 }
    }
  }
}

</script>

<style lang="scss" scoped>
.app-container {

}
</style>
