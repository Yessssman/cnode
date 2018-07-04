<template>

</template>

<script>
    export default {
        name: "Center",
      computed: {
          loginname: function () {
            return this.$store.state.userinfo.loginname;
          }
      },
      created() {
          this.$router.replace('/user/' + this.loginname)
      }
    }
</script>

<style scoped>

</style>
