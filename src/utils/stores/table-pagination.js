import { exportFile, Notify } from 'quasar';

function getState() {
	return {
		loading: false,
		pagination: {
			page: 1,
			rowsPerPage: 15,
			rowsNumber: 10,
			sortBy: '',
			descending: false,
		},
		tableData: [],
		oldFilterCopy: null,
	};
}
const store = {
	state: getState,
	getters: {
		isFilterChanged(state) {
			return (newFilter) => {
				return JSON.stringify(state.oldFilterCopy) !== JSON.stringify(newFilter);
			};
		},
		isPageChanged(state) {
			return (newPage) => {
				return +state.pagination.page !== +newPage;
			};
		},
		tableData(state) {
			return state.tableData;
		},
		paginationConfig(state) {
			return state.pagination;
		},
		loading(state) {
			return state.loading;
		},
		pagesNumber(state) {
			return Math.ceil(state.pagination.rowsNumber / state.pagination.rowsPerPage);
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		updateFilter(state, newFilter) {
			state.oldFilterCopy = newFilter;
		},
		updatePagination(state, newFields) {
			state.pagination = {
				...state.pagination,
				...newFields,
			};
		},
		updatePaginationPage(state, value) {
			state.pagination.page = value;
		},
		setTableData(state, newData) {
			state.tableData.splice(0, state.tableData.length, ...newData);
		},
		resetTablePagination(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async onRequest({ commit, getters, dispatch, state }, props) {
			let queryParams = {
				paginate: 1,
			};
			let processedFilter = {};
			if (props.filter) {
				Object.keys(props.filter).forEach((key) => {
					if (props.filter[key] === '') {
						delete props.filter[key];
					} else {
						processedFilter[`filter[${key}]`] = props.filter[key];
					}
				});
			}
			const { page = 1, rowsPerPage = 15, sortBy = '', descending = false } =
				props.pagination || {};
			if (props.pagination) {
				queryParams = {
					...queryParams,
					page,
					sort: descending ? `-${sortBy}` : sortBy,
				};
			}
			const filter = JSON.parse(JSON.stringify(processedFilter || {}));
			commit('setLoading', true);
			queryParams = {
				...queryParams,
				...filter,
				recordCount: rowsPerPage,
			};
			let filterBeforeUpdate = null;
			if (getters.isFilterChanged(filter)) {
				queryParams.recordCount = '';
				commit('updateFilter', filter);
				filterBeforeUpdate = JSON.parse(JSON.stringify(state.oldFilterCopy));
			}

			try {
				const res = await dispatch('fetchTableData', queryParams);
				const updatedFields = {};
				updatedFields.rowsNumber = res.total;
				updatedFields.page = page;
				updatedFields.sortBy = sortBy;
				updatedFields.descending = descending;

				commit('setTableData', res.data);
				commit('updatePagination', updatedFields);
			} catch (error) {
				// rollback
				if (filterBeforeUpdate) {
					commit('updateFilter', filterBeforeUpdate);
				}
			} finally {
				commit('setLoading', false);
			}
		},
		updatePaginationConfig({ commit, dispatch, state, getters }, data) {
			if (typeof data === 'number' && getters.isPageChanged(data)) {
				commit('updatePaginationPage', data);
				dispatch('onRequest', { pagination: state.pagination });
			} else {
				commit('updatePagination', data);
			}
		},
		exportTable({ state, getters }, title = 'table-export') {
			// naive encoding to csv format
			const content = [getters.columns.map((col) => wrapCsvValue(col.label))]
				.concat(
					state.tableData.map((row) =>
						getters.columns
							.map((col) =>
								wrapCsvValue(
									typeof col.field === 'function'
										? col.field(row)
										: row[col.field === void 0 ? col.name : col.field],
									col.format,
								),
							)
							.join(','),
					),
				)
				.join('\r\n');

			const status = exportFile(`${title}.csv`, content, 'text/csv');

			if (status !== true) {
				Notify.create({
					message: 'Browser denied file download...',
					color: 'negative',
					icon: 'warning',
				});
			}
		},
		updatePaginationPage({ commit }, value) {
			commit('updatePaginationPage', value);
		},
	},
};
export default store;

function wrapCsvValue(val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val;

	formatted = formatted === void 0 || formatted === null ? '' : String(formatted);

	formatted = formatted.split('"').join('""');
	/**
	 * Excel accepts \n and \r in strings, but some other CSV parsers do not
	 * Uncomment the next two lines to escape new lines
	 */
	// .split('\n').join('\\n')
	// .split('\r').join('\\r')

	return `"${formatted}"`;
}
