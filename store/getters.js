const getters = {
  // app应用
  userInfo: (state) => state.user.userInfo, //当前登录的用户信息
  binduser: (state) => state.user.binduser, //当前选择的绑定的用户信息
  cityList: (state) => state.user.cityList, //所有城市信息
  // appChannelList: (state) => state.app.appChannelList, //所有渠道信息
  // appVnameList: (state) => state.app.appVnameList, //所有版本信息
};
export default getters;
