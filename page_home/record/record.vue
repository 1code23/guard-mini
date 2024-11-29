<template>
	<view class="curContent">
		<view class="mainBox">
			<view class="borderbox">
				<view class="tabBox disfr ac jsb fz32">
					<view class="tabName dja" :class="{ activeTab: activeKey == item.id }"
						v-for="(item, index) in tabList" @click="tabClick(item.id)" :key="item.id">
						<view class="labelBox">{{ item.label }}</view>
					</view>
				</view>
				<view class="" id="scrollBox"></view>
				<view class="BoxList" v-show="activeKey == 1">
					<scroll-view :show-scrollbar="false" scroll-y="true" class="scroll-Y" @scrolltolower="loadMoreTodo"
						:style="'height:calc(100vh - ' + listTop + 'px)'">
						<view class="awaitDoBox">
							<view class="" v-if="todoDataList.length > 0">
								<view class="todoList disfr ac" v-for="(item, index) in todoDataList" :key="index"
									@click="throttle(godetail, item)">
									<view class="dolistInfo fz28 ell">
										<view class="disfr jsb ac">
											<text class="fz32 color3">{{ item.phone }}</text>
											<text class="colorc">{{ timeStampTrans( item.timestamp) }}</text>
										</view>
										<view class="color9 ell mt8">
											{{ item.location }}
										</view>
									</view>
								</view>
							</view>
							<view class="fc ac jc" v-if="todoDataList.length <= 0 && isrequiret">
								<image src="https://apmarket.tt286.com/teeny/icon/nodata2x-1.png" mode=""
									class="nodataimg">
								</image>
								<text class="fz30 colorc">暂无数据</text>
							</view>
						</view>
					</scroll-view>
					<view class="footer-box" v-if="todoDataList.length > 0">
						<view class="btn-blue" @click="delAll">全部删除</view>
					</view>
				</view>
				<view class="BoxList" v-show="activeKey == 2">
					<scroll-view :show-scrollbar="false" scroll-y="true" class="scroll-Y" @scrolltolower="loadMore"
						:style="'height:calc(100vh - ' + listTop + 'px)'">
						<!-- 数据列表 -->
						<view class="" :key="index">
							<view class="awaitDoBox" v-show="activeKey == 2">
								<view class="" v-if="remindDataList.length > 0">
									<view class="todoList disfr ac" v-for="(item, index) in remindDataList" :key="index"
										@click="throttle(godetail, item)">
										<view class="dolistInfo fz28 ell">
											<view class="disfr jsb ac">
												<text class="fz32 color3">{{ item.phone }}</text>
												<text class="colorc">{{ timeStampTrans( item.timestamp) }}</text>
											</view>
											<view class="color9 ell mt8">
												{{ item.msg }}
											</view>
										</view>
									</view>
								</view>
								<view class="fc ac jc" v-if="remindDataList.length <= 0 && isRemindrequiret">
									<image src="https://apmarket.tt286.com/teeny/icon/nodata2x-1.png" mode=""
										class="nodataimg"></image>
									<text class="fz30 colorc">暂无数据</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="footer-box" v-if="remindDataList.length > 0">
						<view class="btn-blue" @click="delAll">全部删除</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<view class="btn-common popup-title">{{ detailData.phone }}</view>
				<view class="msgBox" v-if="detailData.msg">
					{{ detailData.msg }}
				</view>
				<view class="btn-common btnInsert" @click="addSelect">加入白名单</view>
				<view class="btn-common  btnDelete" @click="delSelect">删除</view>
				<view class="btn-common  btnCancel" @click="$refs.popup.close()">取消</view>
			</view>
		</uni-popup>

		<uni-popup ref="delConfirmPopup" @change="change">
			<view class="popup-content">
				<view class="btn-common popup-title">{{ showTitle }}</view>
				<view class="btnPart">
					<view class="btn-common  btnCancel" @click="$refs.delConfirmPopup.close()">取消</view>
					<view class="btn-common  btnConfirm" @click="sureDel">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		data() {
			return {
				isAttention: true,
				isRead: true,
				customBar: "",
				activeKey: 1,
				listTop: null,
				messageCounter: {},
				tabList: [{
						label: "来电",
						id: 1,
						isRead: true, //true表示已读 false表示未读
					},
					{
						label: "短信",
						id: 2,
						isRead: true, //true表示已读 false表示未读
					},
				],
				// page: 1,
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

				detailData: {}, // 详情数据
				showTitle: ""
			};
		},
		onShow() {
			this.onoff = true; //防止多次点击
			this.customBar = getApp().globalData.customBar;
			this.currentPage = 1;
			this.remindDataList = [];
			this.currentPageTodo = 1;
			this.todoDataList = [];
			this.freshList();
		},
		onLoad(query) {
			this.getHeight();
		},
		methods: {
			addSelect() {
				if (uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "请绑定老人设备后再进行操作",
						icon: "none",
					});
					return;
				}
				// 加入白名单
				let obj = {
					name: '从拦截中添加'
				};
				obj.elderId = this.binduser.id || 0;
				obj.telList = [this.detailData.phone];

				this.$apiCom
					.contactsUnionApi("POST", obj)
					.then((res) => {
						if (res.code != 0) {
							uni.showToast({
								title: res.msg,
								icon: "none",
							});
						} else {
							uni.showToast({
								title: "添加成功",
								icon: "none",
							});
							this.$refs.popup.close();
						}
					})
					.catch((err) => {
						uni.showToast({
							title: "暂无网络连接",
							icon: "none",
						});
					});
			},
			delSelect() {
				if (this.detailData.msg)
					this.showTitle = "确认删除所选拦截短信吗？";
				else
					this.showTitle = "确认删除所选拦截来电吗？";

				this.$refs.popup.close();
				this.$refs.delConfirmPopup.open()
			},
			delAll() {
				if (this.activeKey == 1) {
					this.showTitle = "确认删除全部拦截来电吗？";
				} else {
					this.showTitle = "确认删除全部拦截短信吗？";
				}
				this.detailData = {};
				this.$refs.delConfirmPopup.open()
			},

			sureDel() {
				if (uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "请绑定老人设备后再进行操作",
						icon: "none",
					});
					return;
				}
				// 删除
				let name = ""
				const obj = {};
				obj.elderId = this.binduser.id || 0;

				if (this.detailData.id) {
					obj.id = this.detailData.id;
					name = this.detailData.msg ? 'msg' : "tel";
				} else {
					name = this.activeKey == 1 ? 'allTel' : "allMsg";
				}

				this.$apiCom
					.interceptDelete(name, obj)
					.then((res) => {
						if (res.code != 0) {
							uni.showToast({
								title: res.msg,
								icon: "none",
							});
						} else {
							uni.showToast({
								title: "删除成功",
								icon: "none",
							});
							if (this.detailData.id) {
								if (this.detailData.msg) {
									this.remindDataList.splice(this.remindDataList.findIndex(item => item.id == this
										.detailData.id), 1);
								} else {
									this.todoDataList.splice(this.todoDataList.findIndex(item => item.id == this
										.detailData.id), 1);
								}
							} else {
								if (this.activeKey == 1)
									this.todoDataList = [];
								else
									this.remindDataList = [];
							}

							// this.freshList();
							this.$refs.delConfirmPopup.close();
							this.detailData = {};
						}
					})
					.catch((err) => {
						uni.showToast({
							title: "暂无网络连接",
							icon: "none",
						});
					});
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			async godetail(val) {
				this.detailData = val;

				this.$refs.popup.open()
			},
			timeStampTrans(val) {
				let date = new Date(val);
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
				let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return M + '月' + D + '号';
			},
			throttle(fn, params) {
				let that = this;
				if (that.onoff && fn) {
					that.onoff = false;
					if (params) {
						fn(params);
					} else {
						fn();
					}
					setTimeout(function() {
						that.onoff = true;
					}, 1500);
				} else {
					// console.log("请稍后点击")
				}
			},
			tabClick(val) {
				this.activeKey = val;
			},
			getHeight() {
				let query = uni.createSelectorQuery().in(this);
				query
					.select("#scrollBox")
					.boundingClientRect((data) => {
						this.listTop = data.top;
					})
					.exec();
			},
			remindArray(isLoading) {
				let obj = {
					page: this.currentPage,
					pageNum: this.size,
					isLoad: isLoading ? true : false,
					elderId: this.binduser.id,
				};
				this.$apiCom.interceptMsgList(obj).then((res) => {
					if (res.code == 0) {
						const hasNext = obj.page * obj.pageNum < res.data.total;
						if (hasNext) {
							this.currentPage = this.currentPage + 1;
						}
						this.isLoadMore = hasNext;
						let arr = res.data.list || [];
						this.remindDataList = this.remindDataList.concat(arr);
						this.isRemindrequiret = true;
					}
				});
			},
			todolist(isLoading) {
				let obj = {
					page: this.currentPageTodo,
					pageNum: this.size,
					isLoad: isLoading ? true : false,
					elderId: this.binduser.id,
				};
				this.$apiCom.interceptTelList(obj).then((res) => {
					if (res.code == 0) {
						const hasNext = obj.page * obj.pageNum < res.data.total;
						if (hasNext) {
							this.currentPageTodo = this.currentPageTodo + 1;
						}
						this.isLoadMoreTodo = hasNext;

						let arr = res.data.list || [];
						this.todoDataList = this.todoDataList.concat(arr);
						this.isrequiret = true;
					}
				});
			},
			freshList() {
				this.todolist(true);
				this.remindArray(true);
			},
			// 上划加载更多
			async loadMore() {
				if (this.isLoadMore) {
					await this.remindArray();
				}
			},
			async loadMoreTodo() {
				if (this.isLoadMoreTodo) {
					await this.todolist();
				}
			},
		},
	};
</script>

<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped src="./record.scss"></style>