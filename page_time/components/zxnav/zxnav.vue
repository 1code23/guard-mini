<template>
    <view class="content">
        <view class="search-customBar" :style="[{ height: customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]">
            <view class="new-top">
				<!-- <uni-icons type="left" size="30" @click="bakpage"></uni-icons> -->
                <image class="search-bak" src="https://apmarket.tt286.com/teeny/icon/back2x-1.png" mode="" @click="bakpage"></image>
                <view class="new-search-box" style="width: 58%;">
                    <image src="https://apmarket.tt286.com/teeny/icon/search2x.png" mode="" @click="search"></image>
                    <input type="text" :focus="showfocus" placeholder="请输入应用名称" v-model="searchName" @confirm="search" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                customBar: '',
                searchName: '',
                showfocus:false
            }
        },
        created() {
            this.customBar = getApp().globalData.customBar;
            this.showfocus = true;
        },
        methods: {
            bakpage() {
                uni.navigateBack({
                    delta: 1
                })
            },
            search() {
                this.$emit("send", this.searchName)
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
        /* width: 92%; */
        width: 100%;
        height: auto;
        left: 0;
        top: 0;
        background-color: #f7f7f7;
        overflow: hidden;
        z-index: 99;
    }

    .new-top {
        width: 74%;
        height: auto;
        padding: 0 22rpx;
        box-sizing: border-box;
        overflow: hidden;
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
        left: 68rpx;
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
</style>
