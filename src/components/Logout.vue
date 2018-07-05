<template>
  <div>
    {{loginname}}您已注销，5秒后返回主页
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
    export default {
        name: "Logout",
      data() {
        return {
          loginname: ''
        }
      },
      created() {
          let app = this;
          this.loginname = window.localStorage.getItem('loginname');
          window.localStorage.clear();
          this.mutationLogout();
          function jump() {
            app.$router.push('/topiclist/all');
          }
          var a = setTimeout(jump,5000)
      },
      methods: {
        ...mapMutations(['mutationLogout'])
      }
    }
</script>

<style scoped>

</style>
