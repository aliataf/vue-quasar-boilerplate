<template>
	<q-header elevated>
		<q-toolbar>
			<q-btn
				flat
				dense
				round
				icon="menu"
				aria-label="Menu"
				@click="drawerState = !drawerState"
			/>
			<q-space />
			<div class="flex items-center q-gutter-x-md">
				<q-btn flat>
					<q-avatar size="40px">
						<q-img :src="require('@/assets/placeholders/user.png')" />
					</q-avatar>
					<q-icon name="arrow_drop_down" />
					<profile-dropdown />
				</q-btn>
			</div>
		</q-toolbar>
	</q-header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ProfileDropdown from './profile-dropdown';

export default {
	components: {
		ProfileDropdown,
	},
	computed: {
		...mapGetters('MainLayout', ['drawerStateStore']),
		drawerState: {
			get() {
				return this.drawerStateStore;
			},
			set(val) {
				this.setDrawerStateStore(val);
			},
		},
	},
	methods: {
		...mapMutations('MainLayout', ['setDrawerStateStore']),
	},
};
</script>

<style></style>
