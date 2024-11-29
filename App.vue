<script>
	import routingIntercept from '@/utils/permission.js'
	import { getLatestVersion } from '@/utils/latestVersion'
	export default {
		globalData:{
		    customBar:'',
			isFirstBind:false,//是否首次绑定 1表示第一次 2表示不是第一次 这里设置 true和false为默认值
			childId:null,//绑定孩子的id
			scene:'',//进入场景
			isStartUse:false,//一进入小程序是否刷新
		},
		onLaunch: function(scen) {
			getLatestVersion()// 获取系统是否更新信息
			this.globalData.scene = scen.scene
			this.globalData.isStartUse = true
			uni.setStorageSync('userCoMsg', JSON.stringify(this.$store.state))
			if (uni.getStorageSync('userCoMsg')) {
				Object.assign(this.$store.state, JSON.parse((uni.getStorageSync('userCoMsg'))))
				setTimeout(function() {
					uni.removeStorageSync('userCoMsg')
				}, 500)
			}
			// console.log(this.$fun.getUser('user'), '本地存储');
			// console.log(uni.getStorageSync('userCoMsg'), '本地存储全局信息');
		 if (uni.getStorageSync('token')) {
			 // uni.setStorageSync('token', this.$store.state.userInfo.token);
				//存在则关闭启动页进入首页
				// plus.navigator.closeSplashscreen();
				// uni.switchTab({
				// 	url: '/pages/home/home'
				// });
			} else {
				//不存在则跳转至登录页
		 	uni.reLaunch({
					url: "/pages/login/login",
				})
			}
		},
		onShow: function() {
			let that = this;
			uni.getSystemInfo({
			　success:function(e){
			　　that.globalData.statusBar = e.statusBarHeight
			　　// #ifndef MP
			　　if(e.platform == 'android') {
			　　　　that.globalData.customBar = e.statusBarHeight + 50
			　　}else {
			　　　　that.globalData.customBar = e.statusBarHeight + 45
			　　}
			　　// #endif
			　　// #ifdef MP-WEIXIN
			　　let custom = wx.getMenuButtonBoundingClientRect()   
			　　that.globalData.customBar = custom.bottom + custom.top - e.statusBarHeight
			　　// #endif
			　　// #ifdef MP-ALIPAY
			　　that.globalData.customBar = e.statusBarHeight + e.titleBarHeight
			　　// #endif
			　}
			})
		},
		onHide: function() {
			// console.log('App Hide')
			uni.reLaunch({
				url: "/pages/index/index",
			})
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import "common/css/common.css";
	/* #ifndef APP-NVUE */
	

	// 设置整个项目的背景色
	page {
		// background-color: #f5f5f5;
		background-color: #fff;
		font-size: 24rpx;
		font-weight: 400;
		padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
