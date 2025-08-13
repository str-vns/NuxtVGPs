export function dateConvert(dates: string) {
	const date = new Date(dates)
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

export function filterYear(year: string, datas: any[]) {
	return datas.filter((item) => {
		const launchYear = new Date(item.launch_date_local).getFullYear().toString()
		return launchYear === year
	})
}

export function sortDate(sort: string, datas: any[]) {
	
		return	datas.sort((a, b) => {
				const dateA = new Date(a.launch_date_local).getTime()
				const dateB = new Date(b.launch_date_local).getTime()
				return sort === 'Asc' ? dateA - dateB : dateB - dateA
			})

}
