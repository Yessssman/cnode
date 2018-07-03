const mutations = {
 mutationIsShowMoreMenus(state, payload) {
  state.isShowMore = payload
 },
 mutationLogin: function (state) {
   state.isLogined = true;
   console.log(state.isLogined)
 }
}
export default mutations
