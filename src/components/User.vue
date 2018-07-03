<template>
  <div v-if="userinfo">
    <card :header="{ title: userinfo.loginname }" :footer="{ title: userinfo.create_at}"></card>
  </div>
</template>

<script>
  import { Card } from 'vux'
    export default {
        name: "User",
      props:['loginname'],
      components: {
        Card
      },
      data() {
        return {
          userinfo: ''
        }
      },
      beforeRouteEnter(to, from, next) {
          next(function (vm) {
            console.log(vm);
            vm.$http.get('/user/' + to.params.loginname).then(function (response) {
              if(response.data.success){
                vm.userinfo = response.data.data;
              }
            })
          })
      },
      beforeRouteUpdate(to, from, next) {
          let app = this;
          this.$http.get('/user/' + to.params.loginname).then(function (response) {
            if (response.data.success){
              app.userinfo = response.data.data
            }
          });
        next();
      }
    }
</script>

<style scoped>

</style>
