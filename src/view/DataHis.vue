<template>
  <div id="DataHis"> 
      <div class="div1">
    <el-table
    :data="tableData"
    height="600"
    stripe
    style="width: 100%"
    :default-sort = "{prop: 'devicehis_checktime', order: 'descending'}">
     <el-table-column type="index" label="序号" width="60">
    </el-table-column>
    <el-table-column prop="devicehis_checktime" label="日期" sortable width="190">
    </el-table-column>
      <el-table-column prop="devicehis_O3" label="参数值" width="100">
    </el-table-column>
  </el-table> 
  </div>
   <div class="block">
    <!-- <span class="demonstration">时间选择</span> -->
    <el-date-picker
      v-model="Value1"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="">
    <el-input v-model="formInline.number" placeholder="输入设备编号"></el-input>
  </el-form-item>
  <el-form-item label="">
    <el-select v-model="formInline.type" placeholder="选择参数类型">
      <el-option label="AQI" value="devicehis_AQI"></el-option>
      <el-option label="PM10" value="devicehis_PM10"></el-option>
      <el-option label="PM2.5" value="devicehis_PM2.5"></el-option>
      <el-option label="SO2" value="devicehis_SO2"></el-option>
      <el-option label="CO" value="devicehis_CO"></el-option>
      <el-option label="NO2" value="devicehis_NO2"></el-option>
      <el-option label="O3" value="devicehis_O3"></el-option>
      <el-option label="温度" value="devicehis_温度"></el-option>
      <el-option label="湿度" value="devicehis_湿度"></el-option>
      <el-option label="风速" value="devicehis_风速"></el-option>
      <el-option label="风压" value="devicehis_风压"></el-option>
      <el-option label="气压" value="devicehis_气压"></el-option>
      <el-option label="光照强度" value="devicehis_光照强度"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
<div id='echart1' class="echart"></div>
  </div>
</div>
</template>

<script>
import{formatDate} from '@/common/date.js'
import  axios from '@/http/axios.js'
var echarts = require('echarts');
export default {
  name: 'App',
  data() {
      return {
          form: '',
          formInline: {
          number: '',
          type: ''
        },        
          Value1: '',
          tableData: [],
          pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },  
      }
    },
    mounted(){
      this.drawEchart1();
    },
      methods:{
       formatter(row, column) {
        return row.address;
      },
      onSubmit() {
      this.Value1[0]=formatDate(this.Value1[0]);
      //console.log("开始时间",this.Value1[0]);
      this.Value1[1]=formatDate(this.Value1[1]);
      //console.log("结束时间",this.Value1[1]);
       for (var i = 0; i < this.Value1.length; i++) {
      this.Value1[i] =/\d{4}-\d{2}-\d{2}/g.exec(this.Value1[i])[0];
       }
      for(var i=0;i<this.tableData.length;i++){  
      if(this.Value1[0]<=this.tableData[i].date){
      if(this.Value1[1]>=this.tableData[i].date) {
        this.tableData.push(this.tableData[i])
      }
    }
  }     //console.log("截取数值:",this.Value1);
        //console.log("这是类型",this.formInline.type);
        //console.log("这是设备号",this.formInline.number);
        axios.get('/devicehis/历史数据统计-设备id',{params:{
        datafield: this.formInline.type,
        start_time: this.Value1[0],
        end_time: this.Value1[1],
        device_id: this.formInline.number,
        }})
        .then((response)=>{
        //console.log(response);
        this.tableData=response.data.data;
        var lab1 = [];
        var lab2 = [];
        for (var i = 0; i < this.tableData.length; i++) {
            lab1.push(this.tableData[i].devicehis_checktime);
            lab2.push(this.tableData[i].devicehis_O3);
          }
        //console.log("设备时间:",lab1);
        //console.log("数值:",lab2);
        // 截取时间
        for (var i = 0; i < lab1.length; i++) {
        lab1[i] =/\d{4}-\d{2}-\d{2}/g.exec(lab1[i])[0];
         }
         //console.log("截取后数值:",lab1);
        var lab3 =[];
        for(var a=0;a<=lab1.length;a++){
        lab3[a]=[lab1[a],lab2[a]]; 
        }
        //console.log("拼接后数值:",lab3);
        let max1 = lab2[0];
        this.edata3= lab3;
        //console.log("名称:",this.edata1);
        //console.log("表格数:",this.edata2);  
        this.drawEchart1();        
        }).catch((error)=>{
        ////console.log(error);
        this.$notify.error({
          title: '失败',
          message: '获取数据失败'
        });        
      })
      },
      //历史数据表
      drawEchart1(){
      var myChart = echarts.init(document.getElementById('echart1'));
      let that=this;
      var data = that.edata3;
      var option = {
      title: {
          left: 'center',
          text: '历史数据图',
      },
      legend: {
          top: 'bottom',
          data: ['意向']
      },
      tooltip: {
          triggerOn: 'none',
          position: function (pt) {
              return [pt[0], 130];
          }
      },
      toolbox: {
          left: 'center',
          itemSize: 20,
          right: 10,
          top: 40,
          feature: {
              restore: {},
              dataView: {
              show: true,
              readOnly: true,
              lang:['','关闭'],            
              },
              magicType: {type: ['bar', 'line']},
              saveAsImage: {},
          }
      },
      xAxis: {
          type: 'category',
          // boundaryGap: [0, 0],
          axisPointer: {
              value: '2000-00-00',
              snap: true,
              lineStyle: {
                  color: '#004E52',
                  opacity: 0.5,
                  width: 2
              },
              label: {
                  show: true,
                  formatter: function (params) {
                      return echarts.format.formatTime('yyyy-MM-dd', params.value);
                  },
                  backgroundColor: '#004E52'
              },
              handle: {
                  show: true,
                  color: '#004E52'
              }
          },
          splitLine: {
              show: false
          }
      },
      yAxis: {
          type: 'value',
          axisTick: {
              inside: true
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              inside: true,
              formatter: '{value}\n'
          },
          z: 10
      },
      grid: {
          top: 110,
          left: 15,
          right: 15,
          height: 160
      },
      dataZoom: [{
          type: 'inside',
          throttle: 50
      }],
      series: [
              {
                  name: '时间',
                  type: 'line',
              },
          {
              name: '      数据值',
              type: 'line',             
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                  color: '#8ec6ad'
              },
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#8ec6ad'
                  }, {
                      offset: 1,
                      color: '#ffe'
                  }])
              },
              data: data
          },
      ]
  };
  myChart.setOption(option);
                window.addEventListener('resize', function () {
                    myChart.resize()
                }); 
        },
    }
}
</script>

<style type="text/css" scoped>
.div1{
  left:630px;
  top:10px;
  font-size: 10px;
  margin-right:10px;
  position: absolute;
}  
.block{
  left:20px;
  top: 20px;
  position: absolute;
} 
.echart{
  width: 600px;
  height: 500px; 
  top: 100px;
  position: absolute;  
}
</style>