<template>
	<div class="rocket-details d-flex justify-center mt-12">
		<v-card
			class="rocket-card mx-auto pa-6"
			elevation="12"
			:style="{
				backgroundImage: `url('https://res.cloudinary.com/diljhwf3a/image/upload/v1755065785/heic0604a_sfmtyb.jpg')`,
			}"
		>
			<div class="overlay"></div>

			<div class="d-flex justify-end mb-4" style="position: relative; z-index: 2">
				<v-btn
					:color="isFavorite ? '#00ADB5' : '#EEEEEE'"
					class="favorite-btn"
					@click="isFavoriteHandler(singleRocket)"
				>
					<v-icon left size="20">
						{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
					</v-icon>
					Favorite
				</v-btn>
			</div>

			<div class="rocket-info text-center" style="position: relative; z-index: 2">
				<h1 class="mission-title">{{ singleRocket.name }}</h1>
				<p class="lead">Company: {{ singleRocket.company }}</p>
				<p class="lead">Country: {{ singleRocket.country }}</p>

				<p class="description">{{ singleRocket.description }}</p>

				<p class="info">
					<strong>First Flight:</strong>
					{{ dateConvert(singleRocket.first_flight) }}
				</p>
				<p class="info">
					<strong>Height:</strong>
					{{ singleRocket.height.feet }} ft | {{ singleRocket.height.meters }} m
				</p>
				<p class="info">
					<strong>Diameter:</strong>
					{{ singleRocket.diameter.feet }} ft | {{ singleRocket.diameter.meters }} m
				</p>
				<p class="info">
					<strong>Mass:</strong>
					{{ singleRocket.mass.kg }} kg | {{ singleRocket.mass.lb }} lb
				</p>
				<p class="info">
					<strong>Stages:</strong>
					{{ singleRocket.stages }}
				</p>
			</div>
		</v-card>

		<Chat :items="singleRocket" :type="type" />
	</div>
</template>

<script lang="ts" setup>
import { useSingleRockets } from '~/api/rockets'
import { dateConvert } from '~/shared/Date'
import Chat from '~/shared/chat.vue'
import type { FavoriteItem } from '~/types/typesInfo'

const route = useRoute()
const id = route.params.id as string
const singleRocket = useSingleRockets(id)
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

<style src="../../styles/singleRocket.css" scoped />
