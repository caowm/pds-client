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
    <div class="header"><p>{{year}}年度 各科室手术工作量（例数）</p></div>
    <stat-table :data="officeData" head-name="科室" ></stat-table>
    <div class="header"><p>{{year}}年度 手术室麻醉工作量（例数）</p></div>
    <stat-table :data="anesthMethodData" head-name="麻醉方法" ></stat-table>
    <h3></h3>
    <stat-table :data="asaData" head-name="ASA分级" ></stat-table>
    <h3></h3>
    <stat-table :data="anesthResultData" head-name="麻醉效果" ></stat-table>
  </div>
</template>

<script>

import { queryStat } from '@/api/surgery'

const stat_table = {
  template: '<el-table\n' +
    '      :data="data"\n' +
    '      border\n' +
    '      show-summary\n' +
    '      style="width: 100%; margin: 20px 0px">\n' +
    '      <el-table-column\n' +
    '        prop="name"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width="150px"\n' +
    '        :label="headName">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m1"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="一月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m2"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="二月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m3"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="三月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m4"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="四月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m5"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="五月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m6"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="六月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m7"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="七月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m8"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="八月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m9"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="九月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m10"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="十月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m11"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="十一月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="m12"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="十二月">\n' +
    '      </el-table-column>\n' +
    '      <el-table-column\n' +
    '        prop="total"\n' +
    '        header-align="center"\n' +
    '        align="center"\n' +
    '        width=""\n' +
    '        label="合计">\n' +
    '      </el-table-column>\n' +
    '    </el-table>',
  props: ['data', 'headName']
}

export default {
  name: 'StatWorkCount',
  components: {
    'stat-table': stat_table
  },
  data() {
    return {
      searchForm: { year: (new Date()).getFullYear().toString() },
      year: null,
      officeData: [],
      anesthMethodData: [],
      asaData: [],
      anesthResultData: []
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
      this.year = this.searchForm.year;
      this.officeData = await queryStat({ table: 'WorkOffice', year: this.year })
      this.anesthMethodData = await queryStat({ table: 'WorkAnesthMethod', year: this.year })
      this.asaData = await queryStat({ table: 'WorkAsa', year: this.year })
      this.anesthResultData = await queryStat({ table: 'WorkAnesthResult', year: this.year })
    }
  }
}

</script>

<style lang="scss" scoped>
.app-container {
  > .header {
    padding: 8px 16px;
    background: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;

    > p {
      margin-block-start: 1em;
      margin-block-end: 1em;
      line-height: 1.5em;
    }
  }
}
</style>
