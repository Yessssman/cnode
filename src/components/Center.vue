<template>

</template>

<script>
    export default {
        name: "Center",
      data(){
        return {

        }
      },
      computed: {
          loginname() {
            return this.$store.state.userinfo.loginname;
          }
      },
      created() {
          console.log(this.$store.state.userinfo.loginname)
          this.$router.replace('/user/' + this.loginname)
      }
    }
</script>

<style scoped>

</style>
