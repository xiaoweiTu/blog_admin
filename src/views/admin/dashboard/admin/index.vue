<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { getArticlesInSeven, getClickedInSeven } from '../../../../api/site'

const lineChartData = {
  articles: {
    actualData: [0],
    bottomName: []
  },
  clicks: {
    actualData: [0],
    bottomName: []
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
    // RaddarChart,
    // PieChart,
    // BarChart,
  },
  data() {
    return {
      lineChartData: lineChartData.articles
    }
  },
  created() {
    this.articleInSeven()
    this.clickedInSeven()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    async articleInSeven() {
      const res = await getArticlesInSeven()
      if (res.code === 1) {
        const data = res.data
        lineChartData.articles.actualData = data.map((item) => {
          return item.total
        })
        lineChartData.articles.bottomName = data.map((item) => {
          return item.created_at.substr(0, 10)
        })
      }
    },
    async clickedInSeven() {
      const res = await getClickedInSeven()
      if (res.code === 1) {
        const data = res.data
        lineChartData.clicks.actualData = data.map((item) => {
          return item.total
        })
        lineChartData.clicks.bottomName = data.map((item) => {
          return item.created_at.substr(0, 10)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
