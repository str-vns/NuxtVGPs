import { filterYear } from './Date'

const paginationPages = (itemLength: any[], year: string) => {
	console.log(year)
	const page = ref(1)
	const itemsPerPages = 12
	const filterItems = filterYear(year, itemLength)

	const datas = !year ? itemLength : filterItems

	const totalpages = computed(() => Math.ceil(datas.length / itemsPerPages))

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
