<template>
	<q-dialog ref="dialog" @hide="onDialogHide">
		<q-card class="dialog q-px-lg q-pb-lg q-pt-md">
			<q-card-section class="q-pa-none row items-center">
				<q-space></q-space>
				<q-btn dense flat icon="close" v-close-popup class="close-icon"></q-btn>
			</q-card-section>
			<q-card-section class="column items-center q-pb-xs q-pt-none">
				<q-icon name="info" size="xl" color="negative" text-color="white" />
				<span class="q-ml-sm text-h6">Are you sure you want to delete this Record?</span>
			</q-card-section>

			<q-card-actions align="center">
				<q-btn
					class="q-mx-xl q-px-sm"
					outline
					no-caps
					label="Cancel"
					color="grey"
					v-close-popup
					data-testid="cancel-btn"
				/>
				<q-btn
					class="q-mx-xl q-px-sm"
					no-caps
					label="Delete"
					color="negative"
					v-close-popup
					@click="onOKClick"
					data-testid="ok-btn"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	methods: {
		// following method is REQUIRED
		// (don't change its name --> "show")
		show() {
			this.$refs.dialog.show();
		},

		// following method is REQUIRED
		// (don't change its name --> "hide")
		hide() {
			this.$refs.dialog.hide();
		},

		onDialogHide() {
			// required to be emitted
			// when QDialog emits "hide" event
			this.$emit('hide');
		},

		onOKClick() {
			// on OK, it is REQUIRED to
			// emit "ok" event (with optional payload)
			// before hiding the QDialog
			this.$emit('ok');
			// or with payload: this.$emit('ok', { ... })

			// then hiding dialog
			this.hide();
		},

		onCancelClick() {
			// we just need to hide dialog
			this.hide();
		},
	},
};
</script>

<style scoped>
.dialog {
	width: 500px !important;
}
</style>
