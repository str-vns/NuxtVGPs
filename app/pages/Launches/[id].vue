<template>
	<div class="d-flex justify-center align-center mt-12">
		<v-card class="launch-card pa-6 mb-10" elevation="12">
			<div class="d-flex justify-between align-center mb-4">
				<v-btn
					:color="isFavorite ? '#00ADB5' : '#EEEEEE'"
					class="favorite-btn"
					@click="isFavoriteHandler(singleRocket)"
				>
					<v-icon left size="20" :color="isFavorite ? '#222831' : '#222831'">
						{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
					</v-icon>
					Favorite
				</v-btn>
			</div>

			<div class="text-center mb-6">
				<h1 class="mission-title">{{ singleRocket.mission_name }}</h1>
				<p class="info-text">
					Site:
					<span class="highlight">{{ singleRocket?.launch_site?.site_name }}</span>
				</p>
				<p class="info-text">
					Rocket:
					<span class="highlight">{{ singleRocket.rocket.rocket_name }}</span>
				</p>
				<p class="info-text">
					Launch Date:
					<span class="highlight">{{ dateConvert(singleRocket.launch_date_local) }}</span>
				</p>
			</div>

			<div class="details-section text-center mx-auto">
				<p class="details-text">{{ singleRocket.details ?? 'No details available' }}</p>
			</div>
		</v-card>

		<Chat :items="singleRocket" :type="type" />
	</div>
</template>

<script lang="ts" setup>
import Chat from '~/shared/chat.vue'
import { useSingleGetLaunches } from '~/api/launches'
import { dateConvert } from '~/shared/Date'
import type { FavoriteItem } from '~/types/typesInfo'

const route = useRoute()
const id = route.params.id as string
const singleRocket = useSingleGetLaunches(id)
const store = useFavorite()
const rockets = ref<FavoriteItem[]>([])
const isFavorite = ref(false)

const getTypeFromRoute = (): 'rocket' | 'launch' => {
	if (route.path.startsWith('/Rockets')) return 'rocket'
	if (route.path.startsWith('/Launches')) return 'launch'
	throw new Error(`Unknown type for route: ${route.path}`)
}

const type = getTypeFromRoute()
onMounted(async () => {
	rockets.value = (await store.getFav()) as FavoriteItem[]
	isFavorite.value = rockets.value.some((r) => r.id === id)
})

const isFavoriteHandler = async (data: any) => {
	if (isFavorite.value) {
		store.removeFav(id)
		isFavorite.value = false
	} else {
		store.saveFav({ id: id, type: type, data: data })
		isFavorite.value = true
	}
}
</script>

<style src="../../styles/launchID.css" scoped />
