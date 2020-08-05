<template>
  <div id="EquipManage">
    <div class="table1">
  <el-table ref="multipleTable"
    :data="tableData.slice((currentPage-1)*size,currentPage*size)"
     tooltip-effect="dark"
    style="width: 100%" height="300"
    @selection-change="handleSelectionChange" border :span="24" :row-style="{height:'25px'}"  :header-row-style="{height:'25px'}"  :cell-style="{padding:'0px'}">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="设备编号">
      <template slot-scope="scope">{{ scope.row.device_id.device_id }}</template>
    </el-table-column>
    <el-table-column label="工作状态" prop="device_id.is_enable">
    </el-table-column>
    <el-table-column label="网格编号" prop="device_id.grid_id.grid_id">
    </el-table-column>
    <el-table-column label="位置" prop="device_id.grid_id.grid_address">
    </el-table-column>
      <el-table-column label="AQI阈值" prop="device_AQIt">
    </el-table-column>
     <el-table-column label="PM2.5阈值" prop="device_pm25t">
    </el-table-column>
     <el-table-column label="绑定状态">
      <template slot-scope="scope">
      <el-link size="mini"@click="handleEdit2(scope.row)">修改({{scope.row.device_id.is_bind}}）
      </el-link>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
      <el-link icon="el-icon-edit"size="mini"@click="handleEdit(scope.row)">编辑</el-link>
      </template>
    </el-table-column>
  </el-table>
</div>
<div class="block1" style="margin-left:0;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length" >
    </el-pagination>
  </div>
    <div class="delete">
        <el-button type="primary" plain @click="handleDelete">批量删除</el-button>
  </div>
  <div class="addition">
       <el-button type="info" plain @click="handleAddition">添加</el-button>
  </div>
   <div class="form1">
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="设备编号" :label-width="formLabelWidth">
        <el-input  v-model="form.device_id.device_id" placeholder="请输入设备编号" :disabled="formForbid"> </el-input>
    </el-form-item>
    <el-form-item label="设备密码" :label-width="formLabelWidth">
      <el-input  type="password"  v-model="form.device_passw" placeholder="请输入设备密码":disabled="formForbid"> </el-input>
    </el-form-item>
    <el-form-item label="AQI阈值" :label-width="formLabelWidth">
      <el-input v-model="form.device_AQIt" placeholder="请输入AQI阈值"></el-input>
    </el-form-item>
    <el-form-item label="MP2.5阈值" :label-width="formLabelWidth">
      <el-input v-model="form.device_pm25t" placeholder="请输入MP2.5阈值"></el-input>
    </el-form-item>
    <el-form-item label="心跳包频率" :label-width="formLabelWidth">
      <el-input v-model="form.device_f" placeholder="请输入心跳包频率"></el-input>
    </el-form-item>
    <el-form-item label="设备名称" :label-width="formLabelWidth">
      <el-input v-model="form.device_name" placeholder="请输入设备名称"></el-input>
    </el-form-item>
    <el-form-item label="网格编号" :label-width="formLabelWidth">
      <el-input v-model="form.device_id.grid_id" placeholder="请输入网格编号" :disabled="formForbid"> </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk">确 定</el-button>
  </div>
</el-dialog>    
  </div>  
  <div class="v1">设备总数：</div>
  <div class="c1">{{formInline.设备总数}}</div>
  <div class="v2">故障总数：</div>
  <div class="c2">{{formInline.故障设备}}</div>
  <div class="v3">超限总数：</div>
  <div class="c3">{{formInline.超限设备数}}</div>
  </div>
</template>

<script type="text/javascript">
import axios from '@/http/axios.js'
export default{
  data(){
  return{
    device_id:{},
    formForbid:true,
        formInline:{},
        chooseID:'',
        title:'',
        currentPage:1,
        size:10,
        tableData: [],
        //模态框数据
        dialogFormVisible:false,
        form:{
          device_passw: '',
          device_AQIt: '',
          device_pm25t: '',
          device_f: '',
          device_name: '',
          device_id: {
          device_id: '',
          grid_id: '',
        },
      },
      formLabelWidth:'80px',
    }
  },
  created(){
    this.getAllData();
  },
  methods:{
    getAllData(){
      let url='/device/';
      axios.get(url)
      .then((response)=>{
        //console.log(response);
        this.tableData=response.data.data.results;
        for(var i=0;i<this.tableData.length;i++){
         if(this.tableData[i].device_id.is_enable==1){
           this.tableData[i].device_id.is_enable='正常';
         }
         else this.tableData[i].device_id.is_enable='故障';
       }
      }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '获取数据失败'
        });
      })

      let url1='/device/querydevice';
      axios.get(url1)
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
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.size = val
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.currentPage = val
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //console.log("多选",this.multipleSelection);
      },
       handleEdit(row) {
        //console.log(row);
        this.title="编辑";
        this.dialogFormVisible=true;
        this.formForbid=true;
        this.form=row;
      },
      handleEdit2(row){
          this.$confirm('此操作将改变该设备绑定状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/device/DeviceBind2',row.device_id.device_id)
        .then((response)=>{
          //console.log("成功",response);
          this.getAllData();
        }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '修改失败'
        });
        })
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      },
      handleDelete(){
        this.$confirm('此操作将删除所有选中的网格, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         for(var j=0;j<this.multipleSelection.length;j++){
            //console.log(this.multipleSelection[j].device_id.device_id);
        axios.delete('/device/DeviceDelete?device_id='+this.multipleSelection[j].device_id.device_id)
        .then((response)=>{
          //console.log("成功",response);
          this.getAllData();
        }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '修改失败'
        });
        })       
         }

         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });          
         });
       },
      handleAddition(){
        this.title="添加";
        this.dialogFormVisible=true;
        this.formForbid=false;
        this.form={
          device_passw: '',
          device_AQIt: '',
          device_pm25t: '',
          device_f: '',
          device_name: '',
          device_id: {
          device_id: '',
          grid_id: '',
        },
      };
      }, 
      BtnOk(){
        if(this.title=="添加"){
        axios.post('/device/',this.form)
        .then((response)=>{
          //console.log("成功",response);
          this.getAllData();
        }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '添加失败'
        });
        })
        }
        if(this.title=="编辑"){
        axios.put('/device/DeviceUpdate',{device_id:this.form.device_id.device_id,device_name:this.form.device_name,device_AQIt:this.form.device_AQIt,device_pm25t:this.form.device_pm25t,device_f:this.form.device_f})
        .then((response)=>{
          //console.log("成功",response);
          this.getAllData();
        }).catch((error)=>{
          this.$notify.error({
          title: '失败',
          message: '编辑失败'
        });
        })
         }
         this.dialogFormVisible=false;
      },
  }
}
</script>

<style type="text/css" scoped>
.table1{
  top:100px;
  position: relative;
}
.el-table{
  font-size: 12px;
  position: absolute;
}
.el-form-item__label{
  font-size: 12px;
  line-height: 20px;
  vertical-align: right;
}
.el-form-item__content{
  font-size: 12px;
  line-height: 20px;
    vertical-align: right;
}
.block1{
  top:430px;
  left:500px;
  position: absolute;
} 
.delete{
  top:430px;
  left:10px;
  position: absolute;
}
.addition{
  top:60px;
  left:10px;
  position: absolute;
}
.el-dialog__title{
  font-size: 16px;
  margin: 10px;
}
.el-dialog__header{
  padding: 15px 15px 0px;
}
.el-form-item{
  margin: 10px;
}
.el-dialog__body{
  font-size: 12px;
}
.el-form-item__content{
  font-size: 12px;
}
.v1{
font-size: 14px;
text-align: center;
line-height:50px;
height: 50px;
width: 100px;
top: 10px;
left:80px;
position: absolute;
}
.c1{
font-size: 14px;
text-align: center;
line-height:30px;
height: 30px;
width: 100px;
top: 20px;
left:170px;
position: absolute;
box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.v2{
font-size: 14px;
text-align: center;
line-height:50px;
height: 50px;
width: 100px;
top: 10px;
left:280px;
position: absolute;
}
.c2{
font-size: 14px;
text-align: center;
line-height:30px;
height: 30px;
width: 100px;
top: 20px;
left:370px;
position: absolute;
box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.v3{
font-size: 14px;
text-align: center;
line-height:50px;
height: 50px;
width: 100px;
top: 10px;
left:480px;
position: absolute;
}
.c3{
font-size: 14px;
text-align: center;
line-height:30px;
height: 30px;
width: 100px;
top: 20px;
left:570px;
position: absolute;
box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>