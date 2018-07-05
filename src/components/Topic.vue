<template>
    <div v-if="topic">
      <article class="weui-article">
      <h1>{{topic.title}}</h1>
      <section>
        <span>作者：<img :src="topic.author.avatar_url" style="height: 30px;width: 30px"><a :href="'/#/user/' + topic.author.loginname">{{topic.author.loginname}}</a></span>
        <span>{{topic.visit_count}}次浏览</span>
        <x-button :mini="true" v-if="!topic_info.isCollect" @click.native="collect">收藏</x-button>
        <x-button :mini="true" v-if="topic_info.isCollect" @click.native="de_collect">取消收藏</x-button>
        <x-button :mini="true" v-if="topic_info.isOwn" @click.native="popup">编辑</x-button>
        <br>
        <span>来自 <a :href="'/#/topiclist/' + topic.tab">{{topic.tab}}</a></span>
      </section>
      <hr>
      <div v-html="topic.content"></div>
      <section>
        <h3>评论 {{topic.replies.length}}</h3>
      </section>
      </article>
      <group>
        <cell-box v-for="(item, index) in topic.replies" :key="index">
         <flexbox>
           <flexbox-item :span="1/10">
             <img :src="item.author.avatar_url" alt=""style="width: 30px;height: 30px">
           </flexbox-item>
           <flexbox-item>
             <section>
               <p><a :href="'/#/user/' + item.author.loginname">{{item.author.loginname}}</a>  {{index+1}}楼</p>
               <div v-html="item.content"></div>
             </section>
           </flexbox-item>
           <flexbox-item :span="1/8">
             <span>
               <wechat-emotion>强</wechat-emotion> {{item.ups.length}}
             </span>
             <p v-if="isLogined">回复</p>
           </flexbox-item>
         </flexbox>
        </cell-box>
      </group>
      <div v-transfer-dom>
        <popup v-model="show" height="100%">
          <div class="popup_edit">
            <group>
              <x-textarea v-model="topic.title" :max="200" :row="1"></x-textarea>
              <x-textarea v-model="topic.content" :max="2000" :row="6"></x-textarea>
              <x-button type="primary" @click.native="send">提交</x-button>
              <x-button @click.native="popup">取消</x-button>
            </group>
          </div>
        </popup>
      </div>
    </div>
</template>

<script>
  import { CellBox, Group, Flexbox, FlexboxItem, WechatEmotion, XButton, Popup, TransferDom, XTextarea } from 'vux'
  import { mapState } from 'vuex'
    export default {
        name: "Topic",
      props: ['id'],
      components: {
          Group,
          CellBox,
          Flexbox,
          FlexboxItem,
          WechatEmotion,
          XButton,
          Popup,
          XTextarea
      },
      directives: {
        TransferDom
      },
      data() {
        return {
          topic: null,
          topic_info: {
            isCollect: false,
            isOwn: false
          },
          show: false
        }
      },
      computed: {
        ...mapState(['isLogined'])
      },
      beforeRouteEnter(to, from, next) {
          next(function (vm) {
            vm.$http.get('/topic/' + to.params.id).then(function (response) {
              if (response.data.success){
                vm.topic = response.data.data;
                if(response.data.data.author_id == vm.$store.state.userinfo.id){
                  vm.topic_info.isOwn = true;
                }
              }
            });
            vm.$http.get('/topic_collect/' + vm.$store.state.userinfo.loginname).then(function (response) {
              if(response.data.success){
                for(let x in response.data.data){
                  if(to.params.id == response.data.data[x].id){
                    vm.topic_info.isCollect = true;
                  }
                }
              }
            });
          })
      },
      beforeRouteUpdate(to, from, next) {
          let app = this;
          this.$http.get('/topic/' + to.params.id).then(function (response) {
            if(response.data.success){
              app.topic = response.data.data;
              if(app.$store.state.userinfo.id == response.data.data.author_id){
                app.topic_info.isOwn = true;
              }
            }
          });
          this.$http.get('/topic_collect/' + this.$store.state.userinfo.loginname).then(function (response) {
            if(response.data.success){
              for(let x in response.data.data){
                if(to.params.id == response.data.data[x]){
                  app.topic_info.isCollect = true;
                }
              }
            }
          });
          next();
      },
      methods: {
          collect() {
            let app = this;
            this.$http.post('/topic_collect/collect',{
              accesstoken: window.localStorage.getItem('accesstoken'),
              topic_id: this.id
            }).then(function (response) {
              if(response.data.success){
                app.topic_info.isCollect = true;
              }
            })
          },
        de_collect() {
            let app = this;
            this.$http.post('/topic_collect/de_collect',{
              accesstoken: window.localStorage.getItem('accesstoken'),
              topic_id: this.id
            }).then(function (response) {
              if(response.data.success){
                app.topic_info.isCollect = false;
              }
            })
        },
        popup() {
          this.show = !this.show;
        },
        send() {
            let app = this;
            this.$http.post('/topics/update',{
              accesstoken: window.localStorage.getItem('accesstoken'),
              topic_id: this.id,
              title: this.topic.title,
              content: this.topic.content,
              tab: 'dev'
            }).then(function (response) {
              if(response.data.success)
                app.show = false;
            }).catch(function (err) {
              alert(err.response.error_msg);
            })
        }
      }
    }
</script>

<style lang="less">
@import '~vux/src/styles/weui/weui';
</style>
