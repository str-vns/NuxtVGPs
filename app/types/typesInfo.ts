export interface RocketsInfo {
	id: string
	name: string
	first_flight: string
	country: string
	description: string
	company: string
	height: { feet: number; meters: number }
	diameter: { feet: number; meters: number }
	mass: { kg: number; lb: number }
	stages: number
}

export interface RocketsALL {
	id: string
	name: string
	first_flight: string
	company: string
	country: string
	description: string
}

export interface LaunchInfo {
	id: string
	mission_name: string
	launch_date_local: string
	launch_success: string
	launch_site: {
		site_id: string
		site_name: string
		site_name_long: string
	}
	rocket: {
		rocket_name: string
	}
	details: string
}

export interface FavoriteItem {
	id: string
	type: 'rocket' | 'launch'
	data: RocketsInfo | LaunchInfo
}

export interface ChatMessage {
	role: 'system' | 'user' | 'assistant'
	content: string
}
