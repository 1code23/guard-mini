<template>
    <view class="content">
        <view class="search-customBar" :style="[{ height: customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]">
          <view class="new-top disfr ac jsb">
				<view class="disfr ac leftBox">
					<view class="color0 textName">消息</view>
					<view class="disfr ac" v-show="!isRead" @click="readevent">
						<image src="https://apmarket.tt286.com/teeny/icon/clean2x.png" mode="" class="iconclean"></image>
						<text class="fz28 color6">一键已读</text>
					</view>
				</view>
				<view class="disfr ac" v-show="!isAttention" @click="Attention">
					<image src="https://apmarket.tt286.com/teeny/icon/gzf-1.gif" mode="" class="icongif"></image>
				</view>
            </view>
			<!-- <view class="new-top">
				<image class="currIcon iconMessage" src="https://apmarket.tt286.com/teeny/icon/memberText.png" mode="">
				<image class="currIcon iconclean" src="https://apmarket.tt286.com/teeny/icon/memberText.png" mode="">
				<image class="currIcon iconRead" src="https://apmarket.tt286.com/teeny/icon/memberText.png" mode="">
				<image class="currIcon icongif" src="https://apmarket.tt286.com/teeny/icon/memberText.png" mode="">
			</view> -->
        </view>
    </view>
</template>

<script>
    export default {
		props:{
			isRead: {
				type: Boolean,
				default: false
			},
			isAttention: {
				type: Boolean,
				default: false
			}
		},
        data() {
            return {
                customBar: '',
            }
        },
        created() {
            this.customBar = getApp().globalData.customBar;
        },
        methods: {
            readevent() {
                this.$emit("send", )
            },
			Attention(){
				this.$emit("eventisAttention", )
			}
        }

    }
</script>

<style>
    .content {
        position: relative;
    }

    .search-customBar {
        position: fixed;
        width: 100%;
        height: auto;
        left: 0;
        top: 0;
        /* background-color: #f7f7f7; */
		background: #FFF;
        overflow: hidden;
        z-index: 99;
    }

    .new-top {
        width: 74%;
        /* height: auto; */
        padding: 0 22rpx;
       /* box-sizing: border-box;
        overflow: hidden; */
    }

   .search-bak {
        position: absolute;
        left: 0;
        bottom: 6rpx;
        width: 19rpx;
        height: 41rpx;
        padding: 0 28rpx 18rpx 20rpx;
    }

   .new-search-box {
        position: absolute;
        left: 88rpx;
        bottom: 12rpx;
        width: 71%;
        height: 66rpx;
        line-height: 66rpx;
        background: #FFF;
        border-radius: 33rpx;
        overflow: hidden;
    }

    .new-search-box image {
        float: left;
        width: 32rpx;
        height: 32rpx;
        margin: 18rpx 20rpx 0 30rpx;
    }

    .new-search-box input {
        /* float: left; */
       font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999;
        margin-top: 12rpx;
    }
	.leftBox{
		width: 80%;
	}
	.icongif{
		width: 72rpx;
		height: 66rpx;
		margin-right: 42rpx;
	}
	.textName{
		font-size: 44rpx;
		margin-left: 23rpx;
	}
	.iconclean{
		width: 40rpx;
		height: 40rpx;
		margin-left: 32rpx;
	}
	.iconMessage{
		left: 0;
		width: 19rpx;
		height: 42rpx;
	}
	.iconRead{
		left: 0;
		width: 19rpx;
		height: 42rpx;
	}
	.currIcon{
		position: absolute;
		bottom: 6rpx;
		padding: 0 28rpx 18rpx 20rpx;
	}
</style>
