<template>
    <div class="course">
        <el-button type="success" class="mb-20">新增课程</el-button>
        <div class="course-box">
            <el-card v-for="courseItem in courseData" :key="courseItem.id" shadow="always" :body-style="{ padding: '5px' }" class="course-card">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="course-card-image">
                <div class="course-card-content">
                    <span class="course-card-title">{{ courseItem.name }}</span>
                    <div class="clearfix course-card-time">
                        <time class="">{{ courseItem.created_at }}</time>
                        <i class="el-icon-setting fr course-card-setting"></i>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { getCourseList } from '../../api/course'

export default {
  data() {
    return {
      loading: false,
      courseData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      try {
        getCourseList().then(({ code, data }) => {
          if (code === 1) {
            this.courseData = data
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.course-box {
    padding: 15px;
    display: flex;
    .course-card {
        width:250px;
    }
    .course-card-content {
        padding-top:5px;
    }
    .course-card-title {
        font-weight: bold;
    }
    .course-card-image {
        width: 100%;
        display: block;
    }
    .course-card-time {
        padding-top: 5px;
        font-size: 14px;
    }
    .course-card-setting {
        font-size: 18px;
        cursor: pointer;
    }
}
</style>
