<template>
	<view class="mainBox">
		<view class="topBox" v-if="userinfoList.length>0">
			<view class="userList disfr jsb ac" @click="godetail(item)" v-for="(item,index) in userinfoList" :key="item.id">
				<view class="userinfoList disfr ac ">
					<image :src="item.avatarUrl" mode="" class="userimg"></image>
					<view class="">
						<view class="fz32 fw550 color0 identityStr">{{item.identity}} <text v-if="item.isAdmin">（管理员）</text> </view>
						<text class="fz26 phoneStr">{{item.phoneNo}}</text>
					</view>
				</view>
				<view class="disfr ac">
					<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"
						></image>
				</view>
			</view>
		</view>
		<view class="emptyBox" v-if="userinfoList.length<=0">
			<noData></noData>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="转让管理员" content=''
				@confirm="dialogConfirm" @close="dialogClose">
				<view class="fz32">
					转让管理员身份之后,将无法管理其他子女账号,确认要转让管理员身份给[{{identity}}]吗？
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import noData from '../components/nodata/nodata.vue'
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			noData,
		},
		computed: {
			// ...mapGetters(["userInfo","binduser"]), //获取vuex中存的数据
			...mapGetters(["userInfo"]), //获取vuex中存的数据
		},
		data() {
			return {
				id: null,
				identity: null,
				userinfoList: [],
				isuserAdmin:false,
				elderId:null//传过来的参数孩子的id
			};
		},
		onShow() {
			this.init()
		},
		onLoad(query) {
			this.elderId=Number(query.elderId)
		},
		methods: {
			init() {
				this.$apiCom.getMember({elderId:this.elderId}).then(res => {
					if (res.code == 0) {
						this.userinfoList = res.data
						this.userinfoList.forEach(item=>{
							if(item.id==this.userInfo.id){
								this.isuserAdmin=item.isAdmin
							}
						})
					}
				})
			},
			godetail(val) {
				val.isuserAdmin=this.isuserAdmin
				val.queryelderId=this.elderId
				val.elderNum=this.userinfoList.length
				let info = encodeURIComponent(JSON.stringify(val))
				
				uni.navigateTo({
					url: '/page_writeOff/familyinfo/familyinfo?info=' + info
				})
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			dialogConfirm() {
				let res = this.$apiCom.changeMember(this.id,{elderId:this.elderId})
				if (res.code == 0) {
					uni.showToast({
						title: res.msg
					})
					this.init()
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			},
			async changeIdentity(val) {
				this.$refs.alertDialog.open()
				this.id = val.id
				this.identity = val.identity
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		background: #F5f5f5;
		display: flex;
		flex-direction: column;
		height: 100vh;
		box-sizing: border-box;

		.topBox {
			// flex-grow: 1;
			// overflow: overlay;
			margin: 32rpx;
			background-color: #fff;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
		}

		.emptyBox {
			margin-top: 270rpx;
		}

		.userList {
			padding: 48rpx 36rpx 28rpx;
			.phoneStr{
				color: rgba(0,0,0,0.4);
			}
			.identityStr{
				margin-bottom: 8rpx;
			}
			.arrowBtn{
				width: 55rpx;
				height: 55rpx;
			}
			.userimg {
				width: 76rpx;
				height: 76rpx;
				border-radius: 50%;
				margin-right: 24rpx;
			}

			.changeIdentityBtn {
				margin-right: 16rpx;
			}
		}

		.btnBox {
			height: 88rpx;
			margin-bottom: 82rpx;

			.submitBox {
				width: 562rpx;
				height: 88rpx;
				background: #1BD17B;
				border-radius: 48rpx;
			}
		}
	}

	/deep/ .uni-button-color {
		color: #EB5F58;
	}
</style>
