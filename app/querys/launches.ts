export const GET_LAUNCHES = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_local
			launch_site {
				site_id
				site_name
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`
