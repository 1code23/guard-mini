<template>
  <!-- https://ext.dcloud.net.cn/plugin?id=296 -->
  <view class="upload">
    <view class="list">
      <view
        class="item interval"
        v-for="(item, index) in fileList"
        :key="index"
      >
        <image :src="item" v-if="item"></image>
        <image
          src="https://apmarket.tt286.com/teeny/icon/delete2x.png"
          mode=""
          class="icon-close"
          @click.stop="handleRemove(index)"
        ></image>
      </view>
      <view class="item" @click="chooseImage" v-if="fileList.length < limit">
        <image
          src="https://apmarket.tt286.com/teeny/icon/addicon2x-1.png"
          mode=""
          class="uploadpng"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default: 9,
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "file",
    },
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    header: {
      type: Object,
      default() {
        return {};
      },
    },
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    chooseImage() {
      uni.chooseImage({
		count: 1, // 限制一次只能选择一张图片
        success: (chooseImageRes) => {
          const uploadTask = uni.uploadFile({
            url: this.url,
            name: this.name,
            filePath: chooseImageRes.tempFilePaths[0],
            formData: this.formData,
            header: this.header,
            success: (uploadFileRes) => {
              this.$emit("on-success", JSON.parse(uploadFileRes.data));
            },
            fail: (err) => {
              this.$emit("on-error", err);
            },
          });
          uploadTask.onProgressUpdate((res) => {
            this.$emit("on-process", res);
          });
        },
		fail: (err) => {
		 uni.showToast({
			title:'请选择图片或图片不合法请重新上传',
			icon:"none",
			duration:3000
		 })
		 return
		},
      });
    },
    handleRemove(index) {
      this.$emit("on-remove", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140upx;
      height: 140upx;
      border-radius: 8upx;
      // border: 2upx solid #D9D9D9;
      border: 2upx dashed #d9d9d9;
      background-color: #f3f3f3;
      margin-bottom: 20upx;
      &.interval {
        // margin-right: 16upx;
        margin-right: 55upx;
        border: none;
      }
      image {
        width: 100%;
        height: 100%;
        border-radius: 8upx;
        margin: 0;
      }
      .icon-close {
        position: absolute;
        top: 0;
        right: 0;
        width: 28upx;
        height: 28upx;
        // background-color: red;
        // background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 8upx 0 0;
      }
      .icon {
        width: 48upx;
        height: 48upx;
      }
      .uploadpng {
        width: 48upx;
        height: 48upx;
      }
    }
  }
}
</style>
