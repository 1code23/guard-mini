<template>
  <view class="mainBox fc">
    <view class="contentBox fc">
      <view class="questionBox">
        <view class="fw700 color0 fz32 questionName">{{ detail.title }}</view>
        <view class="fz28 color6 questionItem">
          <rich-text :nodes="detail.content"> </rich-text>
        </view>
      </view>
      <view class="btnBox dja fw600" v-if="false">
        <view class="solveBoxBtn dja" @click="solveBtn('solved')">
          <image
            mode=""
            src="https://apmarket.tt286.com/teeny/icon/issolve2x.png"
            class="btnIcon"
			v-show="!isSolve"
          ></image>
          <image
            src="https://apmarket.tt286.com/teeny/icon/solve2x.png"
            mode=""
            class="btnIcon"
			v-show="isSolve"
          ></image>
          <text :class="isSolve?'color17B':''">已解决</text>
        </view>
        <view class="solveBoxBtn dja" @click="solveBtn('unsolved')">
          <image
            mode=""
            src="https://apmarket.tt286.com/teeny/icon/noissolve2x.png"
            class="btnIcon"
			v-show="!noIsSolve"
          ></image>
          <image
            src="https://apmarket.tt286.com/teeny/icon/nosolve2x.png"
            mode=""
            class="btnIcon"
			v-show="noIsSolve"
          ></image>
          <text :class="noIsSolve?'color17B':''">未解决</text>
        </view>
      </view>
    </view>
    <view class="footBox dja fz28 color">
      <view @click="gofeedBack"
        ><text>未解决？点击</text><text class="color17B fw600">提交反馈</text></view
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      isSolve: false, //已解决未点击状态
      noIsSolve: false, //未解决未点击状态
    };
  },
  onLoad(query) {
    this.getQuestionDetail(query.id);
  },
  onShow() {
    this.isSolve = false;
    this.noIsSolve = false;
  },
  methods: {
    gofeedBack() {
      uni.navigateTo({
        url: "/page_writeOff/feedback/feedback",
      });
    },
    async solveBtn(val) {
		if((this.noIsSolve&&val=='solved')||(this.isSolve&&val=='unsolved')||(this.isSolve&&val=='solved')||(this.noIsSolve&&val=='unsolved')){
			uni.showToast({
				title:'您已反馈',
				icon:"none"
			})
			return
		}
      const res = await this.$apiCom.evaluateQuestion(this.detail.id, val);
      if (res && res.code == 0) {
		  if(val=='unsolved'){
			  this.noIsSolve=true//未解决点击状态
		  }else{
			  this.isSolve=true //已解决点击状态
		  }
        uni.showToast({
          title: "操作成功",
        });
      }
    },
    async getQuestionDetail(id) {
      const res = await this.$apiCom.getQuestionDetail(id);
      if (res && res.code == 0) {
        this.detail = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mainBox {
  padding: 32rpx 40rpx;
  height: 100vh;
  box-sizing: border-box;
  background: #F5F5F5;
  .contentBox {
    border-radius: 32rpx;
    overflow: auto;
	background: #FFFFFF;
    .questionBox {
      margin: 36rpx 32rpx;
      flex: 1;
      overflow: auto;

      .questionName {
        margin-bottom: 24rpx;
		color: #000;
      }
      .questionItem {
        margin-bottom: 35rpx;
        line-height: 50rpx;
      }
    }
    .btnBox {
      height: 116rpx;
      border-top: 2rpx solid rgba(189, 189, 189, 0.13);
      .solveBoxBtn {
        width: 50%;
        .btnIcon {
          width: 50rpx;
          height: 50rpx;
          margin-right: 16rpx;
        }
      }
    }
  }
  .footBox {
    height: 112rpx;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
