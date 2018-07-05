<template>
  <div id="app">
    <div>
      <x-header :right-options="{ showMore: true }" @on-click-more="showMoreMenus">Hello</x-header>
      <tab :line-width="1">
       <tab-item v-for="(item, index) in topics" :key="index" @on-item-click="routeto(index)" :selected="item.selected">{{ item.desc }}</tab-item>
      </tab>
    </div>

    <router-view></router-view>
    <actionsheet :menus="moreMenus" v-model="isShowMore"  @on-click-menu="handleClickMoreMenus"></actionsheet>
  </div>
</template>

<script>
  import { Tab, TabItem, XHeader, Actionsheet} from 'vux'
  import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    Tab,
    TabItem,
    XHeader,
    Actionsheet
  },

  computed: {
    ...mapGetters(['moreMenus']),
    ...mapState(['topics']),
    isShowMore: {
      get: function () {
        return this.$store.state.isShowMore;
      },
      set: function (nval) {
        this.$store.commit('mutationIsShowMoreMenus',nval);
      }
    }
  },
  created() {
    for(let x in this.topics){
      if(this.topics[x].name == this.$router.history.current.params.name)
        this.topics[x].selected = true
    }
    for(let x in this.topics){
      console.log(this.topics[x].selected)
    }
    if(window.localStorage.getItem('loginStatus')){
      this.mutationLogin();
      let userinfo = {}
      for(let x in this.$store.state.userinfo){
        userinfo[x] = window.localStorage.getItem(x);
      }
      this.mutationUserInfo(userinfo);
      console.log(this.$store.state.userinfo);
      console.log('App.vue => login')
    }else{
      this.mutationLogout();
      console.log('App.vue => logout')
    }
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations(['mutationLogin','mutationLogout','mutationUserInfo']),
    routeto(index) {
      //跳转
      this.$router.push('/topiclist/' + this.topics[index].name);
    },
    showMoreMenus() {
      this.isShowMore=true
    },
    handleClickMoreMenus(menukey, menuitem) {
      this.$router.push('/'+menukey);
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
