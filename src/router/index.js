import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 一级用户首页
import Home from '@/view/home.vue'

// 用户管理
import UserManage from "@/view/UserManage.vue"
// 网格管理
import GridManage from "@/view/GridManage.vue"
// 设备管理
import EquipManage from "@/view/EquipManage.vue"
// 环境数据显示
import DataAnalysis from "@/view/DataAnalysis.vue"
// 环境数据单项统计
import DataSta from "@/view/DataSta.vue"
// 环境数据历史统计
import DataHis from "@/view/DataHis.vue"
// 报警管理
import AlarmManage from "@/view/AlarmManage.vue"
// 大屏显示
import LargeScreen from "@/view/LargeScreen.vue"
// 日志管理
import LogManage from "@/view/LogManage.vue"

Vue.use(Router)

export default new Router({
  routes: [
      {
      path: '/',
      redirect:'/GridManage',
      name: 'Home',
      component: Home,
      children:[
      {
       	path: '/UserManage',
      	name: 'UserManage',
      	component: UserManage
      },
       {
        path: '/GridManage',
        name: 'GridManage',
        component: GridManage
      },
       {
        path: '/EquipManage',
        name: 'EquipManage',
        component: EquipManage
      },
       {
        path: '/DataAnalysis',
        name: 'DataAnalysis',
        component: DataAnalysis
      },
        {
        path: '/DataHis',
        name: 'DataHis',
        component: DataHis
      },
       {
        path: '/DataSta',
        name: 'DataSta',
        component: DataSta
      },
       {
        path: '/AlarmManage',
        name: 'AlarmManage',
        component: AlarmManage
      },
       {
        path: '/LogManage',
        name: 'LogManage',
        component: LogManage
      }   
      ]
    },
    {
      path: '/LargeScreen',
      name: 'LargeScreen',
      component: LargeScreen,
    },
  ]
})
