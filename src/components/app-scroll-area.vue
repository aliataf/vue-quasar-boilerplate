<template>
	<q-scroll-area ref="qScrollArea" :thumb-style="thumbStyle" :style="`height: ${height}`">
		<slot />
	</q-scroll-area>
</template>

<script>
import { colors } from 'quasar';

const { getPaletteColor } = colors;

export default {
	name: 'AppScrollArea',
	props: {
		height: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			thumbStyle: {
				right: '2px',
				borderRadius: '5px',
				backgroundColor: getPaletteColor('primary'),
				width: '5px',
				opacity: 0.75,
			},
		};
	},
};
</script>

<style></style>
