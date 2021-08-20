import Login from '../views/login/login';
import Bill from '../views/bill/bill';
import Statistics from '../views/statistics/statistics';
import My from '../views/my/my';
import About from './../views/user/about';
import Account from './../views/user/account';
import Userinfo from './../views/user/userinfo';
import Details from '../views/bill/details';

export interface Meta{
  title:string,
  icon?:string
}

export interface RouterItem {
  path:string,
  component:any,
  exact:boolean,
  meta?:Meta
}

export const commonRoutes:RouterItem[]=[
  {
    path:'/login',
    component:Login,
    exact:true,
    meta:{
      title:'登录'
    }
  }
]

export const routes:RouterItem[]=[
  {
    path:'/',
    component:Bill,
    exact:true,
    meta:{
      title:'账单'
    }
  },
  {
    path:'/statistics',
    component:Statistics,
    exact:true,
    meta:{
      title:'统计'
    }
  },
  {
    path:'/my',
    component:My,
    exact:true,
    meta:{
      title:'我的'
    }
  },
  {
    path:'/userinfo',
    component:Userinfo,
    exact:true,
    meta:{
      title:'个人资料'
    }
  },
  {
    path:'/account',
    component:Account,
    exact:true,
    meta:{
      title:'重置密码'
    }
  },
  {
    path:'/about',
    component:About,
    exact:true,
    meta:{
      title:'关于我们'
    }
  },
  {
    path:'/details',
    component:Details,
    exact:true,
    meta:{
      title:'账单详情'
    }
  }
]