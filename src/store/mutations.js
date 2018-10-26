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
      loginname: payload.loginname,
      id: payload.id,
      avatar_url: payload.avatar_url
    }
  }
}
export default mutations
