import { filterYear, sortDate } from './Date'

const paginationPages = (itemLength: any[], year: string, sort: string) => {
	console.log(sort)
	const page = ref(1)
	const itemsPerPages = 12
	const filterItems = filterYear(year, itemLength)
	const datas = !year ? itemLength : filterItems

	const order = sort === '' ? datas : sortDate(sort, datas)

	const totalpages = computed(() => Math.ceil(order.length / itemsPerPages))

	const pageItems = computed(() => {
		const start = (page.value - 1) * itemsPerPages
		return datas.slice(start, start + itemsPerPages)
	})

	return {
		page,
		totalpages,
		pageItems,
	}
}

export default paginationPages
