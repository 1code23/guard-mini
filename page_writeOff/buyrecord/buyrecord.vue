<template>
	<view class="mainBox borderbox">
		<scroll-view :show-scrollbar='false' scroll-y="true" class="scroll-Y" @scrolltolower="loadMoreTodo">
		<view class="buyrecord bgcF borderbox" v-for="(item,index) in recordArray" :key="index">
			<view class="color3 fz32 djb ac memberText"><text>{{item.name}}</text> <text class="color17B fz32">￥{{item.amount/100}}</text> </view>
			<view class="color9 fz28 djb ac recordText"><text>支付方式：</text> <text class="color3 fz27">微信支付</text> </view>
			<view class="color9 fz28 djb ac recordText"><text>支付时间：</text> <text class="color3 fz27">{{item.payTime}}</text> </view>
			<view class="color9 fz28 djb ac"><text>订单编号：</text> <text class="color3 fz27">{{item.id}}</text> </view>
		</view>
		<view class="fc ac jc" v-if="recordArray.length<=0">
			<image src="https://apmarket.tt286.com/teeny/icon/nodata2x-1.png" mode=""
				class="nodataimg"></image>
			<text class="fz30 colorc">暂无订单</text>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childInfo:{},
				page:1,
				isLoadMoreTodo: false, 
				recordArray:[],
			};
		},
		onLoad(query) {
			this.childInfo = JSON.parse(decodeURIComponent(query.childInfo))
			this.getList()
		},
		methods:{
			async loadMoreTodo() {
				if (this.isLoadMoreTodo) {
					this.page=this.page+1
					await this.getList()
				}
			},
			getList(){
				this.$apiCom.premiumRecord({
					childId: this.childInfo.id,
					page:this.page,
					size:10
				}).then(res => {
					this.isLoadMoreTodo=res.data.hasNext
					if(res.code==0){
						let dataArr=res.data.list
						this.recordArray = this.recordArray.concat(dataArr)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.mainBox{
	background: #F5F5F5;
	// height: 100vh;
	padding:0 0 40rpx;
	.buyrecord{
		padding: 40rpx 32rpx 48rpx;
		margin-bottom: 32rpx;
		width: 670rpx;
		border-radius: 32rpx;
		.memberText{
			margin-bottom: 40rpx;
		}
		.recordText{
			margin-bottom: 36rpx;
		}
	}
	::-webkit-scrollbar {
		display: none;
	}
	.scroll-Y {
		height: 100vh;
		// padding-bottom: 20rpx;
		padding: 40rpx 40rpx 0;
		box-sizing: border-box;
	}
	.nodataimg {
		width: 304rpx;
		height: 304rpx;
		margin-top: 35%;
	}
}
</style>
