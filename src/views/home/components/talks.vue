<template>
  <el-row class="talk">
    <el-col :span="24">
      <div class="header clearfix">
        <el-input class="input" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        <el-button class="btn">评论</el-button>
      </div>
      <div class="content">
        <p><span style="font-weight: 700;margin-right: 10px;">全部评论</span>359</p>
        <div class="talk-item">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585538972328&di=9c1410d95611ddf80926d4e96afbecf6&imgtype=0&src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2F11385343fbf2b211bc511469ffbb393e0cd78e5f.jpeg%3Ftoken%3Dca3924044b462f7531cbed75fe644617" alt="" class="avatar">
          <div class="talks">
            <div class="name">
              万玉玉
            </div>
            <span class="words">这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗</span>
            <div class="foot clearfix">
              <div class="time">
                2小时前
              </div>
              <div class="info">
              <span style="padding:0 10px;">
                <i class="el-icon-chat-dot-round">&nbsp;2</i>
              </span>
                <span>
                <i class="el-icon-star-off">&nbsp;52</i>
              </span>
              </div>
            </div>
          </div>

        </div>
        <div class="talk-item">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585538972328&di=9c1410d95611ddf80926d4e96afbecf6&imgtype=0&src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2F11385343fbf2b211bc511469ffbb393e0cd78e5f.jpeg%3Ftoken%3Dca3924044b462f7531cbed75fe644617" alt="" class="avatar">
          <div class="talks">
            <div class="name">
              万玉玉
            </div>
            <span class="words">这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗这么厉害的吗</span>
            <div class="foot clearfix">
              <div class="time">
                2小时前
              </div>
              <div class="info">
              <span style="padding:0 10px;">
                <i class="el-icon-chat-dot-round">&nbsp;2</i>
              </span>
                <span>
                <i class="el-icon-star-off">&nbsp;52</i>
              </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Talks'
}
</script>

<style scoped lang="scss">
.talk {
  .header {
    padding-bottom:35px;
    border-bottom:1px solid #E0EEEE;
    .input{
      /deep/ .el-textarea__inner {
        background-color: #f7f7f7;
      }
    }
    .btn {
      float: right;
      margin-top: 15px;
    }
  }
  .content {
    padding-top: 20px;
    .talk-item {
      margin-top: 30px;
      .avatar {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
      }
      .talks {
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        width: 90%;
        .name {
          font-weight: 700;
        }
        .words {
          padding:15px 0 15px 0;
          display: inline-block;
        }
        .foot {
          font-size: 13px;
          color: #a2a2a2;
          .time {
            float: left;
          }
          .info {
            float: right;
            padding-right: 10px;
          }
        }
      }
    }

  }

}
</style>
