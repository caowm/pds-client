<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : !disabled ? '修改' : '查看'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-form-item label="编号" prop="name">
        <el-input v-model="dataForm.name" :disabled="disabled" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="desc">
        <el-input v-model="dataForm.desc" :disabled="disabled" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="dataForm.tel" :disabled="disabled" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.address" :disabled="disabled" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="principal">
        <el-input v-model="dataForm.principal" :disabled="disabled" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="!disabled" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fetchOrg, createOrg, updateOrg } from '@/api/org'

export default {
  data() {
    return {
      disabled: false,
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        desc: '',
        tel: '',
        address: '',
        principal: '',
        parent: 0
      },
      dataRule: {
        name: [
          {required: true, message: '编号不能为空', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id, disabled) {
      this.disabled = disabled
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = await fetchOrg(this.dataForm.id)
        }
      })
    },
    // 表单提交
    async dataFormSubmit() {
      this.$refs['dataForm']
        .validate(async(valid) => {
          if (valid) {
            if (this.dataForm.id) {
              await updateOrg(this.dataForm)
            } else {
              this.dataForm.parent = this.$store.getters.org
              await createOrg(this.dataForm)
            }
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
            this.visible = false
            this.$emit('refreshDataList')
          }
        })
    }
  }
}
</script>
