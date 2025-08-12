const paginationPages = <LaunchTypes>(itemLength: LaunchTypes[]) => {
	const page = ref(1)
	const itemsPerPages = 12

	const totalpages = computed(() => Math.ceil(itemLength.length / itemsPerPages))

	const pageItems = computed(() => {
		const start = (page.value - 1) * itemsPerPages
		return itemLength.slice(start, start + itemsPerPages)
	})

	return {
		page,
		totalpages,
		pageItems,
	}
}

export default paginationPages
