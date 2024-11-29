<template>
	<view class="mainBox">
		<view class="userinfo">
			<view class="fc ac jc" style="padding-top: 96rpx;">
				<image src="https://apmarket.tt286.com/teeny/icon/unknown2x.png" mode="" class="unserimg"
					v-show="!userinfo.avatarUrl">
				</image>
				<image :src="userinfo.avatarUrl" mode="" class="unserimg" v-show="userinfo.avatarUrl"></image>
				<view class="headimgbtn color3 fz32 fw400" v-show="type == 'set'">
					<uploadimg textstring='点击设置头像' @uploadSuccess='uploadBtn' ref="upload"></uploadimg>
				</view>
				<view class="headimgbtn color3 fz32 fw400" v-show="type == 'look'">头像</view>
			</view>
			<view class="color3 fz32 childBox">
				<text class="textClass">昵称</text>
				<input type="text" :value='userinfo.nickName' :cursor-spacing="100" :class="['nicknameinput',{disabledClass:type == 'look'}]"
				:disabled="type == 'look'"	@input="inputvalue($event,1)" placeholder="请输入你对老人的称呼" />
				<text class="textClass">手机号码</text>
				<input type="text" :value='userinfo.phoneNo' :cursor-spacing="100" :class="['nicknameinput',{disabledClass:type == 'look'}]"
				:disabled="type == 'look'"	@input="inputvalue($event,2)" placeholder="请输入老人的手机号码" />
				<text class="textClass">身份</text>
				<input type="text" :value='userinfo.identity' :cursor-spacing="100" class="nicknameinput"
					@input="inputvalue($event,3)" placeholder="请输入你与老人的关系" />	
			</view>
			<view class="dja submitBox">
				<view  :class="['cof', 'fw600', 'btn', 'dja', 'fz32','submitBtn', { bgcolor: userinfo.nickName && userinfo.phoneNo && userinfo.identity, nobgcolor: (!userinfo.nickName || !userinfo.phoneNo || !userinfo.identity) }]" @click="submitBtn">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import uploadimg from '../components/uploadimg/uploadimg.vue'
	export default {
		components: {
			uploadimg,
		},
		data() {
			return {
				type: 'look', //look 确认孩子信息 set设置孩子信息
				userinfo: {
					nickName: '',
					avatarUrl: "https://apmarket.tt286.com/teeny/icon/unknown2x.png",
					identity: "",
					phoneNo: ''
				},
				isTabBtnClicked:false,
				deviceCode: null //扫码得到的code
			};
		},
		onLoad(query) {
			let data = JSON.parse(decodeURIComponent(query.list))
			this.deviceCode = data.deviceCode
			if (data.type) {
				this.type = 'set'
				uni.setNavigationBarTitle({
					title: '设置老人信息'
				})
			} else {
				this.type = 'look'
				this.userinfo.nickName = data.nickName
				this.userinfo.avatarUrl = data.avatarUrl
				this.userinfo.phoneNo = data.phoneNo
				this.userinfo.identity = ''
				uni.setNavigationBarTitle({
					title: '设置身份'
				})
			}
			
		},
		methods: {
			submitBtn() { //设置孩子信息 开始提交绑定申请
				let obj = {
					...this.userinfo
				}
				let reg=/^\S+$/;
				if (!obj.nickName||!reg.test(obj.nickName)||!obj.identity||!reg.test(obj.identity)) {
					uni.showToast({
						title: '昵称和身份不可为空或空格',
						icon: 'none'
					})
					return
				}
				if (obj.nickName.length>10||obj.identity.length>10) {
					uni.showToast({
						title: '昵称和身份不可超过10个字符，请重新输入',
						icon: 'none'
					})
					return
				}
				if (obj.phoneNo && this.$fun.checkPhone(obj.phoneNo)) {
					uni.showToast({
						title: '输入正确手机号',
						icon: 'none'
					})
					return
				}
			
				if (this.isTabBtnClicked) {
					uni.showToast({
						title: '不可重复操作',
						icon: 'none'
					})
					return;
				}
				this.isTabBtnClicked=true
				this.startBound({
					code: this.deviceCode,
					elder: obj
				})
			},
			startBound(obj) {
				this.$apiCom.deviceBound(obj).then(res => {
					this.isTabBtnClicked=false
					getApp().globalData.elderId = res.data.id
					if (res.code == 0) { //第一次绑定成功
						uni.showToast({
							title: '操作成功',
							duration: 3000
						})
						setTimeout(function() {
							getApp().globalData.isFirstBind = 1
							uni.reLaunch({
								url: '/pages/home/home'
							});
						}, 2000);

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
						if (res.code == 3012) { //绑定申请待审批
							setTimeout(function() {
								getApp().globalData.isFirstBind = 2
								uni.reLaunch({
									url: '/pages/home/home'
								});
							}, 2000);
						}
					}
				})
			},

			uploadBtn(val) {
				this.userinfo.avatarUrl = val.url
			},
			uploadavatar(){
				this.$refs.upload.uploadBtn()
			},
			inputvalue(e,val) {
				if(val==1){
					this.userinfo.nickName = e.detail.value
				}else if(val==2){
					this.userinfo.phoneNo = e.detail.value
				}else{
					this.userinfo.identity = e.detail.value
				}
			},
		}
	}
</script>

<style lang="scss">
	.mainBox {
		background-color: #F7F7F7;
		height: 100vh;
		.userinfo {
			padding: 0 32rpx;
			.unserimg {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
			.headimgbtn {
				// margin: 24rpx 0 40rpx;
				margin: 24rpx 0 0rpx;
			}
		}
		.childBox{
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			padding: 48rpx 36rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
		}
		.btn {
			width: 562rpx;
			height: 88rpx;
			border-radius: 48px;
		}

		.submitBox {
            margin-top: 120rpx;
			.submitBtn {
				margin-bottom: 52rpx;
			}
		}
		.nobgcolor{
			background: #92BBF9;
		}
		.bgcolor{
			background: #0066FF;
		}
		.nicknameinput {
			width: 614rpx;
			height: 86rpx;
			background: rgba(178,178,178,0.22);
			border-radius: 44rpx 44rpx 44rpx 44rpx;
			padding-left: 40rpx;
			margin: 24rpx 0 40rpx 0;
			box-sizing: border-box;
			color: #000;
			font-weight: 50;
		}
		.disabledClass{
			color: #999;
			font-weight: 500;
		}
		.textClass{
			font-weight: 400;
		}
	}
</style>
