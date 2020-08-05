<template>
  <div id="DataSta">
    <div class="div1">
    <el-table
    :data="tableData"
    height="600"
    stripe
    style="width: 100%"
    :default-sort = "{prop: 'devdata_O3', order: 'descending'}">
      <el-table-column type="index" label="序号" width="50">
    </el-table-column>
      <el-table-column prop="device_id__grid_id_id" label="网格编号" width="100">
    </el-table-column>
      <el-table-column prop="device_id" label="设备编号" width="100">
    </el-table-column>
      <el-table-column prop="devdata_O3" label="参数值" sortable width="100">
    </el-table-column>
  </el-table> 
  </div>
 <div id='echart1' class="echar1"></div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <span class="demonstration"></span>
    <el-date-picker v-model="Value1" type="date" placeholder="选择日期">
    </el-date-picker>
  <el-form-item label="">
    <el-select v-model="formInline.type" placeholder="选择参数类型">
      <el-option label="AQI" value="devdata_AQI"></el-option>
      <el-option label="PM10" value="devdata_PM10"></el-option>
      <el-option label="PM2.5" value="devdata_PM2.5"></el-option>
      <el-option label="SO2" value="devdata_SO2"></el-option>
      <el-option label="CO" value="devdata_CO"></el-option>
      <el-option label="NO2" value="devdata_NO2"></el-option>
      <el-option label="O3" value="devdata_O3"></el-option>
      <el-option label="温度" value="devdata_温度"></el-option>
      <el-option label="湿度" value="devdata_湿度"></el-option>
      <el-option label="风速" value="devdata_风速"></el-option>
      <el-option label="风压" value="devdata_风压"></el-option>
      <el-option label="气压" value="devdata_气压"></el-option>
      <el-option label="光照强度" value="devdata_光照强度"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script type="text/javascript">
import{formatDate} from '@/common/date.js'
import  axios from '@/http/axios.js'
var echarts = require('echarts');
 export default {
    data() {
      return {
          form: '',
          formInline: {
          type: '', 
        },
        Value1: '',
        tableData: [],
      }
    },
     mounted(){
      this.drawEchart1();
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      onSubmit() {
        this.Value1=formatDate(this.Value1);
        //console.log("这是类型",this.formInline.type);
        //console.log("这是时间",this.Value1);
        axios.get('/devicehis/单项数据统计',{params:{
        datafield:this.formInline.type,
        devdata_checktime: this.Value1,
        }})
        .then((response)=>{
        //console.log(response);
        this.tableData=response.data.data;
        var lab1 = [];
        var lab2 = [];
        var lab3 = [];
        //var device_name = this.Value1;
        for (var i = 0; i < this.tableData.length; i++) {
            lab1.push(this.tableData[i].device_id);
            lab2.push(this.tableData[i].devdata_O3);
            lab3.push(this.tableData[i].device_id__grid_id_id);
          }
          //console.log("设备名称:",lab1);
          //console.log("数值:",lab2);
          let max1 = lab2[0];
          lab2.forEach(item => max1 = item > max1 ? item : max1);
          //console.log("最大值",max1);
          this.edata1= lab1; 
          this.edata2= lab2;
          this.ymax = max1;
          //console.log("名称:",this.edata1);
          //console.log("表格数:",this.edata2);    
          //调用绘图函数
          this.drawEchart1();        
          }).catch((error)=>{
          //console.log(error);
          this.$notify.error({
            title: '失败',
            message: '获取数据失败'
          });        
        })
      },
      //折线图
      drawEchart1(){
      var myChart = echarts.init(document.getElementById('echart1'));
      //var that.edata1 = ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6', '设备7', '设备8', '设备9'];
      //var data = [220, 182, 191, 234, 290, 330, 310, 123, 442];
      let that=this;
      //控制y轴上限为获取数据中最大值的1.618倍
      var yMax = that.ymax*1.618;
      var dataShadow = [];
      for (var i = 0; i < that.edata2.length; i++) {
          dataShadow.push(yMax);
      }      
      var option = {
          title: {
              left: 'center',
              text: '设备单项数据图',
          },
          toolbox: { //可视化的工具箱
                show: true,
                itemSize: 18,
                right: 50,
                feature: {
                  dataView: { //数据视图
                      show: true
                  },
                  restore: { //重置
                      show: true
                  },
                  saveAsImage: {//保存图片
                      show: true
                  }
                }
            },
          xAxis: {
              data: that.edata1,
              axisLabel: {
                  inside: true,
                  textStyle: {
                      color: '#fff'
                  }
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              z: 10
          },
          yAxis: {
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  textStyle: {
                      color: '#999'
                  }
              }
          },
          dataZoom: [
              {
                  type: 'inside'
              }
          ],
          series: [
              { // For shadow
                  name: '设备号  阈值',
                  type: 'bar',
                  itemStyle: {
                      color: 'rgba(0,0,0,0.05)'
                  },
                  barGap: '-100%',
                  barCategoryGap: '25%',
                  data: dataShadow,
                  animation: false
              },
              {
                  name: '实时数据',
                  type: 'bar',
                  itemStyle: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      itemStyle: {
                          color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#2378f7'},
                                  {offset: 0.7, color: '#2378f7'},
                                  {offset: 1, color: '#83bff6'}
                              ]
                          )
                      }
                  },
                  data: that.edata2
              }
          ]
      };
      var zoomSize = 6;
      myChart.on('click', function (params) {
          console.log(that.edata1[Math.max(params.dataIndex - zoomSize / 2, 0)]);
          myChart.dispatchAction({
              type: 'dataZoom',
              startValue: that.edata1[Math.max(params.dataIndex - zoomSize / 2, 0)],
              endValue: that.edata1[Math.min(params.dataIndex + zoomSize / 2, that.edata2.length - 1)]
          });
      });
       myChart.setOption(option);
       window.addEventListener('resize', function () {
          myChart.resize()
        });      
      },
    }
  }
</script>

<style type="text/css" scoped>
.demo-form-inline{
  left:10px;
  top:20px;
  position: absolute;
} 
.div1{
  left:580px;
  top:10px;
  font-size: 10px;
  margin-right:10px;
  position: absolute;
}  
.echar1{
  width: 500px;
  height: 400px;
  top: 100px;
  position: absolute;
}
</style>