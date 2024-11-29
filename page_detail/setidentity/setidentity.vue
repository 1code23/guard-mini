<template>
	<view class="mainBox">
		<view class="userList">
			<view class="identityBox mb20">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(itm, ind) in identityList" :key="itm.id">
						<view class="disfr jsb ac mb20">
							<view class="disfr ac">
								<image :src="itm.src" mode="" class="userpng"></image>
								<text class="fz28 color3" v-if="itm.id!=7">{{itm.identityName}}</text>
								<view class="" v-if="itm.id==7">
									<input class="uni-input inputClass" :value='inputidentityName' type="text" focus
										placeholder="请输入身份名称" @input='inputs' />
								</view>
							</view>
							<view>
								<radio :value="itm.id" :checked="ind === current" style="transform:scale(0.7)" />
							</view>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="btnBox dja">
			<view class="submitBox dja fz32 cof" @click="submit">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";

	export default {
		computed: {
					...mapGetters([ "userInfo"]), //获取vuex中存的数据
				},
		data() {
			return {
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
				inputidentityName: '',
				identity: '',
				id: null,
				userinfodata: {},
				report:false
			};
		},
		onLoad(query) {
			this.userinfodata = JSON.parse(decodeURIComponent(query.userinfo))
			this.identity = this.userinfodata.identity
			this.id = this.userinfodata.id
			this.init()
		},
		methods: {
			init() {
				let obj = this.identityList.find(item => {
					return item.identityName === this.identity
				})
				if (obj) {
					this.current = obj.id - 1
				} else {
					this.current = 6
					this.inputidentityName = this.identity
				}
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.identityList.length; i++) {
					if (this.identityList[i].id == evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			inputs(e) {
				this.inputidentityName = e.detail.value
			},
			submit() {
				if(this.report){
					uni.showToast({
						title:'不可重复点击',
						icon:'none'
					})
					return
				}
				this.report=true
				let identityName
				if(this.current==6){
					if(this.inputidentityName){
						identityName=this.inputidentityName
						let reg=/^\S+$/;
						if(!reg.test(identityName)){
							uni.showToast({
								title: '身份不可为空或空格',
								icon: 'none',
							})
							this.report=false
							return
						}
						if(this.inputidentityName.length>10){
							uni.showToast({
								title:'不可超过10个字符,重新输入',
								icon:'none'
							})
							this.report=false
						return	
						};
					}else{
						uni.showToast({
							title:'身份不可为空或空格',
							icon:'none'
						})
						this.report=false
						return
					}
				}else{
					identityName=this.identityList[this.current].identityName
				}
				this.startBound({
					code: this.userinfodata.deviceCode,
					identity:identityName,
					child: this.userinfodata
				})
				// let res = await this.$apiCom.editMember(this.id, {
				// 	childId:this.userinfodata.querychildId,
				// 	identity: identityName
				// })
				// if (res.code == 0) {
				// 	this.userinfodata.identity =identityName
				// 	uni.$emit('updateData', this.userinfodata)
				// 	uni.navigateBack({
				// 		delta: 1 //返回层数，2则上上页
				// 	})
				// } else {
				// 	uni.showToast({
				// 		title: res.msg,
				// 		icon: "none"
				// 	})
				// }
			},
			startBound(obj) {
				// console.log(obj);
				// return
				this.$apiCom.deviceBound(obj).then(res => {
					getApp().globalData.elderId= res.data.id
					if (res.code == 0) { //第一次绑定成功
						uni.showToast({
							title: '操作成功',
							duration: 2000
						})
						setTimeout(function() {
							getApp().globalData.isFirstBind= 1
							// getApp().globalData.isBinderr= false
							// uni.switchTab({
							// 	url: '/pages/home/home'
							// });
							this.report=false
							uni.reLaunch({
								url: '/pages/home/home'
							});
						}, 2000);
			
					} else {
						this.report=false
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
						if(res.code==3012){ //绑定申请待审批
							setTimeout(function() {
					getApp().globalData.isFirstBind= 2
					// getApp().globalData.isBinderr= true
								// uni.switchTab({
								// 	url: '/pages/home/home'
								// });
								this.report=false
								uni.reLaunch({
									url: '/pages/home/home'
								});
							}, 2000);
						}
					}
				})
				// getApp().globalData.isFirstBind= 1
				// uni.switchTab({
				// 	url: '/pages/home/home'
				// });
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		padding: 32rpx 40rpx;
		background: #F7F7F7;
		display: flex;
		flex-direction: column;
		height: 100vh;
		box-sizing: border-box;

		.userList {
			flex-grow: 1;
			overflow: overlay;

			.identityBox {
				margin-bottom: 20rpx;
				background-color: #fff;
				padding: 20rpx;
				border-radius: 32rpx;

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
		}

		.btnBox {
			height: 88rpx;
			margin-bottom: 50rpx;

			.submitBox {
				width: 562rpx;
				height: 88rpx;
				background: #1BD17B;
				border-radius: 48rpx;
			}
		}


	}
</style>
