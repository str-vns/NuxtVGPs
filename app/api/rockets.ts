import { GET_ROCKETS } from '~/querys/rockets'

export const useGetRockets = () => {
	const { data } = useAsyncQuery<{
		rockets: {
			id: string
			name: string
			first_flight: string
			company: string
			country: string
			description: string
		}[]
	}>(GET_ROCKETS)

	const Rocketeer = computed(() => data?.value?.rockets ?? [])

	return Rocketeer
}
