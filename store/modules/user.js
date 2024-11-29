import {
	// getHotCities,
	getOpenid
} from "@/serveApi/commonApi.js";

const state = {
	userInfo: {
		hasLogin:false,//是否登录
		token:'',
		userInfo:{},
		isAdmin:true,
		id:null
	}, //用户信息
	binduser:{id:null},//绑定的用户信息
	cityList: {}, //城市列表信息
    openid:'',
};
const mutations = {
	SET_USER_INFO(state, data) {
		state.userInfo = data;
	},
	SET_CITY_INFO(state, data) {
		state.cityList = data;
	},
	SET_OPENID(state,data){
		state.openid = data;
	},
	SET_BINDUSER(state,data){
		state.binduser=data;
	},
	CLEAR_BINDUSER(state,data){
		state.binduser=data;
	}
};

const actions = {
	setUserInfo({commit},data){
		commit('SET_USER_INFO',data)
	},
	clearUserInfo({commit},data){
		commit('CLEAR_BINDUSER',data)
	},
	// // 获取城市列表信息
	// getCityList({
	// 	commit
	// }) {
	// 	return new Promise((resolve, reject) => {
	// 		getHotCities()
	// 			.then((res) => {
	// 				//后端返回用户数据
	// 				commit("SET_CITY_INFO", res.data);
	// 				resolve(res);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});

	// 	});
	// },
	getOpenidData({
		commit
	}) {
		return new Promise((resolve, reject) => {
			getOpenid()
				.then((res) => {
					//后端返回用户数据
					commit("SET_OPENID", res.data);
					resolve(res);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};


export default {
	 namespaced: true,
	state,
	mutations,
	actions,
};
