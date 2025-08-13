export const GET_ROCKETS = gql`
	query getRockets {
		rockets {
			id
			name
			first_flight
			company
			country
			description
		}
	}
`

export const SINGLE_ROCKETS = gql`
	query getRockets {
		rockets {
			id
			name
			first_flight
			height {
				feet
				meters
			}
			diameter {
				feet
				meters
			}
			mass {
				kg
				lb
			}
			stages
			engines {
				propellant_1
				propellant_2
				thrust_sea_level {
					kN
				}
				thrust_to_weight
				type
				version
				layout
				number
			}
			company
			boosters
			active
			success_rate_pct
			wikipedia
		}
	}
`
