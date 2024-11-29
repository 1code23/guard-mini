import Vue from 'vue'
import Vuex from 'vuex'

import user from "@/store/modules/user.js"
import goodInfo from "@/store/modules/goodInfo.js"

Vue.use(Vuex);
import getters from "./getters";
//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { //存放状态
		user,
		goodInfo
	},
	getters
})
export default store
