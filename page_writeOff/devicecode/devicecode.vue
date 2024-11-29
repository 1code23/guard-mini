<template>
	<view class="passwordBox borderbox">
		<view class="fc jc ac">
			<image src="https://hsapmarket.zy845.com/guard/wx/devicecode2x.png" mode="" class="passwordIcon"></image>
			<view class="color0 fz44 passtext">
				<text>输入绑定码</text>
			</view>
			<view>
				<VerifyCode v-model="verifyCode" @confirm="confirm"></VerifyCode>
				<view class="fz28 errtext disfr jc" >
					<text v-show="iserrorPassword">{{errMsg}}，请重新输入绑定码</text>
				    <text v-show="!iserrorPassword" class="opactive0">占位符</text>
				</view>
			</view>
			
		</view>
		<view class="descBox">
			<view class="disfr fz28 color9">
				<view class="flag"></view>
				<view class="lineBox">绑定码在老人手机-时间管理APP我的-添加设备二维码界面；</view>
			</view>
			<view class="disfr fz28 color9 m8">
				<view class="flag"></view>
				<view class="lineBox">绑定码为6位数字；</view>
			</view>
			<view class="disfr fz28 color9 ">
				<view class="flag"></view>
				<view class="lineBox">绑定码有效期为10分钟，请在10分钟内输入；</view>
			</view>
			<view class="dja submitBox">
				<view :class="['submitBtn','fw600','btn','dja','fz32','cof',{ bgcolor: verifyCode && verifyCode.length === 6, nobgcolor: !verifyCode || verifyCode.length !== 6 }]" @click="submitBtn">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import VerifyCode from '../components/xt-verify-code/components/xt-verify-code/xt-verify-code.vue'
	export default {
		components: {
			VerifyCode
		},
		data() {
			return {
				iserrorPassword: false,
				verifyCode:null,
				errMsg:''
			};
		},
		methods: {
			confirm(val){
				this.getBoundDevice({
					code: val
				})
			},
			submitBtn(){
				this.getBoundDevice({
					code: this.verifyCode
				})
			},
			getBoundDevice(obj) {
				let s=!/^\d{6,}$/.test(obj.code)
				if(s){
					uni.showToast({
						title: '请输入正确绑定码',
						icon: "none"
					})
					return
				}
				if(!obj.code){
					uni.showToast({
						title: '绑定码必填',
						icon: "none"
					})
					return
				}
				this.$apiCom.getBoundDevice(obj).then(res => {
					if (res.code == 0) {
						let dataObj = res.data
						if (res.data.gender == 2) {
							dataObj.showData = '女'
						} else if (res.data.gender == 1) {
							dataObj.showData = '男'
						} else {
							dataObj.showData = ''
						}
						this.iserrorPassword=false
						dataObj.deviceCode = obj.code
						let list = encodeURIComponent(JSON.stringify(dataObj))
						uni.navigateTo({
							url: '/page_detail/setchildinfo/setchildinfo?list=' + list
						})
					} else if (res.code == 3013) {
						this.errMsg=res.msg
						this.iserrorPassword=true
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration:2000
						})
						this.verifyCode=null
						return
					} else {
						this.iserrorPassword=false
						let type = encodeURIComponent(JSON.stringify({
							type: true,
							deviceCode: obj.code
						}))
						uni.navigateTo({
							url: '/page_detail/setchildinfo/setchildinfo?list=' + type
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.passwordBox {
		padding: 76rpx 68rpx 0 68rpx;
		.passwordIcon {
			width: 114rpx;
			height: 114rpx;
		}
		.passtext {
			margin: 52rpx 0 96rpx;
		}
		.errtext {
			color: #EB5F58;
			margin: 24rpx;
		}
		.descBox{
			margin: 24rpx 0;
			.m8{
				margin: 8rpx 0;
			}
			.flag{
				margin-top: 12rpx;
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				margin-right: 12rpx;
				background-color: #d8d8d8;
			}
			
			.submitBox {
				margin-top: 96rpx;
			.btn {
				width: 562rpx;
				height: 88rpx;
				border-radius: 48px;
			}
				.submitBtn {
					margin-bottom: 52rpx;
				}
				.bgcolor {
					background: #0066FF;
				}
				.nobgcolor {
					background: #92BBF9;
				}
			}
		}
	}
</style>
