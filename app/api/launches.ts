import { GET_LAUNCHES, GET_SINGLE_LAUNCHES } from '~/querys/launches'
import type { LaunchInfo } from '~/types/typesInfo'
export function useGetLaunches() {
	const { data } = useAsyncQuery<{
		launches: LaunchInfo[]
	}>(GET_LAUNCHES)

	const launchers = computed(() => data?.value?.launches ?? [])

	return launchers
}

export function useSingleGetLaunches(id: string) {
	const { data } = useAsyncQuery<{
		launch: LaunchInfo
	}>(GET_SINGLE_LAUNCHES, { id })

	const launch = computed(
		() =>
			data?.value?.launch || {
				id: '',
				mission_name: '',
				launch_date_local: '',
				launch_site: {
					site_id: '',
					site_name: '',
					site_name_long: '',
				},
				rocket: {
					rocket_name: '',
				},
				details: '',
			},
	)

	return launch
}
