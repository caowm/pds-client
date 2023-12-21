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

    <el-table :data="data" border style="width: 100%;">
      <el-table-column prop="user_name" header-align="center" align="center" label="麻醉医生" fixed>
      </el-table-column>
      <el-table-column prop="total" header-align="center" align="center" width="67px" label="总例数" fixed>
      </el-table-column>
      <el-table-column prop="duration" header-align="center" align="center" width="67px" label="总时长(分钟)">
      </el-table-column>
      <el-table-column label="ASA分级" header-align="center">
        <el-table-column prop="asa_1" header-align="center" align="center" width="67px" label="Ⅰ级">
        </el-table-column>
        <el-table-column prop="asa_2" header-align="center" align="center" width="67px" label="Ⅱ级">
        </el-table-column>
        <el-table-column prop="asa_3" header-align="center" align="center" width="67px" label="Ⅲ级">
        </el-table-column>
        <el-table-column prop="asa_4" header-align="center" align="center" width="67px" label="Ⅳ级">
        </el-table-column>
        <el-table-column prop="asa_5" header-align="center" align="center" width="67px" label="Ⅴ级">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="jizheng" header-align="center" align="center" width="67px" label="急症">
      </el-table-column>
      <el-table-column label="麻醉类型" header-align="center">
        <el-table-column label="全麻" header-align="center">
          <el-table-column prop="anesth_qm_cg" header-align="center" align="center" width="67px" label="插管全麻">
          </el-table-column>
          <el-table-column prop="anesth_qm_ncg" header-align="center" align="center" width="67px" label="非插管全麻">
          </el-table-column>
          <el-table-column prop="anesth_qm" header-align="center" align="center" width="67px" label="合计">
          </el-table-column>
        </el-table-column>
        <el-table-column label="椎管内麻醉" header-align="center">
          <el-table-column prop="anesth_yylh" header-align="center" align="center" width="67px" label="腰-硬联合">
          </el-table-column>
          <el-table-column prop="anesth_lym" header-align="center" align="center" width="67px" label="连硬麻">
          </el-table-column>
          <el-table-column prop="anesth_ym" header-align="center" align="center" width="67px" label="腰麻">
          </el-table-column>
          <el-table-column prop="anesth_zgn" header-align="center" align="center" width="67px" label="合计">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="anesth_sjzz" header-align="center" align="center" width="67px" label="神经阻滞">
        </el-table-column>
        <el-table-column prop="anesth_jm" header-align="center" align="center" width="67px" label="局麻">
        </el-table-column>
      </el-table-column>
      <el-table-column label="麻醉效果" header-align="center">
        <el-table-column prop="anesth_1" header-align="center" align="center" width="67px" label="Ⅰ级">
        </el-table-column>
        <el-table-column prop="anesth_2" header-align="center" align="center" width="67px" label="Ⅱ级">
        </el-table-column>
        <el-table-column prop="anesth_3" header-align="center" align="center" width="67px" label="Ⅲ级">
        </el-table-column>
        <el-table-column prop="anesth_4" header-align="center" align="center" width="67px" label="Ⅳ级">
        </el-table-column>
      </el-table-column>
      <el-table-column label="麻醉效果比率" header-align="center">
        <el-table-column prop="anesth_p1" header-align="center" align="center" width="67px" label="Ⅰ级">
        </el-table-column>
        <el-table-column prop="anesth_p2" header-align="center" align="center" width="67px" label="Ⅱ级">
        </el-table-column>
        <el-table-column prop="anesth_p3" header-align="center" align="center" width="67px" label="Ⅲ级">
        </el-table-column>
        <el-table-column prop="anesth_p4" header-align="center" align="center" width="67px" label="Ⅳ级">
        </el-table-column>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

import { queryStat } from '@/api/surgery'

export default {
  name: 'StatWorkAnesthDoctor',
  data() {
    return {
      searchForm: { month: (new Date()).toISOString().substr(0, 7) },
      data: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.data = await queryStat({
        table: 'WorkAnesthDoctor',
        year: this.searchForm.month.substr(0, 4),
        month: this.searchForm.month.substr(5, 2)
      })
      this.data.forEach(item => {
        item.anesth_qm = item.anesth_qm_cg + item.anesth_qm_ncg
        item.anesth_zgn = item.anesth_yylh + item.anesth_lym + item.anesth_ym
        item.anesth_total = item.anesth_1 + item.anesth_2 + item.anesth_3 + item.anesth_4
        item.anesth_p1 = (item.anesth_1 / item.anesth_total * 100).toFixed() + '%'
        item.anesth_p2 = (item.anesth_2 / item.anesth_total * 100).toFixed() + '%'
        item.anesth_p3 = (item.anesth_3 / item.anesth_total * 100).toFixed() + '%'
        item.anesth_p4 = (item.anesth_4 / item.anesth_total * 100).toFixed() + '%'
      })
    }
  }
}

</script>
