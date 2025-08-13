import { GET_ROCKETS, SINGLE_ROCKETS } from '~/querys/rockets'

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

export const useSingleRockets = (id: string) => {
	const { data } = useAsyncQuery<{
		rocket: {
			id: string
			name: string
			first_flight: string
			country: string
			description: string
			company: string
			boosters: number
			wikipedia: string
			height: { feet: number; meters: number }
			diameter: { feet: number; meters: number }
			mass: { kg: number; lb: number }
			stages: number
			engines: {
				propellant_1: string
				propellant_2: string
				thrust_sea_level: { kN: number }
				thrust_to_weight: number
				type: string
				version: string
				layout: string
				number: number
			}
		}
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
				boosters: 0,
				wikipedia: '',
				height: { feet: 0, meters: 0 },
				diameter: { feet: 0, meters: 0 },
				mass: { kg: 0, lb: 0 },
				stages: 0,
				engines: {
					propellant_1: '',
					propellant_2: '',
					thrust_sea_level: { kN: 0 },
					thrust_to_weight: 0,
					type: '',
					version: '',
					layout: '',
					number: 0,
				},
			},
	)

	return Rocket
}
