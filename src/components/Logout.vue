<template>
  <div>
    {{loginname}}您已注销，5秒后返回主页
  </div>
</template>

<script>
    export default {
        name: "Logout",
      data() {
        return {
          loginname: ''
        }
      },
      created() {
          this.loginname = window.localStorage.getItem('loginname');
          window.localStorage.clear();

          setTimeout(this.$router.push('/#/topiclist/all'),)
      }
    }
</script>

<style scoped>

</style>
