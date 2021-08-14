<template>
	<q-menu>
		<q-list class="dropdown q-pt-xs q-pb-md">
			<q-item class="column items-center q-pt-md q-pb-xs text-center">
				<q-item-section>
					<q-avatar size="100px">
						<q-img :src="require('@/assets/placeholders/user.png')" />
					</q-avatar>
				</q-item-section>
				<q-separator style="width: 255px; height: 1.5px" class="q-mt-md" />
			</q-item>
			<q-item dense class="row items-center q-py-sm" clickable v-close-popup>
				<div class="q-mx-md">
					<q-icon size="24px" name="account_box" />
				</div>
				<div>
					Profile
				</div>
			</q-item>
			<q-item
				@click="logoutHandler"
				dense
				class="row items-center q-py-sm"
				clickable
				v-close-popup
			>
				<div class="q-mx-md">
					<q-icon class="rotate-180" size="24px" name="login" />
				</div>
				<div>Logout</div>
			</q-item>
		</q-list>
	</q-menu>
</template>

<script>
export default {
	methods: {
		logoutHandler() {},
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	width: 260px;
	font-family: SegoeUI, 'Segoe UI';
	.dropdown-name {
		font-size: 20px;
	}
	.dropdown-email {
		font-size: 16px;
	}
}
</style>
