<template>
    <view class="content">
        <view class="search-customBar" :style="[{ height: customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]">
            <view class="new-top">
				<!-- <view class="disfr ac leftBox">
					<text class="color0 textName">消息</text>
					<view class="disfr ac" v-show="!isRead" @click="readevent">
						<image src="https://apmarket.tt286.com/teeny/icon/clean2x.png" mode="" class="iconclean"></image>
						<text class="fz28 color6">一键已读</text>
					</view>
				</view> -->
				<image class="search-bak" src="https://apmarket.tt286.com/teeny/icon/back2x.png" mode="" @click="bakpage"></image>
				<view class="new-search-box disfr ac je" style="width: 62%;">
				   <view class="disfr ac je" v-show="isRead" @click="readevent">
				   	<image src="https://apmarket.tt286.com/teeny/icon/clean2x.png" mode="" class="iconclean"></image>
				   	<text class="fz28 color6">一键已读</text>
				   </view>
				   <image v-show="!isAttention" src="https://apmarket.tt286.com/teeny/icon/gzf.gif" mode="" class="icongif"></image>
				</view>
				<!-- <view class="disfr ac" >
					<view class="disfr ac" v-show="!isRead" @click="readevent">
						<image src="https://apmarket.tt286.com/teeny/icon/clean2x.png" mode="" class="iconclean"></image>
						<text class="fz28 color6">一键已读</text>
					</view>
					<image v-show="!isAttention" src="https://apmarket.tt286.com/teeny/icon/gzf.gif" mode="" class="icongif"></image>
				</view> -->
            </view>
		
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

/*    .new-search-box image {
        float: left;
        width: 32rpx;
        height: 32rpx;
        margin: 18rpx 20rpx 0 30rpx;
    } */

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
		margin-left: 35%;
	}
	.textName{
		font-size: 44rpx;
	}
	.iconclean{
		width: 40rpx;
		height: 40rpx;
		margin-left: 32rpx;
	}
</style>
