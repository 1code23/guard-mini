// import { openId } from "@/common/constant/index.js";
import {
	UPLOADURL,
	ISENTRYPT
} from "@/utils/constant.js";
import {
	aes_encrypt,
	aes_decrypt
} from '@/utils/aes_endecrypt.js';
import URLSearchParams from '@ungap/url-search-params'
const baseURL = UPLOADURL
let needLoadCount = 0;
function shoLoad(text) {
	if (needLoadCount === 0) {
		uni.showLoading({
			title: text?text:"加载中",
			mask: true,
		});
	}
	needLoadCount += 1
}

function hideLoad() {
	if (needLoadCount <= 0) {
		return
	}
	needLoadCount -= 1;
	if (needLoadCount === 0) {
		uni.hideLoading();
	}
}
function fungoPreviousPage(){ //获取当前页面的路由
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route //获取当前页面路由
	let curParam = routes[routes.length - 1].options; //获取路由参数
	// 拼接参数
	let param = ''
	for (let key in curParam) {
		if (!param) {
			param += key + '=' + curParam[key]
		} else {
			param += '&' + key + '=' + curParam[key]
		}
	}
	// 如果是首页则不记录
	if (curRoute != 'pages/home/home'||curRoute != 'pages/login/login') {
		uni.setStorageSync('pageUrl', '/' + curRoute + '?' + param)
	}
	// console.log(uni.getStorageSync('pageUrl'),'当前页面路由');
}
export default function request(method, apiUrl, params) {
	// 请求地址
	let url = baseURL + apiUrl;
	let data='';
	let header;
	params=params||{}
	if (ISENTRYPT) { //加密
		if (method === 'GET' || method === 'get') {
			
			if (JSON.stringify(params)!='{}') {
				let paramsStr = new URLSearchParams(params).toString();
				url = url + "?" + aes_encrypt(paramsStr);
			}
			// console.log(url,paramsStr,'加密');
		} else { // if (method === "POST") {
			data = aes_encrypt(JSON.stringify(params));
		}
		// data = params ? aes_encrypt(JSON.stringify(params)) : aes_encrypt(JSON.stringify({})); // 请求参数 加密
		// data =aes_encrypt(JSON.stringify(params)); // 请求参数 加密
		header = {
			'Authorization': 'Bearer ' + uni.getStorageSync('token') || '',
			// 'X-Child-Id':this.$store.binduser.id||''
			'Content-Type':'application/json; charset=UTF-8',//解决pc端请求参数多“的问题
			'X-Child-Id':uni.getStorageSync('X-Child-Id')||''
		} //加密
		// console.log(url,paramsStr,'加密',aes_decrypt(data));
		// console.log(url,paramsStr,'加密');
	} else {
		data = params, // 请求参数 不加密
			header = {
				'X-Data-Raw': 'real',
				'Authorization': 'Bearer ' + uni.getStorageSync('token') || '',
				// 'X-Child-Id':this.$store.binduser.id||''
				'X-Child-Id':uni.getStorageSync('X-Child-Id')||''
			} //不加密
	}
	// data.openId = uni.getStorageSync(openId)
	// shoLoad()
	if(!params.isLoad){
		if(params.curtext){
			shoLoad('加载中')
		}else{
		shoLoad()
		}
	}
	if(params.isLoad){hideLoad()}
	return new Promise((resolve, reject) => {
		// 发起请求
		uni.request({
			url,
			method,
			data,
			header,
			timeout:25000,
			// header:{'Authorization':'Bearer '+uni.getStorageSync('token')||''},//加密
			// header:{'X-Data-Raw': 'real','Authorization':'Bearer '+uni.getStorageSync('token')||''},//不加密
			success(res) {
				// fungoPreviousPage()
				// 请求成功后的操作
				// console.log(aes_decrypt('XydOJjFAyWdsiRhLCwFuEg: ='),'解密数据');
				// console.log(aes_decrypt('qBI/BxhQPn8FqZEOGYsuj2byR9OTfdwEw+1vd6F9xFXAckdsId642HbQ8zCBoVRX'),'解密数据11');
				if (res.statusCode == 200) {
					if (ISENTRYPT) {
						let response = aes_decrypt(res.data.toString()) //加密
						resolve(JSON.parse(response)); //加密
					} else {
						resolve(res.data); //不加密
					}
					// resolve(JSON.parse(response));//加密
					// resolve(res.data);//不加密
				} else if (res.statusCode == 401) {
					uni.setStorageSync('testToken','')
					fungoPreviousPage()
					let url=uni.getStorageSync('pageUrl')
					uni.showToast({
						title: '登录已过期，请重新登录',
						icon: 'none',
						duration: 3000
					})
					let obj = encodeURIComponent(JSON.stringify({
						url:url
					}))
					uni.reLaunch({
						url: "/pages/login/login?url="+obj,
					})
				}
				// else if (res.statusCode == 403) {
				// 	console.log(res.statusCode, "报错地址", url)
				// 	uni.clearStorageSync()
				// 	var page = getCurrentPages()
				// 	if (page[0].route == 'pages/index/index') {
				// 		page[0].onShow()
				// 	}
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '登录已过期，请重新登录',
				// 		confirmText: '确认',
				// 		confirmColor: '#55d88a',
				// 		showCancel: false,
				// 		success(res) {
				// 			uni.reLaunch({
				// 				url: '/pages/index/index'
				// 			})
				// 		}
				// 	})
				// } 
				else {
					//其他异常
					reject(false);
					uni.showToast({
						title: '服务器连接错误',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail(err) {
				if(err.errMsg.indexOf("request:fail") != -1 ||  err.errMsg=='request:fail '||err.errno=='600001'||err.errCode=='600001'){
					// console.log(333);
					uni.showToast({
						title: '暂无网络连接',
						icon: 'none',
					})
				}
				if(url.search("/refresh") != -1&&(err.errMsg.indexOf("request:fail") != -1 ||  err.errMsg=='request:fail '||err.errno=='600001'||err.errCode=='600001')){
				  resolve(600001)				
				}else{
				  reject(err)		
				}
			    			
			},
			complete: (res) => {
				hideLoad()
			}
		})
	})
}
