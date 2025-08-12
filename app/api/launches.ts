import { GET_LAUNCHES } from '~/querys/launches'

export function useGetLaunches() {
	const { data } = useAsyncQuery<{
		launches: {
			id: string
			mission_name: string
			launch_date_local: string
			launch_site: {
				site_id: string
				site_name: string
				site_name_long: string
			}
			rocket: {
				rocket_name: string
			}
			details: string
		}[]
	}>(GET_LAUNCHES)

	const launchers = computed(() => data?.value?.launches ?? [])

	return launchers
}
