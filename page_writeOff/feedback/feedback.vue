<template>

  <view class="minePage">
    <view class="contentBox">
      <view class="fz30 color0 titleName">问题类型</view>
      <view class="djb ac mb36">
        <view class="tabBox fz28" v-for="(item, index) in tabList" :key="index">
          <view
            :class="[
              'tabItem',
              'dja',
              'color6',
              item.id == selected ? 'SelectedBox' : '',
            ]"
            @click="select(item)"
            >{{ item.label }}</view
          >
        </view>
      </view>
      <view class="fz30 color0 titleName">问题描述</view>
      <view class="descBox borderbox">
        <view class="textareaBox">
          <uni-easyinput
            type="textarea"
            :inputBorder="false"
            maxlength="-1"
            v-model="inputValue"
            placeholder="请详细描述您遇到的问题，我们会尽快为您答复"
            @input="inputs"
          >
          </uni-easyinput>
		  <!-- autoHeight -->
        </view>
        <view class="upLoadBox">
          <upload-image
            :url="url"
            :file-list="fileList"
            :header="header"
            :name="name"
            @on-success="onSuccess"
            @on-error="onError"
            @on-remove="onRemove"
            @on-process="onProcess"
          />
        </view>
      </view>
    </view>
    <view class="footBox dja fz32">
      <view class="saveBox dja fw600 cof" @click="submit">立即提交</view>
    </view>
  </view>
</template>

<script>
import UploadImage from "../components/upload-image/upload-image.vue";
export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      selected: "bug",
      tabList: [
        {
          id: "bug",
          label: "Bug反馈",
        },
        {
          id: "idea",
          label: "产品建议",
        },
        {
          id: "other",
          label: "其他",
        },
      ],
      inputValue: "",
      url: this.$constant.UPLOADURL + "/v1/wx/user/upload",
      fileList: [],
      name: "file",
      header: {},
    };
  },
  onShow() {
    this.header = {
      // HTTP 请求 Header, header 中不能设置 Referer。
      Authorization: "Bearer " + uni.getStorageSync("token") || "", // 挂载请求头为用户的 token
      "X-Data-Raw": "real",
    };
  },
  methods: {
    select(val) {
      this.selected = val.id;
    },
    inputs(e) {
      this.inputValue = e;
    },
    onSuccess(e) {
      if (e.code == 0) {
        this.fileList.push(e.data.url);
      }
    },
    onError(val) {
      console.log(val);
    },
    onProcess(val) {
      // console.log(val);
    },
    onRemove(val) {
      this.fileList.splice(val, 1);
    },
    async submit() {
      const obj = {
        type: this.selected,
        content: this.inputValue,
        imgUrls: this.fileList,
      };
	  if(!this.inputValue){
		 uni.showToast({
		   title: "请填写问题描述",
		   icon:"error"
		 });
		  return
	  }
      const res = await this.$apiCom.addFeedback(obj);
      if (res && res.code == 0) {
        uni.showToast({
          title: "操作成功",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.minePage {
  padding: 0 40rpx 80rpx;
  box-sizing: border-box;
  // height: 100%;

  .contentBox {
    // flex: 1;
    // overflow: hidden;
overflow-y: auto;
padding: 0 20rpx;
    .titleName {
      padding: 24rpx 0;
    }

    .tabBox {
      .tabItem {
        width: 204rpx;
        height: 64rpx;
        background: rgba(189, 189, 189, 0.13);
        border-radius: 33rpx;
      }
      .SelectedBox {
        background: #0066FF;
        color: #fff;
      }
    }

    .descBox {
      width: 630rpx;
      // width: 670rpx;
	  // height: 600rpx;
      height: 640rpx;
      background: rgba(189, 189, 189, 0.13);
      border-radius: 24rpx;
      padding:40rpx;
	  margin-top: 24rpx;
      .textareaBox {
       // height: 394rpx;
		margin-bottom: 25rpx;
		// overflow: auto;
      }
    }
  }
}

.footBox {
  height: 136rpx;

  .saveBox {
    width: 562rpx;
    height: 88rpx;
    background: #0066FF;
    border-radius: 48rpx;
  }
}

.mb36 {
  margin: 20rpx 0 36rpx;
}

/deep/ .uni-easyinput__content {
  background: rgba(189, 189, 189, 0) !important;
}

/deep/ .uni-easyinput__placeholder-class {
    height:394rpx !important;
	// line-height: 394rpx !important;
}
/deep/ .uni-easyinput__content-textarea{
	height:394rpx !important;
	// line-height: 394rpx !important;
}
</style>
