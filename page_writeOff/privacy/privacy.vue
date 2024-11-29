<template>
  <view class="mainBox fc">
    <view class="contentBox fw550">
      <view class="fz32 color0">常见问题</view>
      <view
        class="disfr jsb ac questItem fz32 color0"
        v-for="(item, index) in question"
        :key="item.id"
        @click="goDetail(item)"
      >
        <text>{{ item.title }}</text>
        <image
          src="https://apmarket.tt286.com/teeny/icon/arrow2x.png"
          class="arrowBtn"
          mode=""
        ></image>
      </view>
    </view>
    <view class="footBox dja color17B fz30">
      <view class="solveBoxBtn dja" v-if="false">
		  <button open-type="contact" class="contactBtn1 fw600">
			<image
			  src="https://apmarket.tt286.com/teeny/icon/customerservice2x.png"
			  mode=""
			  class="btnIcon"
			></image>
		  </button>
		<button open-type="contact" class="contactBtn fw600">在线客服</button>
      </view>
      <view class="solveBoxBtn dja fw600" @click="goFeedBack">
        <image
          src="https://hsapmarket.zy845.com/guard/wx/feedback2x.png"
          mode=""
          class="btnIcon"
        ></image>
        <text>意见反馈</text>
      </view>
    </view>
    <uni-popup ref="popup" type="primary" background-color="#fff">
      <view class="popup-content fc ac">
        <view class="pountBox">
          <image
            src="https://apmarket.tt286.com/teeny/icon/popout2x-1.png" 
            mode=""
            class="pountPng"
          ></image>
        </view>
        <view class="disfr je wi100">
          <image
            mode=""
		    src="https://apmarket.tt286.com/teeny/icon/btnclose2x.png"
            class="btnclose"
            @click="close"
          ></image>
        </view>
        <view class="color3 puountTitle fw500">
          {{ officialDesc }}“守护”微信公众号
        </view>
        <view class="color3 pounttitleT fw500"></view>
        <view class="color6 pountdesc">
          {{ officialDesc }}后，即可发送消息
        </view>
        <button type="default" class="btn fz32 fw600 btn-official" v-if="isscene">
          立即{{ officialDesc }}
          <official-account
            class="official-account"
            id="official_account"
          ></official-account>
        </button>
		<button type="default" class="btn fz32 fw600 btn-official" v-if="!isscene" @click="gofollow">
		  立即{{ officialDesc }}
		</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  onLoad() {
    this.getQuestions();
  },
  computed: {
    ...mapGetters(["userInfo"]),
    officialDesc() {
      return this.isSubscribe ? "进入" : "关注";
    },
  },
  data() {
    return {
      question: [],
	  isscene:false,
	  isSubscribe:false,
    };
  },
  methods: {
    customerService() {
		this.$apiCom.userinfo({}).then((res) => {
			if (res.code == 0) {
				this.isSubscribe=res.data.isSubscribe
				let user=this.userInfo
				user.isSubscribe=res.data.isSubscribe
				this.$store.commit("user/SET_USER_INFO",
					user)
					this.$refs.popup.open("center");
			}else{
				this.$refs.popup.open("center");
			}
		})
    },
    close() {
      this.$refs.popup.close();
    },
    goDetail(val) {
      uni.navigateTo({
        url: "/page_writeOff/questiondetail/questiondetail?id=" + val.id,
      });
    },
    goFeedBack() {
      uni.navigateTo({
        url: "/page_writeOff/feedback/feedback",
      });
    },
	gofollow(){
	  uni.navigateTo({
		url: '/page_writeOff/webview/webview'
	  })
	},
    async getQuestions() {
      const res = await this.$apiCom.getQuestions();
      if (res && res.code == 0) {
        this.question = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
	/deep/ .uni-popup .uni-popup__wrapper {
		border-radius: 32rpx;
	}
.mainBox {
  box-sizing: border-box;
  height: 100vh;
  background-color: #F5f5f5;
  .contentBox {
    // flex: 1;
    // overflow: auto;
	margin:32rpx;
	background-color: #fff;
	border-radius: 32rpx;
	padding: 34rpx 36rpx;
    .questItem {
      padding: 74rpx 0 0rpx;
    }
  }
  .footBox {
    height: 120rpx;
	background-color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
    .solveBoxBtn {
      width: 50%;
      .btnIcon {
        width: 50rpx;
        height: 50rpx;
        margin-right: 16rpx;
      }
	  .contactBtn{
	  color: #0066FF;
	  background: #fff;
	 font-size: 30rpx;
	 padding: 0;
	 margin-left: 0rpx;
	 margin-right: 0rpx;
	  }  .contactBtn1{
	  color: #0066FF;
	  background: #fff;
	 font-size: 30rpx;
	 padding: 0;
	 margin-left: 0rpx;
	 margin-right: 0rpx;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	  }

    }
  }
  .popup-content {
    // padding:26rpx 48rpx 52rpx ;
    border-radius: 32rpx;
    background-color: #fff;
    width: 654rpx;
    box-sizing: border-box;
    .pountBox {
      position: relative;
    }
    .puountTitle {
      font-size: 40rpx;
      margin-top: 32rpx;
    }
    .pounttitleT {
      font-size: 36rpx;
      margin-bottom: 24rpx;
    }
    .pountPng {
      width: 654rpx;
      height: 332rpx;
    }
    .btnclose {
      position: absolute;
      top: 30rpx;
      right: 30rpx;
      width: 44rpx;
      height: 44rpx;
    }
    .pountdesc {
      font-size: 28rpx;
      width: 520rpx;
      height: 120rpx;
      text-align: center;
    }
    .btn {
      position: relative;
      width: 574rpx;
      height: 88rpx;
      line-height: 88rpx;
      border-radius: 28rpx;
      margin: 32rpx 0 48rpx;
      // width: 56px;
      // height: 20px;
      // line-height: 20px;
      padding: 0;
      background: #1bd17b;
      overflow: hidden;
      text-align: center;
      color: #fff;
      font-size: 32rpx;
      font-weight: 500;
      // border-radius: 10px;
      // font-size: 20rpx;

      .official-account {
        position: absolute;
        z-index: 20211209;
        right: -14px;
        top: -40px;
        opacity: 0;
      }
    }
  }
}
button::after{
	  border: 0;
}
</style>
