<template>
  <div class="talk-container">
    <div class="post-wrap clearfix">
      <el-input v-model="content" type="textarea" placeholder="请输入评论" />
      <el-button size="small" class="fr sub-btn" @click="postTalk()">提交</el-button>
    </div>
    <div class="talk-list-wrap">
      <el-timeline v-for="item in talks" :key="item.id">
        <el-timeline-item :timestamp="item.created_at" placement="top">
          <el-card>
            <h5 style="font-weight: 400;">{{ item.content }}</h5>
            <p style="color:gray ">
              <span class="bold">{{ item.user.name }}</span> 提交于
              <span class="font-ita">{{ item.created_at }}</span>
              <el-button size="mini" class="fr" @click="openTalkDialog(item.id,item.user_id)">回复</el-button>
            </p>
            <div v-if="item.child.length > 0">
              <el-timeline v-for="childItem in item.child" :key="childItem.id">
                <el-timeline-item :timestamp="childItem.created_at" placement="top">
                  <el-card>
                    <h5 style="font-weight: 400;">{{ childItem.content }}</h5>
                    <p style="color:gray"> <span class="bold">{{ childItem.user.name }}</span>
                      回复
                      <span class="bold">{{ childItem.to_user.name }}</span> - 提交于
                      <span class="font-ita">{{ childItem.created_at }}</span>
                      <el-button size="mini" class="fr" @click="openTalkDialog(item.id,item.user_id)">回复</el-button></p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-dialog title="评论" :visible.sync="dialogFormVisible">
      <el-input v-model="content" type="textarea" placeholder="请输入评论" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPostTalk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { talkList, talk } from '../../../api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'TalkList',
  props: {
    articleId: {
      type: Number,
      default: 0
    },
    isArticle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      talks: [],
      content: '',
      dialogFormVisible: false,
      toId: 0,
      toUserId: 0
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    if (this.isArticle && this.articleId === 0) {
      this.$message.error('文章ID不能为空!')
      return
    }
    this.getTalkList()
  },
  methods: {
    async getTalkList() {
      const res = await talkList({ article_id: this.articleId })
      if (res.code === 1) {
        this.talks = this.getChildTalks(res.data)
      }
    },
    getChildTalks(talks) {
      const childTalks = []
      talks.forEach(function(val) {
        if (val.to_id === 0) {
          val.child = []
          talks.forEach(function(v) {
            if (v.to_id === val.id) {
              val.child.push(v)
            }
          })
          childTalks.push(val)
        }
      })
      return childTalks
    },
    async postTalk() {
      if (this.id === '' || this.id === undefined) {
        this.$message.error('请先登录!')
        return
      }
      if (this.content === '') {
        this.$message.error('请输入评论内容!')
        return
      }
      const res = await talk({ user_id: this.id, to_user_id: this.toUserId, article_id: this.articleId, to_id: this.toId, content: this.content })
      this.$message({
        message: res.msg,
        type: res.code === 1 ? 'success' : 'error'
      })
      if (res.code === 1) {
        this.content = ''
        this.getTalkList()
      }
    },
    openTalkDialog(toId, toUserId) {
      this.dialogFormVisible = true
      this.toId = toId
      this.toUserId = toUserId
    },
    dialogPostTalk() {
      this.dialogFormVisible = false
      this.postTalk()
    }
  }
}
</script>

<style scoped lang="scss">
.talk-container {
  width: 100%;
  padding:15px;
  .post-wrap {
      .sub-btn {
        margin-top: 15px;
      }
  }
}
.bold {
  font-weight: bold;
}
.font-ita {
  font-style: italic;
}
</style>
