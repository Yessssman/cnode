<template>
  <scroller use-pullup lock-x scrollbarY :pullup-config="pullupConfig" @on-pullup-loading="loadMore" ref="pullup">
    <div>
      <group>
        <cell v-for="(item, index) in list" :key="index" :title="item.title" is-link :link="'/topic/' + item.id">
          <span slot="title" class="cell_title">
            <span slot="icon" v-if="$route.name == 'topiclist'">
              <img :src="item.author.avatar_url" alt="" class="author_avatar">
            </span>
            <span class="replay_count">{{item.reply_count}}</span>/
            <span class="visit_count">{{item.visit_count}}</span>
            <span v-if="item.top" class="top">置顶</span>
            <span class="tab">{{item.tab}}</span>
            <span class="title">{{item.title}}</span>
          </span>
        </cell>
      </group>
    </div>
  </scroller>
</template>

<script>
  import { Group, Cell, Scroller } from 'vux'
    export default {
        name: "topiclist",
      components: {
        Group,
        Cell,
        Scroller
      },
      props: ['name'],
      data() {
        return {
          list: [],
          page: 1,
          limit: 10,
          lim: 0,
          pullupConfig: {
            content: '上拉加载更多',
            downContent: '松开进行加载',
            upContent: '上拉加载更多',
            loadingContent: '加载中...'
          }
        }
      },
      beforeRouteEnter: function (to, from, next) {
        next(function (vm) {
          vm.$http.get('/topics', {
            params: {
              tab: to.params.name,
              page: vm.page,
              limit: vm.limit
            }
          }).then(function (response) {
            if(response.data.success){
              vm.list = response.data.data
            }
          })
        });
      },
      beforeRouteUpdate: function (to, from, next) {
          let app=this;
        this.$http.get('/topics',{
          params:{
            tab: to.params.name,
            page: app.page,
            limit: app.limit
          }
        }).then(function (response) {
          if(response.data.success){
            app.list = response.data.data
          }
        })
        next();
      },
      methods: {
          loadMore() {
            let app = this;
            this.$http.get('/topics',{
              params: {
                tab: this.name,
                page: ++this.page,
                limit: this.limit
              }
            }).then(function (response) {
              console.log(response)
              if(response.data.success)
              for(var x=0; x<response.data.data.length;x++){
                app.list.push(response.data.data[x])
              }
              app.$refs.pullup.donePullup()
            })
          }
      }
    }
</script>

<style scoped>
  .cell_title{
    font-size: .8em;
  }
  .cell_title .replay_count{
    color: #9e78c0;
  }
  .cell_title .visit_count {
    color: #b4b4b4;
  }
  .cell_title .top{
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
  }
  .cell_title .tab{
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
  }
  .cell_title .title{
    color: #333;
  }
  .cell_title .author_avatar{
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
</style>
