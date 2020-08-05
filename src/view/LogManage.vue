<template>
  <div id="LogManage">
      <div class="tip">
          <el-button type="primary" @click="queryInformation"  >查询</el-button>
      </div>
      <div class="tip1">选择时间范围</div> 
    <el-table
    :data="tableData.slice((currentPage-1)*size,currentPage*size)"    border style="width:74.5%">
    <el-table-column prop="log_user"    label="用户名"  width="200"></el-table-column>
      <el-table-column prop="log_ip"    label="用户ip" width="250"  ></el-table-column>
      <el-table-column prop="log_content"   label="日志内容"  width="250"></el-table-column>
      <el-table-column prop="log_addtime"   label="时间"  width="250"></el-table-column>
  </el-table>
  <div class="block1" style="margin-left:0;">
    <!-- <span class="demonstration">完整功能</span> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
     <!-- 日期选择 -->
<div class="block2">
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
  </div>
  </div>
</template>

<script>
import axios from '@/http/axios.js'
import{formatDate} from '@/common/date.js'
export default {
  name: 'App',
  components: {
  },
  data() {
      return {
        currentPage:1,
        size:5,
          tableData:[],
          tableDataAll:[],
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
        form: {
          userType: '',
          user: '',
        }
      }
    }, 
    created(){
    this.getAllData();
  },
      methods: {
        getAllData(){
           axios.get('/logs/日志')
      .then((response)=>{
        // console.log(response);
        this.tableData=response.data.data.results;
      }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '获取数据失败'
        });
      })
        },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
      },
    queryInformation(){
      //console.log(this.value);
      this.value[0]=formatDate(this.value[0]);
      //console.log(this.value[0]);
      this.value[1]=formatDate(this.value[1]);
      //console.log(this.value[1]);
       axios.get('/logs/日志管理',{param:{start_time:this.value[0],end_time:this.value[1],}})
      .then((response)=>{
        //console.log(response);
        // this.tableData=response.data.data.results;
      }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '获取数据失败'
        });
      })
}
    }
}
</script>

<style type="text/css" scoped>
.tip{
  top:40px;
  left:600px;
  position :absolute;
}
.tip1{
  top:50px;
  left:100px;
  position :absolute;
  border-bottom: 0;
}
.el-table{
  left:100px;
  top:150px;
  margin-right:10px;
  position: absolute;
}
.block1{
  top:450px;
  left:200px;
  position: absolute;
} 
.block2{
  top:40px;
  left:220px;
  position: absolute;
} 
</style>