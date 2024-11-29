<template>
	<view class="mainBox">
		<view class="userinfo">
			<view class="color3 fz32 childBox">
				<view class="disfr jsb ac avatarBox">
					<text class="fz32 fw550 color0">头像</text>
					<view class="disfr ac">
						<uploadimg v-if="!isAnonymous" textstring='' @uploadSuccess='uploadBtn' ref="upload" style="opacity: 0;"></uploadimg>
						<image :src="avatarUrl" mode="" class="avatarimg" @click="uploadavatar"></image>
					</view>
				</view>
				<text class="fw550">联系人名称</text>
				<input type="text" :value='childInfo.nickName' :cursor-spacing="100" :class="['nicknameinput',{disabledClass:!childInfo.isAdmin}]"
				:disabled="!childInfo.isAdmin"	@input="inputvalue($event,1)" placeholder="请输入联系人名称" />
				<text class="fw550">手机号码</text>
				<input type="text" :value='childInfo.phoneNo' :cursor-spacing="100" :class="['nicknameinput',{disabledClass:!childInfo.isAdmin}]"
				:disabled="!childInfo.isAdmin"	@input="inputvalue($event,2)" placeholder="请输入手机号码" />
			</view>
			<view class="dja submitBox" v-if="childInfo.isAdmin">
				<view  :class="['cof', 'fw600', 'btn', 'dja', 'fz32','submitBtn', { bgcolor: userinfo.nickName && userinfo.phoneNo && userinfo.identity, nobgcolor: (!userinfo.nickName || !userinfo.phoneNo || !userinfo.identity) }]" @click="submitBtn">确认</view>
			</view>
		</view>
		<view class="deviceinfo fw550">
			<view class="fz32 color0 mb42">设备详情</view>
			<view class="mb62">
				<myrow leftString='设备名称' :rightString='childInfo.device.name'></myrow>
			</view>
			<view class="mb62">
				<myrow leftString='设备型号' :rightString='childInfo.device.model'></myrow>
			</view>
			<view class="mb62">
				<myrow leftString='剩余电量' :rightString="childInfo.device.batteryCap + '%'"></myrow>
			</view>
			<view class="mb62">
				<myrow leftString='当前状态' :rightString="childInfo.device.currentState=='locked'?'已锁屏':childInfo.device.currentState == 'unlock'?'已解锁':childInfo.device.model?'已绑定设备':'未绑定设备'"></myrow>
			</view>
			<view class="">
				<myrow leftString='最后联网时间' :rightString='childInfo.device.lastConnectTime'></myrow>
			</view>
		</view>
		<view class="dja footBox">
			<view class="unBind fw400 btn dja fz32" @click="unbindBtn">解除绑定</view>
		</view>
		<view>
			<uni-popup ref="alertDialog" type="dialog">
				<DialogPoup :undindType='undindType' title="解除绑定" :content="unbindContent" closeStr= "取消" submitStr="确定" @closeBtn="dialogClose" @submitBtn="dialogConfirm"></DialogPoup>
			</uni-popup>
		</view>
		<view class="">
			<TestPopup ref="testPopup"></TestPopup><!-- 试用模式弹窗提示 -->
		</view>
	</view>
</template>

<script>
	import myrow from '../components/my-row-comp/my-row-comp.vue'
	import pickerRadio from "../components/picker-radio/picker-radio.vue"
	import pickermultiselector from '../components/picker-multiselector/picker-multiselector.vue'
	import pickertime from '../components/picker-time/picker-time.vue'
	import uploadimg from '../components/uploadimg/uploadimg.vue'
	import inputDialog from "../components/inputDialog/inputDialog.vue"
	import TestPopup from '../components/testPopup/testPopup.vue'
	import DialogPoup from '../components/dialogPoup/dialogPoup.vue'
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			DialogPoup,
			myrow,
			pickerRadio,
			pickermultiselector,
			pickertime,
			uploadimg,
			inputDialog,
			TestPopup
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		data() {
			return {
				unbindContent:'解除绑定后,将无法查看老人端位置、远程卸载应用和开启骚扰拦截,确定要解除绑定吗?',
				undindType:1,//2解绑最后一个家长
				type:'set',
				genderArray: [{
					id: 1,
					label: '男'
				}, {
					id: 2,
					label: '女'
				}],
				ageArray:[],
				agecheck: 0, //选中年龄数组的下标
				showAgeData: '', //选中的年龄数据	12岁	
				nickName: '',
				phoneNo: '',
				avatarUrl: "",
				peciercheck: 0, //选中男女数组的下标
				showData: '', //选中的男女数据	男		
				checkindex: '1,0', //选中的数据  第一个字符 表示0小学 1初中 2高中 第二个字符表示对应年级 例如 1,0表示初中 初一
				checkdate: '', //出生年月 格式 2022-06
				childInfo: {}, //孩子信息
				onearray: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
				twoarray: ['初一', '初二', '初三'],
				threearray: ['高一', '高二', '高三'],
				isAnonymous:true,
				isrepert:false
			};
		},
		onLoad(query) {
			if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
								this.isAnonymous=true
							}else{
								this.isAnonymous=false
							}
		
			this.childInfo = JSON.parse(decodeURIComponent(query.childInfo))
			this.avatarUrl = this.childInfo.avatarUrl||'https://hsapmarket.zy845.com/guard/wx/family2x.png '
		},
		methods: {
			pickerChange(val) {
				this.peciercheck = val
				this.showData = this.genderArray[val].label
			},
			ageChange(val){
				this.agecheck = val
				this.showAgeData = this.ageArray[val].label
			},
			submitClass(val) {
				this.checkindex = val.join(',')
			},
			pickerdateChange(val) {
				this.checkdate = val
			},
			unbindBtn() {
				if(uni.getStorageSync('isLoginTest')){//试用模式下不可解绑
					uni.showToast({
						title: '试用模式下不可解绑',
						icon: 'none',
					})
					return
				}
				if(this.isrepert){
					return
				}
				if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
					this.$refs.testPopup.opendialog()
					return
				}
				if(this.childInfo.boundNum>1){
					this.unbindContent=this.childInfo.isAdmin?'解除绑定后,您的管理员权限将移交给其他家长,确定要解除绑定吗?':'解除绑定后,将无法查看老人端位置、远程卸载应用和开启骚扰拦截,确定要解除绑定吗?'
				    this.undindType=1
				}else{
					this.undindType=2
				}
				this.$refs.alertDialog.open()
			},
			inputs(e) {
				this.nickName = e
			},
			inputsPhone(e) {
				this.phoneNo = e
			},
			submitBtn() {
				let obj = {
					nickName: this.childInfo.nickName,
					avatarUrl: this.avatarUrl,
					phoneNo:this.childInfo.phoneNo
				}
				if(obj.nickName.length>10){
					uni.showToast({
						title: '名称不可超过10个字符，请重新输入',
						icon: 'none',
						duration:3000
					})
					return
				}
                if(obj.phoneNo&&this.$fun.checkPhone(obj.phoneNo)){
                	uni.showToast({
                		title: '输入正确手机号',
                		icon: 'none',
						duration:3000
                	})
                	return
                }
				let reg=/^\S+$/;
				if (!obj.nickName||!reg.test(obj.nickName)) {
					uni.showToast({
						title: '名称不可为空或空格',
						icon: 'none'
					})
					return
				}
				uni.setStorageSync('X-Child-Id',this.childInfo.id)
				this.$apiCom.undataChild(this.childInfo.id, obj).then(res => {
					if (res.code == 0) {
						this.isrepert=true
						if (this.childInfo.id === this.binduser.id) {
							let childinfo = this.binduser
							childinfo.avatarUrl = obj.avatarUrl
							childinfo.nickName = obj.nickName
							childinfo.phoneNo = obj.phoneNo
							this.$store.commit("user/SET_BINDUSER", childinfo);
						}
					
							this.isrepert=false
								uni.navigateBack({
								        delta: 1
								      });

					}else{
						this.isrepert=false
						uni.showToast({
							title: res.msg,
							icon:'none',
							duration:3000
						})
					}
				})
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			dialogConfirm(isClaer) {
				this.$apiCom.deleteChild(this.childInfo.id,{isCleanDeviceData:isClaer?1:2}).then(res => {
					if (res.code == 0) {
						if (this.childInfo.id === this.binduser.id) {
							this.$store.commit("user/SET_BINDUSER", {});
						}
						uni.showToast({
							title: '操作成功',
							duration: 2000
						})
						this.dialogClose()
						this.$apiCom.getChild({}).then(res => {
							if (res.code == 0) {
								if(res.data.length>0){
									setTimeout(function() {
										
										uni.reLaunch({
											url: '/pages/home/home'
										});
									}, 1000);
								} else{
									setTimeout(function() {
										
										uni.reLaunch({
											url: '/pages/mine/mine'
										});
									}, 1000);
								}
							}
						})
						
						this.$refs.alertDialog.close()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 3000
						})
					}
				})

			},
			uploadBtn(val) {
				this.avatarUrl = val.url
			},
			uploadavatar(){
				if(this.childInfo.isAdmin){
				this.$refs.upload.uploadBtn()
				}
			},
			inputvalue(val,type){
				if(type==1){
					this.childInfo.nickName=val.detail.value
				}else{
					this.childInfo.phoneNo=val.detail.value
				}
			}
		}
	}
</script>

<style lang="scss">
	.mainBox {
		background-color: #f7f7f7;
		padding: 32rpx 0 30rpx;

		.userinfo {
			background: #fff;
            border-radius: 32rpx;
			margin: 0rpx 32rpx 0;
			.avatarBox{
				margin-bottom: 66rpx;
			}
			.unserimg {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
	.avatarimg {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			// margin-bottom: 28rpx;
		}
			.headimgbtn {
				margin: 14rpx 0 40rpx;
			}
		}

		.deviceinfo {
			background: #fff;
			margin-top: 20rpx;
			padding: 34rpx 40rpx;
            border-radius: 32rpx;
			margin: 20rpx 32rpx 150rpx;
		}

		.btn {
			width: 562rpx;
			height: 88rpx;
			border-radius: 48px;
		}

		.submitBtn {
			border-radius: 58rpx;
			border: 2rpx solid #0066FF;
			margin-bottom: 52rpx;
			color: #0066FF;
		}
.footBox{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	padding: 20rpx 0 28rpx;
}
		.childBox{
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			padding: 48rpx 36rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
		}
		.unBind {
			background: #EEEEEE;
			color: #F01818;
		}

		.mb62 {
			margin-bottom: 62rpx;
		}
		.pb62{
			padding-bottom: 62rpx;
		}
		.mb42 {
			margin-bottom: 42rpx;
		}

		/deep/ .uni-button-color {
			color: #0066FF;
			font-size: 32rpx;
		}
/deep/ .uni-dialog-input {
		border-radius: 50rpx;
		color: #000;
		font-size: 30rpx;
	}
	/deep/ .uni-popup-dialog{
		border-radius: 32rpx;
	}
	/deep/ .uni-dialog-title-text{
		font-weight: 400;
		color: #333333;
		font-size: 32rpx;
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
		font-weight: 550;
	}
	.disabledClass{
		color: #999;
		font-weight: 500;
	}
		// .nicknameinput {
		// 	text-align: left;
		// 	color: #999;
		// 	// background: rgba(189, 189, 189, 0.13);
		// 	// border-radius: 48rpx;
		// 	padding: 17.5rpx 30rpx 17.5rpx 0;
		// 	// box-sizing: border-box;
		// }
	}
</style>
