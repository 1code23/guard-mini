<template>
	<div class="harass wx_flex_container">
		<view>始终允许与运营商已知的紧急号码进行通信</view>
		<view class="white-box">
			<view class="flatBox">
				<view class="flatItem">
					<text class="flatTitle">陌生电话拦截</text>
					<text class="flatDesc">开启之后,白名单联系人将同步至老人手机且仅白名单联系人可联系老人</text>
				</view>
				<switch :checked="phoneIfIntercept" color="#0066FF" @change="switchChange"
					style="transform: scale(0.9)" />
			</view>
			<view class="flatBox" @click="navToRecordPage()">
				<view class="flatItem">
					<text class="flatTitle">拦截记录</text>
				</view>
				<image class="arrowImg" src="https://apmarket.tt286.com/teeny/icon/arrow2x.png"></image>
			</view>
		</view>

		<view class="white-box">
			<view class="flatBox">
				<view class="flatItem">
					<text class="flatTitle">白名单列表</text>
					<text class="flatDesc">若您和家人开通了亲情账号,为防止亲情账号被拦截,请在对应联系人下添加亲情号码,获奖者亲情号码新建为联系人</text>
				</view>
			</view>

			<view class="flatBox" v-for="item in contactList" :key="item.id" @click="navToContactPage(item)">
				<view class="flatItem">
					<text class="flatTitle">{{ item.name }}</text>
					<text class="flatDesc">{{ item.telList.join(",") }}</text>
				</view>
				<image class="arrowImg" src="https://apmarket.tt286.com/teeny/icon/arrow2x.png"></image>
			</view>
		</view>

		<view class="footer-box">
			<view class="btn-blue" @click="navToContactPage()">添加联系人</view>
		</view>
	</div>
</template>
<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				phoneIfIntercept: false,
				contactList: [],
			};
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		onShow(){
			this.getContactList();
		},
		methods: {
			getContactList() {
				let obj = {
					elderId: this.binduser.id || 0,
					page: 1,
					pageNum: 1000,
				};
				this.$apiCom.contactsUnionApi("GET", obj).then((res) => {
					if (res.code == 0) {
						this.contactList = res.data.contacts;
						this.phoneIfIntercept = res.data.telAllow == 2 ? true : false;
					}
				});
			},
			navToRecordPage(){
				uni.navigateTo({
					url: "/page_home/record/record",
				});
			},
			navToContactPage(item) {
				if (item) {
					uni.navigateTo({
						url: `/page_home/contact/contact?id=${item.id}&name=${item.name}&telList=${item.telList.join(",")}`,
					});
				} else {
					uni.navigateTo({
						url: "/page_home/contact/contact",
					});
				}

			},
			switchChange(e) {
				if (uni.getStorageSync("isLoginTest")) {
					return;
				}

				this.phoneIfIntercept = e.detail.value;
				let obj = {
					elderId: this.binduser.id || 0,
					telAllow : e.detail.value ? 2 : 1,
				};
				this.$apiCom.updateTelAllow(obj)
			},
		},
	};
</script>
<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped>
	.harass {}
</style>