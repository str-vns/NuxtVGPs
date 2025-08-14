import type { FavoriteItem, RocketsInfo, LaunchInfo } from '~/types/typesInfo'

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
		const filt = (item as FavoriteItem).data ? (item as FavoriteItem).data : item
		const launchYear = new Date(filt.launch_date_local || filt.first_flight).getFullYear().toString()
		return launchYear === year
	})
}

export function sortDate(sort: string, datas: any[]) {
	return datas.sort((a, b) => {
		const itemA = (a as FavoriteItem).data ? (a as FavoriteItem).data : a
		const itemB = (b as FavoriteItem).data ? (b as FavoriteItem).data : b

		const dateA = new Date(
			(itemA as RocketsInfo).first_flight || (itemA as LaunchInfo).launch_date_local,
		).getTime()
		const dateB = new Date(
			(itemB as RocketsInfo).first_flight || (itemB as LaunchInfo).launch_date_local,
		).getTime()

		return sort === 'Asc' ? dateA - dateB : dateB - dateA
	})
}

export function searchName(search: string, datas: any[]) {
	console.log(search)
	return datas.filter((item) => {
		const filter = (item as FavoriteItem).data ? (item as FavoriteItem).data : item
		const searchData = filter.name || filter.mission_name || ''
		return searchData.toLowerCase().includes(search.toLowerCase())
	})
}
