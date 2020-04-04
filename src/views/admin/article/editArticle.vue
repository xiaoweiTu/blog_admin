<template>
  <div class="editor-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="articleParams" :model="articleParams" :rules="articleRules" label-position="left">
          <el-form-item label-width="150px" label="文章标题" align="left" prop="title">
            <el-input v-model="articleParams.title" type="text" />
          </el-form-item>
          <el-form-item label-width="150px" label="文章描述" align="left" prop="description">
            <el-input v-model="articleParams.description" type="textarea" />
          </el-form-item>
          <el-form-item label-width="150px" label="文章主图" align="left" prop="icon">
            <el-upload
              class="avatar-uploader"
              name="image"
              :action="uploadAction"
              :headers="uploadHeaders"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
            >
              <img v-if="articleParams.icon" :src="articleParams.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label-width="150px" label="文章状态" prop="status">
            <el-select v-model="articleParams.status" placeholder="请选择文章状态">
              <statusComponent />
            </el-select>
          </el-form-item>
          <el-form-item label-width="150px" label="标签" prop="tag_id">
            <el-select v-model="articleParams.tag_id" clearable placeholder="标签">
              <el-option v-for="(item) in tagList" :key="item.id" :label="item.name" :value="Number(item.id)">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.type_name }} ({{ item.status_name }})</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" label-width="150px" prop="level">
            <el-input v-model="articleParams.level" type="number" min="1" max="128" class="w-200" />
          </el-form-item>
          <el-form-item label="文章内容：" prop="content"/>
          <markdown-editor
            ref="markdownEditor"
            v-model="markdownContent"
            language="zh_CN"
            height="600px"
          />

          <el-form-item>
            <el-button type="success" class="fr mt-15" @click="submitArticle">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { articleSave, getArticleRow } from '../../../api/article'
import { getAllTags } from '../../../api/tag'
import statusComponent from '../components/status'
import { mapGetters } from 'vuex'
import { getToken } from '../../../utils/auth'

export default {
  name: 'EditArticle',
  components: { MarkdownEditor, statusComponent },
  data() {
    return {
      articleParams: {
        title: '',
        status: '',
        tag_id: '',
        level: 1,
        content: '',
        icon: '',
        description: ''
      },
      markdownContent: '',
      articleRules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '主图不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        tag_id: [
          { required: true, message: '标签不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      },
      article_id: 0,
      tagList: [],
      uploadAction: '',
      uploadHeaders: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.tags()
    this.getArticle()
    this.uploadAction = process.env.VUE_APP_UPLOAD_ACTION
    this.uploadHeaders = {
      Authorization: 'Bearer ' + getToken()
    }
  },
  methods: {
    async getArticle() {
      if (this.$route.query.id) {
        const res = await getArticleRow({ id: this.$route.query.id })
        if (res.code === 1) {
          this.articleParams.title = res.data.title
          this.article_id = res.data.id
          this.articleParams.tag_id = res.data.tag_id === 0 ? '' : res.data.tag_id
          this.articleParams.status = res.data.status
          this.articleParams.level = res.data.level
          this.articleParams.icon = res.data.icon
          this.articleParams.description = res.data.description
          this.markdownContent = this.$refs.markdownEditor.setHtml(res.data.content)
        }
      }
    },
    // 提交
    submitArticle() {
      this.articleParams.content = this.$refs.markdownEditor.getHtml()
      if (this.articleParams.content === '') {
        this.$message({
          message: '内容不能为空',
          type: 'error'
        })
        return false
      }
      if (this.article_id !== 0) {
        this.articleParams.id = this.article_id
      }
      this.$refs.articleParams.validate((valid) => {
        if (valid) {
          try {
            articleSave(this.articleParams).then(({ code, msg }) => {
              if (code === 1) {
                this.$message({
                  message: msg,
                  type: 'success'
                })
              }
            })
          } catch (e) {
            this.$message({
              message: e.message,
              type: 'error'
            })
          }
        } else {
          console.log(valid)
          return false
        }
      })
    },
    async tags() {
      const res = await getAllTags()
      if (res.code === 1) {
        this.tagList = res.data
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.articleParams.icon = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.editor-container {
    padding: 50px 50px;
    .w-200 {
        width: 200px;
    }
  .avatar-uploader  {
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
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
}
</style>
