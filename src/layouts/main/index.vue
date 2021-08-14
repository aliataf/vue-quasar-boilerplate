<template>
	<q-layout view="lHh Lpr lFf">
		<main-layout-header />
		<main-layout-sidebar />

		<app-scroll-area height="calc(100vh - 50px)" style="top: 50px">
			<q-page-container style="padding-top: 0; min-height: calc(100vh - 50px)" class="bg-grey-3">
				<div class="q-pa-lg">
					<router-view />
				</div>
			</q-page-container>
		</app-scroll-area>
	</q-layout>
</template>

<script>
import MainLayoutHeader from './components/header.vue';
import MainLayoutSidebar from './components/sidebar.vue';
import AppScrollArea from '@/components/app-scroll-area.vue';

export default {
	components: { MainLayoutHeader, MainLayoutSidebar, AppScrollArea },
	data() {
		return {
			lang: this.$q.lang.isoName,
		};
	},
	watch: {
		lang(lang) {
			this.$i18n.locale = lang;
		},
	},
};
</script>

<style scoped></style>
