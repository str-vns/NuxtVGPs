import { filterYear, sortDate, searchName } from './Date'

const paginationPages = (itemLength: any[], year: string, sort: string, search: string) => {

	const page = ref(1)
	const itemsPerPages = 12
	const filterItems = filterYear(year, itemLength)
	const datas = !year ? itemLength : filterItems
    const filtered = searchName(search, datas)
	const order = sort === '' ? filtered : sortDate(sort, filtered)
	
	const totalpages = computed(() => Math.ceil(order.length / itemsPerPages))

	const pageItems = computed(() => {
		const start = (page.value - 1) * itemsPerPages
		return filtered.slice(start, start + itemsPerPages)
	})

	return {
		page,
		totalpages,
		pageItems,
	}
}

export default paginationPages
