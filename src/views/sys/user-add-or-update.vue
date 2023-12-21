<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : !disabled ? '修改' : '查看'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      label-position="left"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-row :gutter="8">
        <el-col span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="dataForm.username" :disabled="disabled" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="停用" prop="blocked">
            <el-switch v-model="dataForm.blocked" :disabled="disabled"></el-switch>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="密码" prop="password">
            <el-input v-model="dataForm.password" :disabled="disabled" placeholder="" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dataForm.email" :disabled="disabled" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="电话" prop="tel">
            <el-input v-model="dataForm.tel" :disabled="disabled" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker v-model="dataForm.birth" type="date" :disabled="disabled" placeholder=""></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col span="8">
          <el-form-item label="头像" prop="avatar">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              name="files"
              :action="$store.getters.baseUrl + '/upload/'"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <el-image
                v-if="dataForm.avatar"
                fit="cover"
                :disabled="disabled"
                style="width: 200px; height: 200px"
                :src="dataForm.avatar ? $store.getters.baseUrl + dataForm.avatar.url : ''">
              </el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="卡号" prop="card">
            <el-input v-model="dataForm.card" :disabled="disabled" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col span="8">
          <el-form-item label="角色" prop="role">
            <el-select v-model="dataForm.role" placeholder="请选择">
              <el-option
                v-for="item in roles.roles"
                :key="item.id"
                :label="item.description"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="科室" prop="office">
            <el-select v-model="dataForm.office" placeholder="请选择">
              <el-option
                v-for="item in offices"
                :key="item.id"
                :label="item.desc"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
        </el-col>
      </el-row>
      <br>
      <br>
      <br>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="!disabled" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fetchUser, createUser, updateUser, upload } from '@/api/user'
import { fetchRoles } from '@/api/role'
import { fetchOffices } from '@/api/org'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      disabled: false,
      visible: false,
      headers: {
        Authorization: getToken()
      },
      roles: [],
      offices: [],
      dataForm: {
        id: 0,
        username: '',
        password: '',
        email: '',
        tel: '',
        birth: null,
        card: '',
        avatar: null,
        role: null,
        office: null,
        blocked: false
      },
      dataRule: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],
        office: [
          { required: true, message: '科室不能为空', trigger: 'blur' }
        ],
        card: [
          { required: true, message: '卡号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async init(id, disabled) {
      this.disabled = disabled
      this.dataForm.id = id || 0
      this.visible = true
      this.roles = await fetchRoles()
      this.offices = await fetchOffices()
      this.$nextTick(async() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.dataForm = await fetchUser(this.dataForm.id)
          this.dataForm.office = this.dataForm.office.id
          this.dataForm.role = this.dataForm.role.id
        }
      })
    },
    // 表单提交
    async dataFormSubmit() {
      this.$refs['dataForm']
        .validate(async(valid) => {
          if (valid) {
            if (this.dataForm.id) {
              await updateUser(this.dataForm)
            } else {
              this.dataForm.org = this.$store.getters.org.id
              await createUser(this.dataForm)
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
    },
    handleAvatarSuccess(res, file) {
      // console.log('upload', res)
      this.dataForm.avatar = res[0]
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
