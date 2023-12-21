<template>
  <div class="app-container">
    <el-form class="" :inline="true" :model="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="用户名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      style="width: 100%;"
    >
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户名"
      />
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱"
      />
      <el-table-column
        prop="tel"
        header-align="center"
        align="center"
        label="电话"
      />
      <el-table-column
        prop="card"
        header-align="center"
        align="center"
        label="卡号"
      />
      <el-table-column
        width="120px"
        prop="birth"
        header-align="center"
        align="center"
        label="出生日期"
      />
      <el-table-column
        width="120px"
        header-align="center"
        align="center"
        label="头像"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar ?  baseUrl + scope.row.avatar.url : ''" fit="cover" style="width: 100px; height: 100px">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        prop="office.desc"
        header-align="center"
        align="center"
        label="科室"
      />
      <el-table-column
        width="120px"
        prop="role.description"
        header-align="center"
        align="center"
        label="角色"
      />
      <el-table-column
        prop="blocked"
        header-align="center"
        align="center"
        width="80px"
        label="停用"
      >
        <template slot-scope="scope">
          <el-switch
            :disabled="true"
            v-model="scope.row.blocked">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-permission="['admin']" type="text" size="small" @click="deleteHandle(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './user-add-or-update'
import { fetchList, fetchCount, deleteUser } from '@/api/user'
import permission from '@/directive/permission/index.js'

export default {
  name: 'User',
  components: {
    AddOrUpdate
  },
  directives: { permission },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
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
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    async getDataList() {
      this.totalPage = await fetchCount({
        'org': this.$store.state.user.user.org.id,
        'username_contains': this.searchForm.name || null,
        'role.type_ne': 'car'
      })
      this.dataList = await fetchList({
        '_start': (this.pageIndex - 1) * this.pageSize,
        '_limit': this.pageSize,
        'org': this.$store.getters.org.id,
        'username_contains': this.searchForm.name || null,
        'role.type_ne': 'car'
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
    resetPassword(id) {
      this.$confirm(`确定对[id=${id}]进行[重置密码]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {

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
      }).then(async() => {
        const data = await deleteUser(id)
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
