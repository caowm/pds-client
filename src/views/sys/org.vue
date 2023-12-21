<template>
  <div class="app-container">
    <el-form class="" :inline="true" :model="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      style="width: 100%;">
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="desc"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="tel"
        header-align="center"
        align="center"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="principal"
        header-align="center"
        align="center"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="updated_at"
        header-align="center"
        align="center"
        label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.updated_at | parseTime }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetails(scope.row.id)">查看
          </el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-permission="['admin']" type="text" size="small" @click="deleteHandle(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './org-add-or-update'
import { fetchList, fetchCount, deleteOrg } from '@/api/org'
import permission from '@/directive/permission/index.js'

export default {
  name: 'Org',
  data() {
    return {
      searchForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  directives: { permission },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    async getDataList() {
      console.log(this.$store.state.user.user)
      this.totalPage = await fetchCount({
        'parent': this.$store.state.user.user.org.id,
        'desc_contains': this.searchForm.name || null
      })
      this.dataList = await fetchList({
        '_start': (this.pageIndex - 1) * this.pageSize,
        '_limit': this.pageSize,
        'parent': this.$store.getters.org.id,
        'desc_contains': this.searchForm.name || null
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 查看详情
    showDetails(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, true)
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    async deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await deleteOrg(id)
        if (data) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.getDataList()
        }
      })
    }
  }
}
</script>
