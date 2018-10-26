<template>
<div>
  <h5>用户登陆</h5>
  <group>
    <x-input placeholder="Access Token" v-model="accesstoken"></x-input>
  </group>
  <div style="height: 30px"></div>
  <group>
    <x-button type="primary" @click.native="login">登陆</x-button>
  </group>
</div>
</template>

<script>
import { Group, XInput, XButton } from "vux";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      accesstoken: ""
    };
  },
  methods: {
    ...mapMutations(["mutationLogin", "mutationUserInfo"]),
    login() {
      let app = this;
      let userinfo = {};
      this.$http
        .post("/accesstoken", {
          accesstoken: this.accesstoken
        })
        .then(function(response) {
          if (response.data.success) {
            window.localStorage.setItem("accesstoken", app.accesstoken);
            for (let x in response.data) {
              if (x == "success") {
                window.localStorage.setItem("loginStatus", true);
                continue;
              }
              window.localStorage.setItem(x, response.data[x]);
              userinfo[x] = response.data[x];
            }
            app.mutationLogin();
            app.mutationUserInfo(userinfo);
            app.$router.push("/topiclist/all");
          }
        })
        .catch(function(err) {
          alert(err.response.data.error_msg)
          // console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
