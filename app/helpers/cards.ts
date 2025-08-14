import type { FavoriteItem, RocketsInfo, LaunchInfo } from '~/types/typesInfo'
import { dateConvert } from '~/shared/Date'

export function getItemTitle(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return (item as RocketsInfo).name
	if (type === 'launches') return (item as LaunchInfo).mission_name
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		const data = fav.data
		return fav.type === 'rocket' ? (data as RocketsInfo).name : (data as LaunchInfo).mission_name
	}
	return ''
}

export function getItemDate(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return `First Flight: ${dateConvert((item as RocketsInfo).first_flight)}`
	if (type === 'launches')
		return `Launch Date: ${dateConvert((item as LaunchInfo).launch_date_local ?? '').toLocaleString()}`
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		const data = fav.data
		return fav.type === 'rocket'
			? `First Flight: ${dateConvert((item as RocketsInfo).first_flight)}`
			: `Launch Date: ${dateConvert((item as LaunchInfo).launch_date_local ?? '').toLocaleString()}`
	}
	return ''
}

export function getInfo1(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return `Company: ${(item as RocketsInfo).company}`
	if (type === 'launches') return `Rocket: ${(item as LaunchInfo).rocket.rocket_name}`
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		const data = fav.data
		return fav.type === 'rocket'
			? `Company: ${(data as RocketsInfo).company}`
			: `Rocket: ${(data as LaunchInfo).rocket.rocket_name}`
	}
	return ''
}

export function getInfo2(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return `Country: ${(item as RocketsInfo).country}`
	if (type === 'launches')
		return `Site: ${(item as LaunchInfo).launch_site?.site_name ?? 'No Site Details'}`
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		const data = fav.data
		return fav.type === 'rocket'
			? `Country: ${(data as RocketsInfo).country}`
			: `Site: ${(data as LaunchInfo).launch_site?.site_name ?? 'No Site Details'}`
	}
	return ''
}

export function getDetails(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return `${(item as RocketsInfo).description ?? 'No description'} `
	if (type === 'launches') return `${(item as LaunchInfo).details ?? 'No Details'} `
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		const data = fav.data
		return fav.type === 'rocket'
			? `${(data as RocketsInfo).description ?? 'No description'}`
			: `${(data as LaunchInfo).details ?? 'No Details'}`
	}
	return ''
}

export function getDetailsTitle(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return 'View Description'
	if (type === 'launches') return 'View Details'
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		return fav.type === 'rocket' ? 'View Description' : 'View Details'
	}
	return ''
}

export function getRouterNav(
	item: RocketsInfo | LaunchInfo | FavoriteItem,
	type: 'rocket' | 'launches' | 'favorite',
) {
	if (type === 'rocket') return 'Rockets'
	if (type === 'launches') return 'Launches'
	if (type === 'favorite') {
		const fav = item as FavoriteItem
		return fav.type === 'rocket' ? 'Rockets' : 'Launches'
	}
	return ''
}
