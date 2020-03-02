<template>
  <div class="editor-container">
      <el-row>
          <el-col :span="24">
              <el-form ref="articleParams" :model="articleParams" :rules="articleRules" label-position="left">
                  <el-form-item label-width="150px" label="文章标题" align="left" prop="article_title">
                      <el-input v-model="articleParams.article_title" type="text"></el-input>
                  </el-form-item>
                  <el-form-item label-width="150px" label="文章描述" align="left" prop="article_desc">
                      <el-input
                              v-model="articleParams.article_desc"
                              type="textarea"
                              :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                  </el-form-item>
                  <el-form-item label-width="150px" label="文章类型">
                      <el-select v-model="articleParams.article_type" placeholder="请选择文章类型" clearable>
                          <el-option v-for="(typeItem,key) of typeMappings" :key="key" :label="typeItem" :value="Number(key)"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label-width="150px" label="文章状态">
                      <el-select v-model="articleParams.article_status" placeholder="请选择文章状态" clearable>
                          <el-option v-for="(statusItem,key) of statusMappings" :key="key" :label="statusItem" :value="Number(key)"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label-width="150px" label="标签">
                      <el-select v-model="articleParams.tag_id" clearable placeholder="标签">
                          <el-option v-for="(item) in tagList" :key="item.id" :label="item.tag_name" :value="Number(item.id)">
                              <span style="float: left">{{ item.tag_name }}</span>
                              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tag_type_name }} ({{ item.status_name }})</span>
                          </el-option>
                      </el-select>
                  </el-form-item>
                    <el-form-item label="是否推荐" label-width="150px" clearable filterable>
                        <el-select v-model="articleParams.is_recommend">
                            <el-option value="2" label="不推荐"></el-option>
                            <el-option value="1" label="推荐"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序" label-width="150px">
                        <el-input v-model="articleParams.article_level" type="number" min="1" max="128" class="w-200"></el-input>
                    </el-form-item>
                  <el-form-item label="文章内容："></el-form-item>
                  <markdown-editor
                          ref="markdownEditor"
                          v-model="markdownContent"
                          language="zh_CN"
                          height="600px"/>

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
import { articleSave, getTags, getArticleRow } from '../../api/article'
import { getStatusMapping, getTypeMapping } from '../../api/status'

export default {
  name: 'EditArticle',
  components: { MarkdownEditor },
  data() {
    return {
      articleParams: {
        article_title: '',
        article_desc: '',
        article_type: '',
        article_status: '',
        tag_id: '',
        is_recommend: '',
        article_level: 1,
        article_content: ''
      },
      markdownContent: '',
      articleRules: {
        article_title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        article_desc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      article_id: 0,
      typeMappings: [],
      statusMappings: [],
      tagList: []
    }
  },
  created() {
    this.typeMapping()
    this.statsMapping()
    this.tags()
    this.getArticle()
  },
  methods: {
    async getArticle() {
      if (this.$route.query.id) {
        const res = await getArticleRow({ article_id: this.$route.query.id })
        if (res.code === 1) {
          this.articleParams.article_title = res.data.article_title
          this.article_id = res.data.id
          this.articleParams.tag_id = res.data.tag_id === 0 ? '' : res.data.tag_id
          this.articleParams.article_desc = res.data.article_desc
          this.articleParams.article_type = res.data.article_type
          this.articleParams.article_status = res.data.article_status
          this.articleParams.is_recommend = String(res.data.is_recommend)
          this.articleParams.article_level = res.data.article_level
          this.markdownContent = this.$refs.markdownEditor.setHtml(res.data.article_content)
        }
      }
    },
    // 提交
    submitArticle() {
      this.articleParams.article_content = this.$refs.markdownEditor.getHtml()
      if (this.articleParams.article_content === '') {
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
          console.log('error')
          return false
        }
      })
    },
    typeMapping() {
      getTypeMapping().then(({ code, data }) => {
        if (code === 1) {
          this.typeMappings = data
        }
      })
    },
    statsMapping() {
      getStatusMapping().then(({ code, data }) => {
        if (code === 1) {
          this.statusMappings = data
        }
      })
    },
    async tags() {
      const res = await getTags()
      if (res.code === 1) {
        this.tagList = res.data
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
}
</style>
