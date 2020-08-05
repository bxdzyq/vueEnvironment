<template>
  <div id="Home">
    <!-- 页面头部 -->
    <div class="header">
    	<div class="leftitle">环境监测云平台  <img src="../assets/gonggongyunfuwu.png" alt="云" width="38" height="28"></div>
    	<div class="rightitle">{{count}}</div>
    	<div class="user">一级用户</div>
      <div class="set" style="border-left:2px dashed #000;border-right:2px dashed #000" @click="dialogFormVisible = true">
      <i class="iconfont icon-gerenshezhi">
      </i> 个人设置</div>
      <div class="back">
          <el-button type="primary" size="mini" @click="onBack">退出登录</el-button>
      </div>
      <!-- 表单开始 -->
      <el-dialog title="个人设置" :visible.sync="dialogFormVisible">
    <el-form ref="ruleForm" :rules="rules"  :model="formData" label-position="left" label-width="100px">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="formData.username" type="text" :disabled="dialogStatus==='update'? true : false"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="formData.password" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" >
          <el-input v-model="formData.repassword" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>       
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" type="text" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单结束 -->
    </div>
    <!-- 页面主体 -->
    <div class="containter">
    	<div class="left">
      <img src="../assets/user.png" alt="" >
    		<div class="leftnav">
    			 <el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"
			      background-color="#00284d"
			      text-color="#fff"
			      active-text-color="#1296db"
			      :router='true'>
			      <el-menu-item index="/GridManage" @click='GridCli'>
			        <span class="iconfont icon-wangge"> 网格信息管理</span>
			      </el-menu-item>
             <el-menu-item index="/EquipManage" @click='EquipCli'>
              <span class="iconfont icon-shebei"> 设备信息管理</span>
            </el-menu-item>
			      <el-submenu>
			        <template slot="title">
			          <span class="iconfont icon-huanjing"> 环境数据分析</span>
			        </template>
			        <el-menu-item-group>
                <el-menu-item index="/DataAnalysis" @click='AnalyCli'>环境数据显示</el-menu-item>
			          <el-menu-item index="/DataHis" @click='HisCli'>历史信息统计</el-menu-item>
			          <el-menu-item index="/DataSta" @click='StaCli'>单项信息统计</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
             <el-menu-item index="/AlarmManage" @click='AlarmCli'>
              <span class="iconfont icon-baojing"> 报警信息管理</span>
            </el-menu-item>
             <el-menu-item index="/LargeScreen" @click='LargeCli'>
              <span class="iconfont icon-daping"> 大屏展示</span>
            </el-menu-item>
             <el-menu-item index="/LogManage" @click='LogCli'>
             <span class="iconfont icon-rizhi"> 日志管理</span>
            </el-menu-item>
			      <el-menu-item index="/UserManage" @click='UserCli'>
              <span class="iconfont icon-yonghuguanli"> 用户管理</span>
			      </el-menu-item>    
			    </el-menu>
    		</div>
    	<!-- 内容区域-->
    	</div>
    	<div class="right">
    		<div class="center">
    			<transition name="slide-fade" mode="out-in">
                	<router-view ></router-view>
				</transition>
    		</div>
    		<div class="footer">
    		</div>
    	</div>
    	
    </div>

  </div>
</template>
<script type="text/javascript">
import{isvalidPhone, isvalidPass, isvalidUsername } from '@/validate.js';
export default {
  name: 'App',
  data(){
    var validatePass = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请输入密码"));
          } else if (!isvalidPass(value)) {
            callback(
              new Error("密码长度在6~20之间，只能包含字母、数字和下划线")
            );
          } else {
            if (this.formData.repassword !== "") {
              this.$refs.ruleForm.validateField("repassword");
            }
            callback();
          }
        };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };  
    var validPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请填写正确的手机号码"));
      }
    };  
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!isvalidUsername(value)) {
        callback(
          new Error(
            "用户名可以为数字、字母、下划线的组合，长度为4-15个字符"
          )
        );
      }
    };
    return {
      count:'网格管理',
      dialogFormVisible: false,
      formData: {
      username: '',
      mobile: '',
      mailbox: '',
      password: '',
      repassword: '',
      email: ''
    },
    formLabelWidth: '120px',
    rules: {
        username: [
          { required: true, validator: validUsername, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        mobile: [
          { required: true, validator: validPhone, trigger: "blur" },
          { min: 11, max: 11, trigger: "blur" }
        ],
        email: [
          { required: true, message: "必填", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱！", trigger: "blur" }
        ]
      },
    }
  },
  methods:{
    // 函数名 参数  函数体
    GridCli(){
      this.count='网格信息管理';
    },
    IndexCli(){
      this.count='测试用例';
    },
    EquipCli(){
      this.count='设备信息管理';
    },
    AnalyCli(){
      this.count='环境数据显示';
    },
    HisCli(){
      this.count='历史信息统计';
    },
    StaCli(){
      this.count='单项信息统计';
    },
    AlarmCli(){
      this.count='报警信息管理';
    },
    LargeCli(){
      this.count='大屏显示';
    },
    LogCli(){
      this.count='日志管理';
    },
    UserCli(){
      this.count='用户管理';
    },
    onBack(){
      //this.$router.push({path:'../'})
    },
  }
}
</script>
<style type="text/css" scoped>
 .Home{
 	height: 100%;
 	width: 100%;
 	position: relative;
 }
 .header{
  height: 50px;
  width: 100%;
  background: #00284d;
  /*文字水平居中*/
  text-align: center;
  line-height: 50px;
  color: white;
  font-family: "楷体";
  font-weight: 700;
  font-size: 18px;
 }
 .header .leftitle{
  width: 200px;
  height: 50px;
  background: #00232d;
  position: absolute;
  top: 0;
  left: 0;
 }
 .header .rightitle{
  width: 200px;
  height: 50px;
  position: absolute;
  left: 200px;
 }
 .header .user{
  width: 200px;
  height: 50px;
  position: absolute;
  left: 450px;
 }
 .header .set{
  width: 190px;
  height: 50px;
  position: absolute;
  left: 750px;
 }
 .header .back{
  width: 200px;
  height: 50px;
  background: #00284d;
  position: absolute;
  left: 950px;
 }
 .containter{
 	height: calc(100% - 50px);
 	width: 100%;
 }
 /* 实现div  水平布局的方式  float浮动  position  定位 */
 .containter .left{
 	width: 200px;
 	height: calc(100% - 50px);
 	background-color:#00284d; 
 	position: absolute;
 	top: 50px;
 	left: 0;
 }
 .containter .left .leftnav{
 	height: calc(100% - 200px);
 	width: 100%;
 	overflow-y:scroll;
 }
 /*隐藏滚动条 火狐*/
.containter .left .leftnav{
     scrollbar-width: none; 
     -ms-overflow-style: none; 
}
/*隐藏滚动条 谷歌*/
.containter .left .leftnav::-webkit-scrollbar {
      display: none;
}
/*Edge*/
.containter .left .leftnav{
  -ms-overflow-style:none;
}
 .el-menu{
 	border-right: 1px solid  #00284d;
  width: 200px;
  height: 100%;
  line-height: 50px;
  color: white;
  font-family: "Microsoft YaHei";
  font-weight: 700;
  font-size: 18px;
 }
 .containter .right{
 	width: calc(100% - 200px);
 	height: calc(100% - 50px);
 	/*background: red;*/
 	position: absolute;
 	top: 50px;
 	right: 0;
 }
 .containter .right .center{
 	position: absolute;
 	top: 0;
 	height: calc(100% - 65px);
 	width: calc(100% - 20px);
 	padding: 10px;
 }
 .containter .right .footer{
 	position: absolute;
 	bottom: 0;
 	height: 45px;
 	width: 100%;
 	background: #eee;
 	text-align: center;
 	line-height: 45px;
 	color: #999;
 }
/*动画样式*/
  .slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>