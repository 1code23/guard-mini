<template>
	<view>
		<radio-group @change="radioChange">
			<label class="uni-list-cell uni-list-cell-pd djb ac radioItem" v-for="(item, index) in items"
				:key="item.value">
				<view class="fz32">{{item.name}}</view>
				<view>
					<radio :value="item.value" :checked="index === current" color="#1BD17B" />
				</view>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		name: "my-radio-row",
		props: {
			items: Array,
			default: []
		},
		data() {
			return {
				// items: [{
				//                    value: 'USA',
				//                    name: '美国',
				//                    checked: 'true'
				//                },
				//                {
				//                    value: 'CHN',
				//                    name: '中国'
				//                },
				//                {
				//                    value: 'BRA',
				//                    name: '巴西'
				//                },

				//            ],
				current: 0
			};
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
				// console.log(evt);
				this.$emit('radioChange', evt.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.radioItem {
		margin-bottom: 76rpx;
	}
</style>
