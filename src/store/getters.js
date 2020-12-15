const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.UserInfo.username,
  userId: state => state.user.UserInfo.userId,
  companyId: state => state.user.UserInfo.companyId
}
export default getters
