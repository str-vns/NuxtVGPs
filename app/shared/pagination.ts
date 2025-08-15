import { filterYear, sortDate, searchName } from './Date'

const paginationPages = (
	page: Ref<number>,
	itemLength: any[],
	year: string,
	sort: string,
	search: string,
) => {
	const itemsPerPages = 12

	const filterItems = filterYear(year, itemLength) || []

	const datas = !year ? itemLength : filterItems

	const filtered = searchName(search, datas)

	const sortedAndFilteredItems = sort === '' ? filtered : sortDate(sort, filtered)

	const totalpages = computed(() => Math.ceil(sortedAndFilteredItems.length / itemsPerPages))

	const pageItems = computed(() => {
		const start = (page.value - 1) * itemsPerPages
		const end = start + itemsPerPages
		return sortedAndFilteredItems.slice(start, end)
	})

	return {
		totalpages,
		pageItems,
	}
}

export default paginationPages
