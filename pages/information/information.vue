<template>
	<view class="curContent">
		<zxnav @send="messageRead" :isAttention='isAttention' :isRead="!(!tabList[0].isRead || !tabList[1].isRead)"
			@eventisAttention='eventisAttention'></zxnav>
		<view class="mainBox">
			<view class="borderbox">
				<view class="" id='scrollBox'></view>
				<view class="BoxList" v-show="activeKey==1">
					<scroll-view :show-scrollbar='false' scroll-y="true" class="scroll-Y" @scrolltolower="loadMoreTodo"
						:style="'height:calc(100vh - '+listTop+'px)'">
						<view class="awaitDoBox">
							<view class="" v-if="todoDataList.length>0">
								<view class="" v-for="(item,index) in todoDataList" :key="index">
									<view class="tc fz28 color9 timeTitle">{{item.time | dateWeek}}</view>
									<view v-for="(ite,ind) in item.List" :key="ind" @click="throttle(godetail,ite)">
										<view class="todoList disfr at">
											<view class="ImgBox">
												<image :src="ite.type | typeSrc(iconsrc)" mode="" class="imgIcon">
												</image>
											</view>
											<view class="dolistInfo fz28 ell">
												<view class="disfr jsb ac">
													<text class="fz32 color3">{{ite.title}}</text>
													<text class=" colorc">{{ite.time}}</text>
												</view>
												<view class="color9 ell mt8">
													{{ite.content}}
												</view>

												<view class="judgeBox "
													v-if="ite.type == 'bound' && ite.status =='none'">
													<view class="btnCommon refuse" @click="examineBtn(ite,'deny')">拒绝
													</view>
													<view class="btnCommon agree" @click="examineBtn(ite,'allow')">同意
													</view>
												</view>

												<view class="judgeBox"
													v-if="ite.type == 'bound' && ite.status =='allow' ">
													<view class="btnCommon agree2">已同意
													</view>
												</view>

												<view class="judgeBox"
													v-if="ite.type == 'bound' && (ite.status =='deny' || ite.status =='expired')">
													<view class="btnCommon refuse2">
														{{ ite.status =='deny'?'已拒绝':'已过期' }}
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="fc ac jc" v-if="todoDataList.length<=0&&isrequiret">
								<image src="https://apmarket.tt286.com/teeny/icon/nodata2x-1.png" mode=""
									class="nodataimg">
								</image>
								<text class="fz30 colorc">暂无数据</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="BoxList" v-show="activeKey==2">
					<scroll-view :show-scrollbar='false' scroll-y="true" class="scroll-Y" @scrolltolower="loadMore"
						:style="'height:calc(100vh - '+listTop+'px)'">
						<!-- 数据列表 -->
						<view class="" :key="index">
							<view class="awaitDoBox" v-show="activeKey==2">
								<view class="" v-if="remindDataList.length>0">
									<view class="" v-for="(item,index) in remindDataList" :key="index">
										<view class="tc fz28 color9 timeTitle">{{item.time | dateWeek}}</view>
										<view class="todoList disfr ac" v-for="(ite,ind) in item.List" :key="ind">
											<view class="ImgBox">
												<image :src="ite.type | typeSrc(iconsrc)" mode="" class="imgIcon">
												</image>
												<view class="flag" v-show='!ite.read'>
													<view class="inflag"></view>
												</view>
											</view>
											<view class="dolistInfo fz28 ell">
												<view class="disfr jsb ac">
													<view class="fz32 color3">{{ite.title}}</view>
													<view class=" colorc">{{ite.time}}</view>
												</view>
												<view class="color9 ell mt8">
													{{ite.content}}
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="fc ac jc" v-if="remindDataList.length<=0&&isRemindrequiret">
									<image src="https://apmarket.tt286.com/teeny/icon/nodata2x-1.png" mode=""
										class="nodataimg"></image>
									<text class="fz30 colorc">暂无数据</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<uni-popup ref="follow" type="primary" background-color="#fff">
					<Follow @followClose='followClose'></Follow>
				</uni-popup>
			</view>

		</view>
	</view>
</template>

<script>
	import zxnav from '@/components/zxnav/zxnav.vue'
	import Follow from '@/components/follow/follow.vue'
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			zxnav,
			Follow
		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				isAttention: true,
				isRead: true,
				customBar: '',
				activeKey: 1,
				listTop: null,
				messageCounter: {},
				tabList: [{
					label: '待办',
					id: 1,
					isRead: true, //true表示已读 false表示未读
				}, {
					label: '提醒',
					id: 2,
					isRead: true, //true表示已读 false表示未读
				}],
				// page: 1,
				iconsrc: [{
						type: 'bound',
						src: 'https://apmarket.tt286.com/teeny/icon/bind2x.png'
					}, //绑定
					{
						type: 'bound_success',
						src: 'https://apmarket.tt286.com/teeny/icon/bind2x.png'
					}, //绑定
					{
						type: 'install',
						src: 'https://apmarket.tt286.com/teeny/icon/load2x.png'
					}, //安装
					{
						type: 'recharge',
						src: 'https://apmarket.tt286.com/teeny/icon/phonebill2x.png'
					}, //充值
					{
						type: 'renewal',
						src: 'https://apmarket.tt286.com/teeny/icon/recharge2x.png'
					}, //续费
					{
						type: 'unbound',
						src: 'https://apmarket.tt286.com/teeny/icon/unbind2x.png'
					}, //解绑
					{
						type: 'unused',
						src: 'https://apmarket.tt286.com/teeny/icon/longtime2x.png'
					}, //未使用
					{
						type: 'temp_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/remind2x.png'
					}, //临时修改
					{
						type: 'app_delay',
						src: 'https://apmarket.tt286.com/teeny/icon/await2x.png'
					}, //应用延时
					{
						type: 'screen_delay',
						src: 'https://apmarket.tt286.com/teeny/icon/await2x.png'
					}, //设备延时
					{
						type: 'uninstall',
						src: 'https://apmarket.tt286.com/teeny/icon/uninstall2x.png'
					}, //卸载
					//新增分类
					{
						type: 'available_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/usetime2x.png'
					}, //可用时长修改
					{
						type: 'disable_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/forbidden2x.png'
					}, //禁用时长修改
					{
						type: 'once_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/rest2x.png'
					}, //休息时长修改
					{
						type: 'permission_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/authority2x.png'
					}, //权限修改
					{
						type: 'vision_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/vision2x.png'
					}, //视力保护修改
					{
						type: 'browse_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/browse2x.png'
					}, //浏览访问修改
					{
						type: 'communicate_modify',
						src: 'https://apmarket.tt286.com/teeny/icon/commun2x.png'
					}, //通信修改
					{
						type: 'low_power_notify',
						src: 'https://hsapmarket.zy845.com/guard/wx/ic_lowpower.png'
					}, //低电量
					{
						type: 'locked_unused_notify',
						src: 'https://apmarket.tt286.com/teeny/icon/lock2x.png'
					}, //锁屏未使用
					{
						type: 'premium_subscribe',
						src: 'https://apmarket.tt286.com/teeny/icon/premiumSubscribe2x.png'
					}, //会员订阅
					{
						type: 'premium_expire',
						src: 'https://apmarket.tt286.com/teeny/icon/premiumSubscribe2x.png'
					}, //会员过期
					{
						type: 'intercept_contacts',
						src: 'https://hsapmarket.zy845.com/guard/wx/ic_harass.png'
					}, //骚扰拦截提醒
					{
						type: 'access_fence',
						src: 'https://hsapmarket.zy845.com/guard/wx/ic_leave.png'
					}, //到达地点提醒
					{
						type: 'leave_fence',
						src: 'https://hsapmarket.zy845.com/guard/wx/ic_leave.png'
					}, //离开地点提醒
				],
				size: 10,
				todoDataList: [], // 代办数据列表
				remindDataList: [], // 提醒数据列表
				currentPage: 1, // 当前页码
				totalPages: 0, // 总页数
				isLoadMore: true, //是否有下一页

				currentPageTodo: 1, // 代办消息当前页码
				totalPagesTodo: 0, // 代办消息总页数
				isLoadMoreTodo: true, //代办消息是否有下一页
				onoff: true, //防止多次点击
				isrequiret: false,
				isRemindrequiret: false,
			}
		},
		onShow() {

			this.onoff = true //防止多次点击
			this.customBar = getApp().globalData.customBar;
			this.currentPage = 1
			this.remindDataList = []
			this.currentPageTodo = 1
			this.todoDataList = []
			this.freshList()
			this.$apiCom.userinfo({
				isLoad: true
			}).then((res) => {
				if (res.code == 0) {
					let user = this.userInfo
					this.isAttention = uni.getStorageSync('isLoginTest') ? true : res.data.isSubscribe
					user.isSubscribe = this.isAttention
					this.$store.commit("user/SET_USER_INFO",
						user)
				}
			})
			// this.getNumRead() //获取未读消息数量
		},
		onLoad(query) {
			// console.log(this.userInfo.isSubscribe,'是否关注公众号');
			if (JSON.stringify(query) === "{}") {
				this.activeKey = 1
			} else {
				this.activeKey = 2
			}
			if ((this.userInfo.id && !this.userInfo.isSubscribe && JSON.stringify(query) === "{}") && !uni.getStorageSync(
					'isLoginTest')) {
				this.$refs.follow.open('center')
			}
			this.getHeight()
		},
		onHide() {
			this.$refs.follow.close()
		},
		methods: {
			async getNumRead() {
				await this.$apiCom.messageCounter({
					isLoad: true
				}).then(res => {
					let badge = 0
					let remind = 0
					let todo = 0
					if (res.code == 0) {
						badge = res.data.remind + res.data.todo
						remind = res.data.remind
						todo = res.data.todo
					}
					this.messageCounter.remindNum = remind
					this.messageCounter.todoNum = todo
					if (todo > 0) {
						this.tabList[0].isRead = false
					} else {
						this.tabList[0].isRead = true
					}
					if (remind > 0) {
						this.tabList[1].isRead = false
					} else {
						this.tabList[1].isRead = true
					}
					if (badge <= 0) {
						uni.removeTabBarBadge({
							index: 1
						})
					} else {
						let num = badge > 99 ? '99+' : badge.toString()
						uni.setTabBarBadge({
							index: 1,
							text: num
						})
					}
				})
			},
			messageCounter1(val) {
				this.messageCounter = val
				if (val.todoNum > 0) {
					this.tabList[0].isRead = false
				} else {
					this.tabList[0].isRead = true
				}
				if (val.remindNum > 0) {
					this.tabList[1].isRead = false
				} else {
					this.tabList[1].isRead = true
				}
			},
			eventisAttention() {
				this.$refs.follow.open('center')
			},
			// 一键已读
			messageRead() {
				this.$apiCom.messageRead({}).then(res => {
					if (res.code == 0) {
						this.tabList[0].isRead = true
						this.tabList[1].isRead = true
						this.todoDataList.forEach(item => {
							item.List.forEach(itm => {
								itm.read = true
							})
						})
						this.remindDataList.forEach(item => {
							item.List.forEach(itm => {
								itm.read = true
							})
						})
						this.messageCounter.remindNum = 0
						this.messageCounter.todoNum = 0
						uni.removeTabBarBadge({
							index: 2
						})
					}
				})

			},
			async godetail(val) {
				let obj = {
					id: val.id,
					type: val.type
				}
				if (!val.read) {
					await this.getNumRead()
				}
				uni.navigateTo({
					url: `/page_detail/installapply/installapply?id=${val.id}&type=${val.type}`
				})
			},
			throttle(fn, params) {
				let that = this;
				if (that.onoff && fn) {
					that.onoff = false;
					if (params) {
						fn(params);
					} else {
						fn()
					}
					setTimeout(function() {
						that.onoff = true;
					}, 1500)
				} else {
					// console.log("请稍后点击")
				}
			},
			async examineBtn(val, status) {
				let obj = {
					status: status
				}
				let res = await this.$apiCom.examineTodolist(val.id, obj)
				if (res.code == 0) {
					this.currentPageTodo = 1
					this.freshList()
				}
			},

			tabClick(val) {
				this.activeKey = val
				if (val == 2 && !this.tabList[1].isRead) {
					let that = this
					setTimeout(() => {
						that.readRemindList()
					}, 1000)
				}
			},
			readRemindList() {
				this.remindDataList.forEach(item => {
					item.List.forEach(itm => {
						itm.read = true
					})
				})
				this.messageCounter.remindNum = 0
				this.$apiCom.messageRead({
					type: 'remind'
				}).then(res => {
					this.getNumRead()
				})
				this.tabList[1].isRead = true
			},
			getHeight() {
				let query = uni.createSelectorQuery().in(this);
				query.select('#scrollBox').boundingClientRect(data => {
					this.listTop = data.top
				}).exec();
			},
			remindArray(isLoading) {
				let obj = {
					page: this.currentPage,
					size: this.size,
					isLoad: isLoading ? true : false
				}
				this.$apiCom.remindList(obj).then(res => {
					if (res.code == 0) {
						if (res.data.hasNext) {
							this.currentPage = this.currentPage + 1
						}
						this.isLoadMore = res.data.hasNext
						let arr = res.data.list || []
						arr.map(mapItem => {
							let res = this.remindDataList.some(item => { //判断相同日期，有就添加到当前项
								if (item.time == (mapItem.time).split(' ')[0]) {
									item.List.push(mapItem)
									return true
								}
							})
							if (!res) { //如果没找相同日期添加一个新对象
								this.remindDataList.push({
									time: (mapItem.time).split(' ')[0],
									List: [mapItem]
								})
							}
						})
						let that = this
						if (this.activeKey == 2 && !this.tabList[1].isRead) {
							setTimeout(() => {
								that.readRemindList()
							}, 2000)
						}
						this.isRemindrequiret = true
					}
				})
			},
			todolist(isLoading) {
				let obj = {
					page: this.currentPageTodo,
					size: this.size,
					isLoad: isLoading ? true : false
				}
				this.$apiCom.remindList(obj).then(res => {
					if (res.code == 0) {
						if (this.currentPageTodo == 1) this.todoDataList = []
						if (res.data.hasNext) {
							this.currentPageTodo = this.currentPageTodo + 1
						}
						this.isLoadMoreTodo = res.data.hasNext

						let arr = res.data.list || []
						arr.map(mapItem => {
							let res = this.todoDataList.some(item => { //判断相同日期，有就添加到当前项
								if (item.time == (mapItem.time).split(' ')[0]) {
									item.List.push(mapItem)
									return true
								}
							})
							if (!res) { //如果没找相同日期添加一个新对象
								this.todoDataList.push({
									time: (mapItem.time).split(' ')[0],
									List: [mapItem]
								})
							}
						})
						this.isrequiret = true
					}
				})
			},
			freshList() {
				this.todolist(true)
			},
			// 上划加载更多
			async loadMore() {
				if (this.isLoadMore) {
					await this.remindArray()
				}
			},
			async loadMoreTodo() {
				if (this.isLoadMoreTodo) {
					await this.todolist()
				}
			},
			followClose() {
				this.$refs.follow.close()
			}
		},
	}
</script>

<style lang="scss" scoped src="./information.scss"></style>