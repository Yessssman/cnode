import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topics:[
      { name: 'all', desc: '全部' },
      { name: 'good', desc: '精华' },
      { name: 'share', desc: '分享' },
      { name: 'ask', desc: '问答' },
      { name: 'job', desc: '招聘' },
      { name: 'dev', desc: '测试' }
    ],
    moreMenus_unLogin: {
      login: '登陆'
    },
    moreMenus_logined: {
      create: '发表新话题',
      center: '个人中心',
      notification: '消息',
      logout: '登出'
    },
    isShowMore: false,
    isLogined: false,
    userinfo: {
      loginname: '',
      avatar_url: '',
      id: ''
    }
  },
  getters: {
    moreMenus(state) {
      return state.isLogined?state.moreMenus_logined:state.moreMenus_unLogin;
    }
  },
  actions: actions,
  mutations: mutations

})
