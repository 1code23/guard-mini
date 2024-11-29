<template>
	<view class="mainBox">
		<view class="boxList">
			<load-refresh ref="loadRefresh1" :isRefresh="true" refreshType="hollowDots" color="#04C4C4" heightReduce="0"
				backgroundCover="#F5F5F5" :currentPage="currentPage" :totalPages="totalPages" :isLoadMore='isLoadMore'
				@loadMore="loadMore" @refresh="refresh">
				<view class="applyinfo" slot="content-list" v-for="(applyItem,applyindex) in boundArr"
					:key="applyindex">
					<view class="">
						<view class="fz32 color3 disfr ac mb32">
							<view class="lineBox"></view>
							<text>{{applyItem.title}}</text>
						</view>
						<view class="disfr jsb ac mb36">
							<text class='fz28 color9'>申请人：</text>
							<view class="disfr ac">
								<image :src="applyItem.child.avatarUrl" mode="" class="userimg"></image>
								<text class="fz28 color3">{{applyItem.child.name}}</text>
							</view>
						</view>
						<view class="disfr jsb ac mb36">
							<text class='fz28 color9'>申请宝贝：</text>
							<text class="fz28 color0">{{applyItem.content}}</text>
						</view>
						<view class="disfr jsb ac mb36">
							<text class='fz28 color9'>申请时间：</text>
							<text class="fz28 color3">{{applyItem.time}}</text>
						</view>
					</view>
					<image src="https://apmarket.tt286.com/teeny/icon/pass2x.png" mode="" class="stateIcon" v-if="applyItem.status=='allow'">
					</image>
					<image src="https://apmarket.tt286.com/teeny/icon/refuse2x.png" mode="" class="stateIcon"
						v-if="applyItem.status=='deny'">
					</image>
					<image src="https://apmarket.tt286.com/teeny/icon/expired2x.png" mode="" class="stateIcon"
						v-if="applyItem.status=='expired'">
					</image>
					<view class="" v-if="applyItem.status=='none'">
						<view class="linehr"></view>
						<!-- 绑定申请 -->
						<view class="descBox" v-if="applyItem.type=='bound'">
							<view class="fz32 color3 titlename">为申请人设置身份</view>
							<view class="identityBox mb20">
								<radio-group @change="radioChange">
									<label class="uni-list-cell uni-list-cell-pd" v-for="(itm, ind) in identityList"
										:key="itm.id">
										<view class="disfr jsb ac mb20">
											<view class="disfr ac">
												<image :src="itm.src" mode="" class="userpng"></image>
												<text class="fz28 color3" v-if="itm.id!=7">{{itm.identityName}}</text>
												<view class="" v-if="itm.id==7">
													<input class="uni-input inputClass" :value='itm.identityName'
														type="text" focus placeholder="请输入身份" />
												</view>
											</view>
											<view>
												<radio :value="itm.id" :checked="ind === current" style="transform:scale(0.7)"/>
											</view>
										</view>
									</label>
								</radio-group>
							</view>
							<view class="linehr mb20"></view>
							<view class="dja">
								<view class="refuse dja" @click="examineBtn(applyItem,'deny')">拒绝</view>
								<view class="agree dja" @click="examineBtn(applyItem,'allow')">同意</view>
							</view>
						</view>


					</view>
				</view>
			</load-refresh>
		</view>
	</view>
</template>

<script>
	import loadRefresh from '../components/load-refresh/load-refresh.vue'
	// import loadRefresh from '../components/load-refresh/load-refresh.vue'
	export default {
		components: {
			loadRefresh
		},
		onLoad() {
			this.init()
		},
		data() {
			return {
				boundArr: [],
				identityList: [{
					id: 1,
					identityName: '妈妈',
					src: 'https://apmarket.tt286.com/teeny/icon/mom2x.png'
				}, {
					id: 2,
					identityName: '爸爸',
					src: 'https://apmarket.tt286.com/teeny/icon/dad2x.png'
				}, {
					id: 3,
					identityName: '爷爷',		
					src: 'https://apmarket.tt286.com/teeny/icon/yeye2x.png'
				}, {
					id: 4,
					identityName: '奶奶',
					src: 'https://apmarket.tt286.com/teeny/icon/nainai2x.png'
				}, {
					id: 5,
					identityName: '外公',
					src: 'https://apmarket.tt286.com/teeny/icon/waigong2x.png'
				}, {
					id: 6,
					identityName: '外婆',
					src: 'https://apmarket.tt286.com/teeny/icon/waipo2x.png'
				}, {
					id: 7,
					identityName: '',
					src: 'https://apmarket.tt286.com/teeny/icon/unknown2x.png',
					checked: 'true'
				}, ],
				current: 6
			};
		},
		methods: {
			async init() {
				this.boundArr.push({
					id: 1,
					name: 2,
					status: 'none',
					title: '绑定申请',
					applicant: '申请人',
					content: '虎牙',
					time: '2022-10-11',

					child: {
						name: "小宝贝",
						avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Lxm68IBuibT76ASWCibV6icntUiaDDWGOaNA0XaXayLxdtzPj7dUmBfEyZoAzfecia3YIaNnBTXZhnFEKMTdKjSjiaAQ/132"
					},
					type: 'bound' //screen_delay
				}, {
					id: 2,
					name: 2,
					status: 'allow',
					title: '绑定申请',
					applicant: '申请人',
					content: '虎牙',
					time: '2022-10-11',


					child: {
						name: "小宝贝",
						avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Lxm68IBuibT76ASWCibV6icntUiaDDWGOaNA0XaXayLxdtzPj7dUmBfEyZoAzfecia3YIaNnBTXZhnFEKMTdKjSjiaAQ/132"
					},
					type: 'bound'
				}, {
					id: 3,
					name: 2,
					status: 'deny',
					title: '绑定申请',
					applicant: '申请人',
					content: '虎牙',
					time: '2022-10-11',

					child: {
						name: "小宝贝",
						avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Lxm68IBuibT76ASWCibV6icntUiaDDWGOaNA0XaXayLxdtzPj7dUmBfEyZoAzfecia3YIaNnBTXZhnFEKMTdKjSjiaAQ/132"
					},
					type: 'bound', //install
				})
				let obj = {
					type: 'screen_delay',
					page: this.currentPage,
					size: this.size
				}
				// let res=await this.$apiCom.todolist(obj)
				// if(res.code==0){
				// this.isLoadMore=res.data.hasNext 
				// this.boundArr=res.data.list
				// }
				//  console.log(res)
			},
			loadMore() {
				this.$refs.loadRefresh1.completed()
			},
			refresh() {
				setTimeout(() => {
					this.$refs.loadRefresh1.completed()
				}, 800)
			},
			runRefresh() {
				this.$refs.loadRefresh1.runRefresh()
			},
			async examineBtn(val, status) {
				let obj = {
					status: status
				}
				if (val.type == 'app_delay' || val.type == 'screen_delay') {
					if ('editdelayMinute' in val) {
						obj.delayMinute = val.editdelayMinute
					} else {
						obj.delayMinute = val.delayMinute
					}
				}
				let res = await this.$apiCom.examineTodolist(val.id, obj)
				if (res.code == 0) {
					this.currentPage = 1
					this.init()
				}
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.identityList.length; i++) {
					if (this.identityList[i].id === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}
</style>
<style lang="scss" scoped>
	.mainBox {
		padding: 32rpx 40rpx;
		background: #F5F5F5;

		.boxList {
			width: 670rpx;

			.applyinfo {
				background-color: #fff;
				border-radius: 32rpx;
				padding: 42rpx 32rpx;
				position: relative;
				margin-bottom: 24rpx;

				.lineBox {
					border-radius: 4rpx;
					background: #1BD17B;
					width: 8rpx;
					height: 32rpx;
					margin-right: 16rpx;
				}

				.userimg {
					width: 48rpx;
					height: 48rpx;
					margin-right: 10rpx;
					border-radius: 50%;
				}

				.stateIcon {
					width: 132rpx;
					height: 132rpx;
					position: absolute;
					top: 8rpx;
					right: 24rpx;
				}

				.linehr {
					width: 606rpx;
					height: 2rpx;
					background: rgba(189, 189, 189, 0.13);
					margin-bottom: 30rpx;
				}

				.descBox {
					.titlename {
						margin: 30rpx 0;
					}

					.identityBox {
						margin-bottom: 20rpx;

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
			}

		}

		.mb32 {
			margin-bottom: 32rpx;
		}

		.mb20 {
			margin-bottom: 20px;
		}

		.mb36 {
			margin-bottom: 36rpx;
		}


		.refuse {
			width: 281rpx;
			height: 79rpx;
			background: #EB5F58;
			border-radius: 43rpx;
			font-size: 29rpx;
			color: #fff;
		}

		.agree {
			width: 282rpx;
			height: 79rpx;
			background: #1BD17B;
			border-radius: 43rpx;
			font-size: 29rpx;
			color: #fff;
			margin-left: 36rpx;
		}
	}
</style>
