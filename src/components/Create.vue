<template>
  <div>
    <h5></h5>
    <group>
      <x-textarea placeholder="标题" :max="200" :row="1" v-model="title"></x-textarea>
      <x-textarea placeholder="内容" :max="2000" :row="6" v-model="content"></x-textarea>
    </group>
    <x-button type="primary" style="margin-top: 50px" @click.native="create">发表</x-button>
  </div>
</template>

<script>
  import { XTextarea, Group, XButton } from 'vux'
    export default {
        name: "Create",
      data() {
          return {
            title: '',
            content: ''
          }
      },
      methods: {
          create() {
            let app = this;
            this.$http.post('/topics',{
              accesstoken: window.localStorage.getItem('accesstoken'),
              title: this.title,
              content: this.content,
              tab: 'dev'
            }).then(function (response) {
              if(response.data.success){
                app.$router.push('/topic/' + response.data.topic_id)
              }
            })
          }
      },
      components: {
          XTextarea,
          Group,
          XButton
      }
    }
</script>

<style scoped>

</style>
