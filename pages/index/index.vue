<template>
	<view class="container">
		<my-test-comp></my-test-comp>
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<button @click="scanCode()">扫一扫</button>

		<uni-link :href="href" :text="href"></uni-link>

		<view class="page-section page-section-gap">
			<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
		</view>
	</view>
</template>

<script>
	import {
		wgs84togcj02,
	} from "@/utils/coordinateConversion.js"
	export default {
		data() {
			let loc=wgs84togcj02(121.41195015,31.179518750000003)
			const lng=loc[0];
			const lat=loc[1];
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				longitude: lng,
				latitude: lat,
				covers: [{
					id: 1,
					longitude: lng,
					latitude: lat,
					iconPath: '../../static/location.png',
					width: 70,
					height: 70,
				}]
			}
		},
		methods: {
			scanCode() {
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				})

			},
			wgs84togcj02(lng, lat){
				wgs84togcj02(lng, lat)
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
