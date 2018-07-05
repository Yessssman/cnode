import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import TopicList from '@/components/TopicList'
import Topic from '@/components/Topic'
import Login from '@/components/Login'
import Center from '@/components/Center'
import Msg from '@/components/Msg'
import Logout from '@/components/Logout'
import User from '@/components/User'
import Create from '@/components/create'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 重定向redirect
      redirect:'/topiclist/all'
    },
    {
      path:'/topiclist/:name',
      name:'topiclist',
      component:TopicList,
      props:true
    },
    {
      path: '/topic/:id',
      component: Topic,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/center',
      name: 'center',
      component: Center
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: User,
      props: true
    },
    {
    path: '/msg',
    name: 'msg',
    component: Msg
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
  ]
})
