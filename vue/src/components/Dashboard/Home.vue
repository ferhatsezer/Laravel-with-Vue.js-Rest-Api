<template>
  <div class="row" id="charts">
    <div class="col-md-6">
      <div id="chart1"></div>
    </div>
    <div class="col-md-6">
      <div id="chart2"></div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      Highcharts: require('highcharts'),
      series: {
        title : {
          text : ''
        },
        data: [
          {
            name: 'Chrome',
            y: 61.41,
          }
        ]
      }
    }
  },
  created() {
    this.$swal.showLoading();
    axios.get('/users-reports',  {
      headers : {
        'Authorization' : 'Bearer ' + this.$store.getters.getToken
      }
    }).then(response => {

      let responseData = response.data;
      this.series.data = responseData.data;
      this.series.title.text = responseData.title;
      this.initCharts();

    }).catch(() => {
      // this.$store.dispatch('logout');
    }).finally(() => {
      this.$swal.close();
    });
  },
  methods : {
    initCharts() {
      require('highcharts/modules/exporting')(this.Highcharts);
      this.Highcharts.chart('chart1', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.series.title.text
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Kullanıcılar',
          colorByPoint: true,
          data: this.series.data
        }]
      });
      this.Highcharts.chart('chart2', {
        chart: {
          type: 'column'
        },
        title: {
          text: this.series.title.text
        },
        subtitle: {
          text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total percent market share'
          }

        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
            }
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> Toplam <br/>'
        },

        series: [
          {
            name: "Kullanıcılar",
            colorByPoint: true,
            data: this.series.data
          }
        ],
      });
    }
  }
}
</script>

<style scoped>
#charts {
  margin: 100px 0;
}
</style>