<template>
	<view class="mainBox">
		<view class="contentBox">
		<view class="">
			<view class="disfr jsb ac">
				<text class="fz32 fw550 color0">头像</text>
				<view class="disfr ac">
					<uploadimg v-if="!isAnonymous" textstring='' @uploadSuccess='uploadBtn' ref="upload" style="opacity: 0;"></uploadimg>
					<image :src="childInfo.avatarUrl" mode="" class="avatarimg" @click="uploadavatar"></image>
				</view>
			</view>
		</view>
		<view class="">
			<view class="disfr jsb ac identyrow1">
				<text class="fz32 fw550 color0">身份</text>
				<view class="disfr ac" @click='popupBtn'>
					<text class="fz32 color9">{{childInfo.identity}}</text>
					<img src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" alt="" class='arrowBtn'>
				</view>
			</view>
		</view>
		<view class="">
			<view class="disfr jsb ac identyrow">
				<text class="fz32 fw550 color0">绑定手机号</text>
				<view class="disfr ac">
					<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if='!userTest&&!childInfo.phoneNo'
						class="getphoneBtn fz32 dja color9">立即绑定	<img v-if="!childInfo.phoneNo" src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" alt="" class='arrowBtn'></button>
					<text v-if="childInfo.phoneNo" class="fz32 color9">{{childInfo.phoneNo}}</text>
				</view>
			</view>
		</view>
		</view>
		<view class="footbox">
			<view class="layoutBox fz32 color0 fw550 dja" @click="loGoOut">退出登录</view>
		</view>
           <uni-popup ref="popup" type="dialog" :animation="false">
			<uni-popup-dialog ref="inputClose" @close="close" :before-close="true" mode="input" title="身份"
				:value="inputidentityName" placeholder="请输入你与老人的关系" @confirm="saveBtn"
				class="custom-popup-dialog">
				<input type="text" :value='inputidentityName' class="uni-input nicknameinput" @input="inputs"
					placeholder="请输入你与老人的关系" />
			</uni-popup-dialog>
		</uni-popup>
		</uni-popup>
	    <view class="">
	    	<TestPopup ref="testPopup"></TestPopup><!-- 试用模式弹窗提示 -->
	    </view>
		<uni-popup ref="logoutPopup" background-color="#fff">
			<view class="logountTitle fw550 color0 disfr jc">退出登录</view>
			<view class="popup-content fc ac">
				<view class="disfr ac color0 fw500 fz30" style="margin-bottom: 32rpx;">
					退出登录后,将无法远程查看老人的设备情况和实时位置,确定要退出吗?
				</view>
				<view class="disfr jc ac">
					<view class="closeBtn fz32 color0 disfr ac jc" @click="closeBtn">取消</view>
					<view class="closeBtn logountBtn fz32 colorF0 disfr ac jc" @click="logountBtn">退出</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import myrow from '../components/my-row-comp/my-row-comp.vue'
	import uploadimg from '../components/uploadimg/uploadimg.vue'
	import TestPopup from '../components/testPopup/testPopup.vue'
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			myrow,
			uploadimg,
			TestPopup
		},
		computed: {
			...mapGetters([ "binduser"]), //获取vuex中存的数据
		},
		data() {
			return {
				userTest:false,
				inputidentityName: '',
				childInfo: {
					avatarUrl: "",
					phoneNo: '',
					identity: ''
				},
				boundArr: [],
				identityList: [{
					id: 1,
					identityName: '妈妈',
					src: 'https://apmarket.tt286.com/teeny/icon/mom2x.png',
				}, {
					id: 2,
					identityName: '爸爸',
					src: 'https://apmarket.tt286.com/teeny/icon/dad2x.png',
				}, {
					id: 3,
					identityName: '爷爷',
					src: 'https://apmarket.tt286.com/teeny/icon/yeye2x.png',
				}, {
					id: 4,
					identityName: '奶奶',
					src: 'https://apmarket.tt286.com/teeny/icon/nainai2x.png',
				}, {
					id: 5,
					identityName: '外公',
					src: 'https://apmarket.tt286.com/teeny/icon/waigong2x.png',
				}, {
					id: 6,
					identityName: '外婆',
					src: 'https://apmarket.tt286.com/teeny/icon/waipo2x.png',
				}, {
					id: 7,
					identityName: '',
					src: 'https://apmarket.tt286.com/teeny/icon/unknown2x.png',
					checked: 'true'
				}, ],
				current: 6,
				isRepeat:false,
				isAnonymous:true,
			};
		},
		onLoad(query) {
			this.userTest=uni.getStorageSync('isLoginTest')
			let info = JSON.parse(decodeURIComponent(query.info))
			this.childInfo = info
			let obj = this.identityList.find(item => {
				return item.identityName === this.childInfo.identity
			})
			if (obj) {
				this.current = obj.id - 1
			} else {
				this.current = 6
				this.inputidentityName = this.childInfo.identity
			}
if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
					this.isAnonymous=true
				}else{
					this.isAnonymous=false
				}
				
		},
		methods: {
			inputs(e) {
				this.inputidentityName = e.detail.value
			},
			popupBtn() {
				if(this.childInfo.chiledNum<=0){
					uni.showToast({
						title:'请先绑定孩子',
						icon:'none',
					})
					return
				}
				if(!this.childInfo.isAdmin){
					uni.showToast({
						title:'无权限修改',
						icon:'none',
					})
					return
				}
				if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
					this.$refs.testPopup.opendialog()
					return
				}
				let obj = this.identityList.find(item => {
					return item.identityName === this.childInfo.identity
				})
				if (obj) {
					this.current = obj.id - 1
					this.inputidentityName=''
				} else {
					this.current = 6
					this.inputidentityName = this.childInfo.identity
				}
				this.$refs.popup.open('center')
			},
			close() {
				this.$refs.popup.close()
			},
			
			submit(obj) {
				obj.elderId=this.binduser.id||0	
				this.$apiCom.editUser(obj).then(res=>{
					if(res.code==0){
						if(obj.identity){
							this.childInfo.identity=obj.identity
						}
						this.close()
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'暂无网络连接',
						icon:'none',
					})
				})
			},
			saveBtn() {
				let obj = JSON.parse(JSON.stringify(this.childInfo))
				if(this.inputidentityName.length >10){
					uni.showToast({
						title: '不可超过10个字符，请重新输入',
						icon:'none',
						duration:3000
					})
					return
				}
				if (!this.inputidentityName) {
					uni.showToast({
						title: '请输入你与老人的关系',
						icon: 'error',
						duration:3000
					})
					return
				}
				obj.identity = this.inputidentityName
				this.submit(obj)
			},
			uploadBtn(val) {
				this.childInfo.avatarUrl=val.url
				this.submit({avatarUrl:val.url,elderId:this.binduser.id})
			},
			uploadavatar(){
				if(uni.getStorageSync('isLoginTest')||uni.getStorageSync('testClickNum')==1||uni.getStorageSync('testClickNum')==2){//试用模式下第一次点击
					this.$refs.testPopup.opendialog()
					return
				}
				this.$refs.upload.uploadBtn()
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.identityList.length; i++) {
					if (this.identityList[i].id == evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			async loGoOut() {
				if(this.isRepeat){return}
				this.isRepeat=true
				if(uni.getStorageSync('testClickNum')||uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
					this.$refs.testPopup.opendialog()
					this.isRepeat=false
					return
				}
				if(this.childInfo.isAnonymous){
					this.$fun.clear()
					this.$store.commit("user/SET_BINDUSER", {id:''});
					uni.reLaunch({
						url: '/pages/login/login'
					})
					return
				}
				this.$refs.logoutPopup.open('center')
				
			},
		closeBtn() {
			this.$refs.logoutPopup.close()
		},
		getPhoneNumber(e) {
			if (!e.detail.code) {
				return
			}
			this.$apiCom.requestphone({
				code: e.detail.code
			}).then(res => {
				if (res.code == 0) {
					this.childInfo.phoneNo=res.data
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			})
		},
		async logountBtn(){
			let res=await this.$apiCom.logout()
			if(res.code==0){
				this.closeBtn()
				this.$fun.clear()
				this.$store.commit("user/SET_BINDUSER", {id:''});
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}else{
				this.isRepeat=false
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration:3000
				})
			}
		}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		padding: 30rpx 32rpx 0;
		background-color: #f5f5f5;
height: 100vh;
		// height: 100vh;
		.avatarimg {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			margin-bottom: 28rpx;
		}

		.identyrow {
			margin: 36rpx 0;
		}
		.identyrow1 {
			margin: 56rpx 0;
		}

		.footbox {
			position: fixed;
			bottom: 108rpx;
			left: 94rpx;
			.layoutBox {
				width: 562rpx;
				height: 88rpx;
				background: rgba(189, 189, 189, 0.13);
				border-radius: 48rpx;
			}
		}

	}
.contentBox{
	background-color: #fff;
	border-radius: 32rpx;
	padding: 32rpx 32rpx 8rpx 36rpx;
}
	.identityBox {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 20rpx;

		.userpng {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			margin-right: 14rpx;
		}

		.inputClass {
			width: 436rpx;
			height: 70rpx;
			background: rgba(204, 204, 204, 0.2);
			border-radius: 36rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
		}
	}

	.handBtn {
		width: 281rpx;
		height: 79rpx;
		color: #fff;
		border-radius: 43rpx;
		font-size: 29rpx;
	}

	.refuse {
		background: #EB5F58;
	}

	.agree {
		background: #1BD17B;
		margin-left: 36rpx;
	}

	.mb20 {
		margin-bottom: 20px;
	}
	/deep/.uni-border-left .uni-button-color{
		color: #0066FF;
	}
	.getphoneBtn {
		border: none;
		// height: 54rpx;
		box-sizing: border-box;
		 background: #fff;
		 outline: nono;
		 padding: 0;
		 margin: 0;
		 border: 0;
		// margin-top: 8rpx;
	}
	button::after{
		  border: 0;
	}
	/deep/ .uni-dialog-input {
		border-radius: 50rpx !important;
	}
	/deep/ .uni-button-color {
		color: #0066FF;
	}
	/deep/.uni-popup__info {
	     color: #000; 
	}
	.nicknameinput {
		text-align: left;
		color: #999;
		background: rgba(189, 189, 189, 0.13);
		border-radius: 48rpx;
		padding: 20rpx 30rpx;
		width: 100%;
	}
	.popup-content {
		padding: 32rpx 48rpx;
		border-radius: 26rpx;
		background-color: #fff;
		width: 670rpx;
		box-sizing: border-box;
	}
	.closeBtn{
		width: 270rpx;
		height: 88rpx;
		background: rgba(178,178,178,0.22);
		border-radius: 48rpx;
		margin-top: 24rpx;
	}
	.logountBtn{
		margin-left: 20rpx;
	}
	.logountTitle{
		font-size: 34rpx;
		margin-top: 54rpx;
	}
</style>
<style>
	.uni-popup .uni-popup__wrapper {
		border-radius: 44rpx;
	}
</style>
