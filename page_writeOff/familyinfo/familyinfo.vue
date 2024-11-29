<template>
	<view class="mainBox">
		<view class="contentBox">
			<view class="disfr ac jsb userList">
				<text class="fz32 color3">头像</text>
				<image :src="info.avatarUrl" mode="" class="userimg"></image>
			</view>
			<view class="disfr jsb ac userList">
				<text class="fz32 color3">身份</text>
				<view class="disfr ac" @click='gosetIdentity'>
					<text class="fz28 color9">{{info.identity}}</text>
					<img src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" alt="" class='arrowBtn'>
				</view>
			</view>
			<view class="disfr ac jsb userList">
			<text class="fz32 color3">手机号码</text>
			<text class="fz28 color9">{{info.phoneNo}}</text>
		</view>
		</view>
		<view class="footBox dja">
			<view v-if="!info.isAdmin&&info.isuserAdmin" class="btnBox fw550 dja fz32 changeBtn" @click="changeIdentity(info)">转让管理员</view>
			<view v-if="info.isuserAdmin" class="btnBox fw550 dja fz32" @click="deleteDialogBtn">{{info.isAdmin?'解除绑定': '删除'}}</view>
		</view>
		<uni-popup ref="alertunbindDialog" type="dialog">
			<DialogPoup :undindType='undindType' :title="info.isAdmin?'解除绑定': '删除'" :content="unbindContent" closeStr= "取消" submitStr="确定" @closeBtn="dialogunbindClose" @submitBtn="deleteBtn"></DialogPoup>
		</uni-popup>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="转让管理员" content=''
				:before-close="true" @confirm="dialogConfirm" @close="dialogClose">
				<view class="fz32">
					转让管理员身份之后,将无法管理其他子女账号,确认要转让管理员身份给[{{info.identity}}]吗？
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup" type="dialog" :animation="false">
			<uni-popup-dialog ref="inputClose" @close="closeIdentity" :before-close="true" mode="input" title="身份"
				:value="inputidentityName" placeholder="请输入你与老人的关系" @confirm="saveBtn"
				class="custom-popup-dialog">
				<input type="number" :value='inputidentityName' class="uni-input nicknameinput" @input="inputs"
					placeholder="请输入你与老人的关系" />
			</uni-popup-dialog>
		</uni-popup>
		<view class="">
			<TestPopup ref="testPopup"></TestPopup><!-- 试用模式弹窗提示 -->
		</view>
	</view>
</template>

<script>
	import TestPopup from '../components/testPopup/testPopup.vue'
	import DialogPoup from '../components/dialogPoup/dialogPoup.vue'
	import {
		mapGetters
	} from "vuex"
	export default {
		computed: {
			...mapGetters(["userInfo", "binduser"]),
		},
		components: {
			DialogPoup,
			TestPopup
		},
		data() {
			return {
				info: {},
				inputidentityName: '',
				unbindContent:'解除绑定后,将无法查看老人端位置、远程卸载应用和开启骚扰拦截,确定要解除绑定吗?',
				undindType:1,//2解绑最后一个家长
			};
		},
		onLoad(query) {
			this.info = JSON.parse(decodeURIComponent(query.info))
		},
		onShow() {
			let that = this
			uni.$on('updateData', function(data) {
				that.info = data
			})
		},
		methods: {
			saveBtn() {
				let obj = JSON.parse(JSON.stringify(this.info))
				obj.elderId =this.binduser.id
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
			submit(obj) {
				this.$apiCom.editUser(obj).then(res=>{
					if(res.code==0){
						if(obj.identity){
							this.info.identity=obj.identity
						}
						this.closeIdentity()
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
			closeIdentity(){
				this.$refs.popup.close()
			},
			inputs(e) {
				this.inputidentityName = e.detail.value
			},
			dialogunbindClose(){
				this.$refs.alertunbindDialog.close()
			},
			deleteDialogBtn(){
				if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
					this.$refs.testPopup.opendialog()
					return
				}
				if(this.info.elderNum>1){
					this.unbindContent=this.info.isAdmin?'解除绑定后,您的管理员权限将移交给其他家长,确定要解除绑定吗?':'解除绑定后,将无法查看老人端位置、远程卸载应用和开启骚扰拦截,确定要解除绑定吗?'
				    this.undindType=1
				}else{
					this.undindType=2
				}
				this.$refs.alertunbindDialog.open()
			},
			async deleteBtn(isClaer) {
				let res = null
				// if (this.info.isAdmin) {
				// 	res = await this.$apiCom.deleteMember(this.info.id, {
				// 		elderId: this.info.queryelderId,
				// 		isCleanDeviceData:isClaer
				// 	})
				// } else {
					res = await this.$apiCom.deleteMember(this.info.id, {
						// elderId: this.binduser.id
						elderId: this.info.queryelderId,
						isCleanDeviceData:isClaer?1:2
					})
				// }
				if (res.code == 0) {
					if(this.info.queryelderId==this.binduser.id){
						this.$store.commit("user/SET_BINDUSER", {id:''});
					}
					uni.showToast({
						title: res.msg
					})
					this.dialogunbindClose()
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
						duration: 2000
					})
				}
			},
			gosetIdentity() {
				// if (!this.userInfo.isAdmin) {
					if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
						this.$refs.testPopup.opendialog()
						return
					}
				if (!this.info.isuserAdmin) {
					uni.showToast({
						title: '无权限修改',
						icon: "none",
						duration: 2000
					})
				} else {
					this.inputidentityName=this.info.identity
					this.$refs.popup.open('center')
				}

			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			dialogConfirm() {
				this.$apiCom.changeMember(this.info.id, {
					elderId: this.info.queryelderId
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg
						})
						this.dialogClose()
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})

			},
			async changeIdentity() {
				this.$refs.alertDialog.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		position: relative;
		height: 100vh;
        background-color: #f5f5f5;
		padding-top: 32rpx;
		box-sizing: border-box;
		.contentBox{
			background: #fff;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			margin: 0 32rpx 32rpx;
			padding-bottom: 20rpx;
		}
		.userList {
			padding: 48rpx 36rpx 28rpx;

			.userimg {
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
			}
		}

		.changeicon {
			width: 52rpx;
			height: 52rpx;
		}

		.footBox {
			position: absolute;
			left: 0rpx;
			bottom: 0rpx;
			right: 0;
            background-color: #fff;
			padding: 20rpx 28rpx;
			.btnBox {
				width: 271rpx;
				height: 84rpx;
				background: #EEEEEE;
				border-radius: 58rpx;
				padding: 20rpx 0;
				box-sizing: border-box;
				color: #F01818;
			}
			.changeBtn{
				margin-right: 20rpx;
				color: #0066FF;
			}
		}
	}

	/deep/ .uni-button-color {
		color: #EB5F58;
	}
	/deep/.uni-border-left .uni-button-color{
		color: #0256FF ;
	}
	.nicknameinput {
		text-align: left;
		color: #999;
		background: rgba(189, 189, 189, 0.13);
		border-radius: 48rpx;
		padding: 20rpx 30rpx;
		width: 100%;
	}
</style>
