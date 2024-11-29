<template>
	<view class="fc ac jc">
		<image src="https://apmarket.tt286.com/teeny/icon/nodata2x-1.png" mode="" class="nodataimg"></image>
		<text class="fz30 colorc" style="margin-bottom: 112rpx;">{{textName}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			textName: {
				type: String,
				default: '暂无数据'
			}
		},
		data() {
			return {}
			}
		}
</script>

<style lang="scss" scoped>
	.nodataimg{
		width: 280rpx;
		height: 280rpx;
		margin-top: 26rpx;
	}
</style>