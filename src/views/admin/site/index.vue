<template>
  <div class="site-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="settings" :model="settings" :rules="settingsRules" label-position="left">
          <el-form-item label-width="150px" label="网站名称" align="left" prop="site_name">
            <el-input v-model="settings.site_name" type="text" />
          </el-form-item>
          <el-form-item label-width="150px" label="网站描述" align="left" prop="site_desc">
            <el-input v-model="settings.site_desc" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" />
          </el-form-item>
          <el-form-item label-width="150px" label="网站icon" align="left" prop="site_icon">
            <el-upload
              :action="uploadUrl"
              :file-list="uploadedFileList"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-exceed="onExceed"
              :on-success="uploadSuccess"
              name="image"
              :limit="1"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="imageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label-width="150px" label="备案号" align="left" prop="site_record">
            <el-input v-model="settings.site_record" type="input" />
          </el-form-item>
          <el-form-item label-width="150px" label="站长" align="left" prop="site_owner">
            <el-input v-model="settings.site_owner" type="input" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="fr mt-15" @click="submitSettings">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSettings, settingsSave } from '../../../api/site'

export default {
  name: 'SiteSettings',
  data() {
    return {
      settings: {
        site_name: '',
        site_desc: '',
        site_record: '',
        site_owner: '',
        site_icon: ''
      },
      settingsRules: {
      },
      uploadUrl: '',
      dialogVisible: false,
      imageUrl: '',
      uploadedFileList: []
    }
  },
  created() {
    this.uploadUrl = process.env.VUE_APP_BASE_API_UPLOAD
    this.siteSettings()
  },
  methods: {
    async siteSettings() {
      const result = await getSettings()
      if (result.code === 1 && result.data !== null) {
        this.settings = result.data
        this.uploadedFileList.push({
          name: 'site_icon',
          url: process.env.VUE_APP_BASE_API_UPLOADED + this.settings.site_icon
        })
      }
    },
    async submitSettings() {
      const result = await settingsSave(this.settings)
      if (result.code !== 1) {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      } else {
        this.$message({
          message: result.msg,
          type: 'success'
        })
      }
    },
    uploadSuccess(response) {
      if (response.code !== 1) {
        this.$alert('上传失败!')
      } else {
        this.settings.site_icon = response.data
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
      this.imageUrl = process.env.VUE_APP_BASE_API_UPLOADED + this.settings.site_icon
    },
    onExceed() {
      this.$alert('只能上传一个icon!')
    }
  }
}
</script>

<style scoped lang="scss">
.site-container {
    padding: 50px 50px;
    .w-200 {
        width: 200px;
    }
}
</style>
