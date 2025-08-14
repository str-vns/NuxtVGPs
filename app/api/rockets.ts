import { GET_ROCKETS, SINGLE_ROCKETS } from '~/querys/rockets'
import type { RocketsInfo, RocketsALL } from '~/types/typesInfo'
export const useGetRockets = () => {
	const { data } = useAsyncQuery<{
		rockets: RocketsALL[]
	}>(GET_ROCKETS)

	const Rocketeer = computed(() => data?.value?.rockets ?? [])

	return Rocketeer
}

export const useSingleRockets = (id: string) => {
	const { data } = useAsyncQuery<{
		rocket: RocketsInfo
	}>(SINGLE_ROCKETS, { id })

	const Rocket = computed(
		() =>
			data?.value?.rocket || {
				id: '',
				name: '',
				first_flight: '',
				country: '',
				description: '',
				company: '',
				height: { feet: 0, meters: 0 },
				diameter: { feet: 0, meters: 0 },
				mass: { kg: 0, lb: 0 },
				stages: 0,
			},
	)

	return Rocket
}
