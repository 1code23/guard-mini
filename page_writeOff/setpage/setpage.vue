<template>
	<view class="mainBox">
		<view class="" v-for="(item,index) in array" :key="index">
		<view class="classmb62" @click='godetailPage(item)'>
			<myrow :leftString='item.title' :isString='false'></myrow>
		</view>
		</view>
		<view class="">
			<TestPopup ref="testPopup"></TestPopup>
		</view>
	</view>
</template>

<script>
	import myrow from '../components/my-row-comp/my-row-comp.vue'
	import TestPopup from '../components/testPopup/testPopup.vue'
	export default {
		components: {
			myrow,
			TestPopup
		},
		data() {
			return {
				array:[
					{title:'用户协议',path:'/page_writeOff/publicpage/publicpage?type=2'},
					{title:'隐私政策',path:'/page_writeOff/publicpage/publicpage?type=1'},
					{title:'隐私政策（简明版）',path:'/page_writeOff/publicpage/publicpage?type=6'},
					{title:'个人信息收集清单',path:'/page_writeOff/publicpage/publicpage?type=4'},
					{title:'第三方共享个人信息清单',path:'/page_writeOff/publicpage/publicpage?type=3'},
					{title:'权限申请与使用情况说明',path:'/page_writeOff/publicpage/publicpage?type=3'},
					{title:'注销账号',path:'/page_writeOff/writeOff/writeOff'},
				]
			};
		},
		methods:{
			godetailPage(val){
				if(val.title=='注销账号'&&(uni.getStorageSync('isLoginTest'))){
					this.$refs.testPopup.opendialog()
					return
				}
				uni.navigateTo({
					url:val.path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mainBox{
	padding: 32rpx 40rpx;
	background: #F7F7F7;
	height: 100vh;
	box-sizing: border-box;
	overflow-y: scroll;
	.classmb62{
		margin-bottom: 62rpx;
	}
}
/deep/.uni-border-left .uni-button-color{
		color: #0066FF;
	}
</style>
