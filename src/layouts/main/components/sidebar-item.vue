<template>
	<div>
		<q-item
			clickable
			tag="a"
			:to="link"
			:target="newTab ? '_blank' : ''"
			:href="newTab ? link : ''"
		>
			<q-item-section v-if="icon" avatar>
				<q-icon :name="icon" />
				<q-tooltip>
					{{ $t(`sidebar.${title}`) }}
				</q-tooltip>
			</q-item-section>

			<q-item-section>
				<q-item-label>
					{{ $t(`sidebar.${title}`) }}
				</q-item-label>
				<q-item-label caption>
					{{ caption }}
				</q-item-label>
			</q-item-section>
		</q-item>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},

		caption: {
			type: String,
			default: '',
		},

		link: {
			type: String,
			default: '#',
		},

		icon: {
			type: String,
			default: '',
		},

		newTab: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
