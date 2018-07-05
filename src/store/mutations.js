const mutations = {
 mutationIsShowMoreMenus(state, payload) {
  state.isShowMore = payload
 },
 mutationLogin: function (state) {
   state.isLogined = true;
   console.log(state.isLogined)
 },
  mutationUserInfo: function (state, payload) {
    state.userinfo = {
      loginname: payload.userinfo.loginname,
      id: payload.userinfo.id,
      avatar_url: payload.userinfo.avatar_url
    }
  }
}
export default mutations
