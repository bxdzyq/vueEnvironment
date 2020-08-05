<template>
  <div id="AlarmManage">
    <div id='echart1' class="echar1"></div>
    <div class="block1">
    <!-- <span class="demonstration">时间选择</span> -->
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <div class="div1">
    <el-input v-model="gridId" placeholder="请输入网格编号" clearable style="width: 200px;">
    </el-input>
    <el-button type="primary" @click="queryInformation">查询</el-button>
    </div>
  </div>
  <div class="div2">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="报警总数">
      <el-input v-model="formInline.报警设备" placeholder="报警总数"></el-input>
    </el-form-item>
    <el-form-item label="已处理">
      <el-input v-model="formInline.已处理" placeholder="已处理"></el-input>
    </el-form-item>
    <el-form-item label="未处理">
      <el-input v-model="formInline.未处理" placeholder="未处理"></el-input>
    </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script type="text/javascript">
import{formatDate} from '@/common/date.js'
import  axios from '@/http/axios.js'
var echarts = require('echarts');
export default{
  data(){
  return{
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
        value: '',
        gridId: '',
        formInline: {},
        EchartData1: [],
  }
  },
    created(){
    //向后台请求 统计数据
    this.GetAlarmInfo();
    this.GetInformation();
  },
  mounted(){
      this.drawEchart1();
    },
  methods:{
      GetAlarmInfo(){
      let url='/ls/各项数据统计';
      axios.get(url)
      .then((response)=>{
      //console.log(response);
      this.formInline=response.data.data;
      }).catch((error)=>{
        this.$notify.error({
          title: '失败',
          message: '获取数据失败'
        });
      })
    },
      queryInformation(){
      this.tableData=[];
      //console.log("输入框",this.gridId);
      this.value[0]=formatDate(this.value[0]);
      //console.log("开始时间",this.value[0]);
      this.value[1]=formatDate(this.value[1]);
      //console.log("结束时间",this.value[1]);
      for(var i=0;i<this.tableDataAll.length;i++){  
      if(this.value[0]<=this.tableDataAll[i].date){
      if(this.value[1]>=this.tableDataAll[i].date) {
        this.tableData.push(this.tableDataAll[i])
      }
    }
  }
} ,
    GetInformation(){
      axios.get('/alarm/统计报警信息',{params:{
        start_time: this.value[0],
        end_time: this.value[1],
        grid_id: this.gridId,
        }})
      .then((response)=>{
      //console.log(response);
      this.EchartData1=response.data.data;
      //console.log("表格数据:",this.EchartData1);
      var val1 =  this.EchartData1.未解决的报警数;
      var val2 =  this.EchartData1.已处理未解决的报警数;
      var val3 =  this.EchartData1.已经解决的报警数;        
      //console.log("单条数据:",val1);
      var arr1 = [
      {value: val1, name:"未解决"},
      {value: val2, name:"已处理未解决"},
      {value: val3, name:"已解决"},
      ];
      this.edata1= arr1;        
      this.drawEchart1();        
      }).catch((error)=>{
      //console.log(error);
      this.$notify.error({
        title: '失败',
        message: '获取数据失败'
      });        
    })
  },
  //画饼图
  drawEchart1(){
        var myChart = echarts.init(document.getElementById('echart1'));
        let that=this;
        var option = {
        title: {
              left: 'center',
              text: '报警数量统计图',
          },   
        toolbox: { 
                itemSize: 16,
                right: 10,
                feature: {
                    dataView: {},              
                    saveAsImage: {},
                }
            },  
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['未解决', '已处理未解决', '已解决',]
        },
        series: [
            {
                name: '报警统计',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: that.edata1
            }
        ]
    };
   myChart.setOption(option);
         window.addEventListener('resize', function () {
            myChart.resize()
          });      
  }
  }
}
</script>

<style type="text/css" scoped>
.echar1{
  width: 300px;
  height: 300px;
  top: 250px;
  position: absolute;
}
.block1{
  top:150px;
  left:20px;
  position: absolute;
} 
.div1{
  top:40px;
  position: absolute;
} 
.div2{
  top:5px;
  left:150px;
  position: absolute;
}   
</style>