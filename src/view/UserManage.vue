<template>
  <div id="UserManage">
    <div class="table1">
  <el-table ref="multipleTable"
    :data="tableData.slice((currentPage-1)*size,currentPage*size)"
     tooltip-effect="dark"
    style="width: 100%" height="300"
    @selection-change="handleSelectionChange" border :span="24" :row-style="{height:'25px'}"  :header-row-style="{height:'25px'}"  :cell-style="{padding:'0px'}">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="用户名">
      <template slot-scope="scope">{{ scope.row.name }}</template>
    </el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="电话" prop="phoneNumber"></el-table-column>
      <el-table-column label="邮箱" prop="mail" width="200"></el-table-column>
      <el-table-column label="权限" prop="permission"></el-table-column>
      <el-table-column label="冻结状态">
    <template slot-scope="scope">
    <el-link icon="Iconfont icon-icon-weather-snowflake" size="mini"@click="handleFrozen(scope.row)">修改({{scope.row.frozenCondition}}）</el-link>
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
  <div class="search" style="left:700px;top:10px;position:absolute">
        <el-button type="primary" plain @click="handleSearch">查询</el-button>
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
    <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input  v-model="form.name" placeholder="请输入设备编号" :disabled="formForbid"> </el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth">
    <el-select style="width:400px;"  v-model="form.sex" placeholder="请选择类型" :disabled="formForbid">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
       <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.phoneNumber" placeholder="请输入网格名称" :disabled="formForbid"></el-input>
    </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.mail" placeholder="请输入管理员" :disabled="formForbid"></el-input>
    </el-form-item>
    <el-form-item label="权限" :label-width="formLabelWidth">
      <el-select style="width:400px;"  v-model="form.permission" placeholder="请选择类型">
        <el-option label="二级用户" value="二级用户"></el-option>
        <el-option label="三级用户" value="三级用户"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk">确 定</el-button>
  </div>
</el-dialog>    
  </div> 
  <div class="v1">用户总数：</div>
  <div class="c1">{{totalUser}}</div>
  <div class="v2">二级用户数：</div>
  <div class="c2">{{totalUser2}}</div>
  <div class="v3">三级用户数：</div>
  <div class="c3">{{totalUser3}}</div>
  </div>
</template>

<script type="text/javascript" scoped>
export default{
  data(){
  return{
    formForbid:true,
        totalUser:'',
        totalUser2:'',
        totalUser3:'',
        chooseName:'',
        title:'',
        currentPage:1,
        size:10,
        tableData: [{
          name:'aaa',
          sex:'女',
          phoneNumber:'13111111111',
          mail:'zhang456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'bbb',
          sex:'女',
          phoneNumber:'15222222222',
          mail:'wang456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'ccc',
          sex:'男',
          phoneNumber:'18333333333',
          mail:'2533534326@qq.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'ddd',
          sex:'女',
          phoneNumber:'17444444444',
          mail:'zhao456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'eee',
          sex:'女',
          phoneNumber:'15555555555',
          mail:'deng456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'fff',
          sex:'男',
          phoneNumber:'13666666666',
          mail:'zou456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'ggg',
          sex:'男',
          phoneNumber:'13777777777',
          mail:'yao456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'hhh',
          sex:'男',
          phoneNumber:'18888888888',
          mail:'huang456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'iii',
          sex:'女',
          phoneNumber:'13999999999',
          mail:'456@564',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'jjj',
          sex:'男',
          phoneNumber:'13000000000',
          mail:'luo456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'kkk',
          sex:'男',
          phoneNumber:'15234567891',
          mail:'129595456@qq.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }, {
          name:'lll',
          sex:'女',
          phoneNumber:'17345678910',
          mail:'1481456@qq.com',
          permission:'三级用户',
          frozenCondition: '未冻结',
        }, {
          name:'mmm',
          sex:'女',
          phoneNumber:'18345678911',
          mail:'1418456@163.com',
          permission:'二级用户',
          frozenCondition: '未冻结',
        }],
        //模态框数据
        dialogFormVisible:false,
        form:{
            name:'',
            sex:'',
            phoneNumber:'',
            mail:'',
            permission:'',
        },
        formLabelWidth:'80px',
  }
  },
  methods:{
    handleSearch(){
    this.totalUser=this.tableData.length;
    this.totalUser2=0;
    this.totalUser3=this.totalUser;
    for(var i=0;i<this.tableData.length;i++){
      if(this.tableData[i].permission=='二级用户'){
        this.totalUser2++;
        this.totalUser3--;
      }
    }
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
        //console.log(this.multipleSelection[1]);
      },
       handleEdit(row) {
        //console.log(row);
        this.title="编辑";
        this.dialogFormVisible=true;
        this.formForbid=true;
        this.form=row;
        this.chooseName=row.name;
      },
      handleFrozen(row){
          this.$confirm('此操作将改变该用户冻结状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].name==row.name){
              if(row.frozenCondition=='已冻结'){
                var att="未冻结";
                //console.log(row.name);
                //console.log(row.frozenCondition);
              }
              if(row.frozenCondition=='未冻结'){
                att="已冻结";
              }
              row.frozenCondition=att;
              this.tableData.splice(i,1,row);
                //console.log(row.name);
                //console.log(row.frozenCondition);
            }
          }
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
        this.$confirm('此操作将删除所有选中的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                  for(var j=0;j<this.multipleSelection.length;j++){
          for(var i=0;i<this.tableData.length;i++){
            if(this.tableData[i].name==this.multipleSelection[j].name){
              this.tableData.splice(i,1);
            }
          }
        }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
        this.form={};
      },
      BtnOk(){
        if(this.title=="添加"){
        //console.log(this.form);
        this.tableData.push(this.form);
        //console.log(this.tableData);
        }
        if(this.title=="编辑"){
          //console.log(this.chooseName);
          for(var i=0;i<this.tableData.length;i++){
            if(this.chooseName==this.tableData[i].name){
              this.tableData.splice(i,1,this.form);
            }
          }
        }
        this.dialogFormVisible=false;
      },
  }
}
</script>

<style type="text/css">
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