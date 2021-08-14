<template>
	<q-drawer
		v-model="drawerState"
		:mini="!drawerState || miniState"
		show-if-above
		bordered
		content-class="bg-grey-1 flex column"
	>
		<q-list class="q-mt-lg">
			<sidebar-item v-for="item in sidebarRoutes" :key="item.title" v-bind="item" />
		</q-list>
		<div v-if="!$q.platform.is.mobile" class="absolute mini-btn">
			<q-btn
				dense
				round
				unelevated
				color="primary"
				:icon="
					isRtl
						? miniState
							? 'chevron_left'
							: 'chevron_right'
						: miniState
						? 'chevron_right'
						: 'chevron_left'
				"
				@click="miniState = !miniState"
			/>
		</div>
	</q-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SidebarItem from './sidebar-item.vue';

const linksData = [
	{
		title: 'examplePage',
		icon: 'home',
		link: '/example-page',
	},
];

export default {
	components: {
		SidebarItem,
	},
	data() {
		return {
			miniState: false,
			sidebarRoutes: linksData,
		};
	},
	computed: {
		...mapGetters('MainLayout', ['drawerStateStore']),
		isRtl() {
			return this.$q.lang.rtl;
		},
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

<style scoped>
.mini-btn {
	top: 55px;
	right: -17px;
	z-index: 9999;
}

[dir='rtl'] .mini-btn {
	left: -17px;
}
</style>
