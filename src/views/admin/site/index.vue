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
          <el-form-item label-width="150px" label="网站公告" align="left" prop="site_notice">
            <el-input v-model="settings.site_notice" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" />
          </el-form-item>
          <el-form-item label-width="150px" label="网站icon" align="left" prop="site_icon">
            <el-upload
              :action="uploadUrl"
              :file-list="uploadedFileList"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-exceed="onExceed"
              :on-success="uploadSuccess"
              name="image"
              :headers="{ Authorization: 'Bearer '+token}"
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
          <el-form-item label-width="150px" label="站长有话" align="left" prop="site_owner_desc">
            <el-input v-model="settings.site_owner_desc" type="input" />
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
import { mapGetters } from 'vuex'

export default {
  name: 'SiteSettings',
  data() {
    return {
      settings: {
        site_name: '',
        site_desc: '',
        site_record: '',
        site_owner: '',
        site_owner_desc: '',
        site_icon: ''
      },
      settingsRules: {
        site_name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        site_desc: [
          { required: true, message: '请输入网站描述', trigger: 'blur' }
        ],
        site_notice: [
          { required: true, message: '请输入网站公告', trigger: 'blur' }
        ],
        site_icon: [
          { required: true, message: '请上传网站icon', trigger: 'blur' }
        ],
        site_record: [
          { required: true, message: '请输入网站备案号', trigger: 'blur' }
        ],
        site_owner: [
          { required: true, message: '请输入网站所属人', trigger: 'blur' }
        ],
        site_owner_desc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      uploadUrl: '',
      dialogVisible: false,
      imageUrl: '',
      uploadedFileList: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
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
        this.imageUrl = result.data.site_icon_url
        this.uploadedFileList.push({
          name: 'site_icon',
          url: result.data.site_icon_url
        })
      }
    },
    submitSettings() {
      this.$refs.settings.validate((valid) => {
        if (valid) {
          settingsSave(this.settings).then((result) => {
            this.$message({
              message: result.msg,
              type: result.code !== 1 ? 'error' : 'success'
            })
          })
        }
      })
    },
    uploadSuccess(response) {
      if (response.code !== 1) {
        this.$alert('上传失败!')
      } else {
        this.settings.site_icon = response.data
      }
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
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
